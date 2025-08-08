from fastapi import FastAPI, HTTPException, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from typing import List, Optional
import uvicorn
from datetime import datetime
import os
from dotenv import load_dotenv

from database import database, init_db
from models import (
    StreetParkingResponse, 
    StreetDetailResponse, 
    AllStreetsResponse,
    SystemStatusResponse,
    RefreshResponse
)
from parking_updater import StreetParkingManager

# Load environment variables from root .env file
load_dotenv(dotenv_path="../.env")

app = FastAPI(
    title="ParkSync API",
    description="Real-time parking availability for Melbourne CBD streets using City of Melbourne Open Data API v2.1",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
cors_origins = os.getenv("CORS_ORIGINS", '["http://localhost:3000", "http://localhost:5173"]')
if isinstance(cors_origins, str):
    cors_origins = eval(cors_origins)  # Convert string to list

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize parking manager
parking_manager = StreetParkingManager()


@app.on_event("startup")
async def startup():
    """Startup event handler"""
    await database.connect()
    init_db()  # Create tables if they don't exist
    await parking_manager.initialize_streets()
    print("ParkSync API started successfully")
    print("API Documentation: http://localhost:8000/docs")


@app.on_event("shutdown")
async def shutdown():
    """Shutdown event handler"""
    await database.disconnect()


def get_availability_status(percentage: float) -> str:
    """Convert availability percentage to status string"""
    if percentage >= 30:
        return 'Good'
    elif percentage >= 10:
        return 'Limited'
    else:
        return 'Very Limited'


@app.get("/", response_class=HTMLResponse)
async def dashboard():
    """Simple HTML dashboard for testing"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>ParkSync API</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                margin: 40px auto; 
                max-width: 800px; 
                line-height: 1.6; 
                background: #f5f5f5;
            }
            .container { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #2c3e50; text-align: center; }
            .links { display: flex; gap: 15px; justify-content: center; margin: 20px 0; }
            .links a { 
                padding: 10px 20px; 
                background: #3498db; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
                transition: background 0.3s;
            }
            .links a:hover { background: #2980b9; }
            .status { text-align: center; margin: 20px 0; padding: 20px; background: #ecf0f1; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🅿️ ParkSync API</h1>
            <div class="status">
                <p>Real-time parking availability for Melbourne CBD</p>
                <p><strong>API Status:</strong> ✅ Online</p>
            </div>
            <div class="links">
                <a href="/docs" target="_blank">📖 API Documentation</a>
                <a href="/api/parking/streets" target="_blank">📍 View Streets</a>
                <a href="/api/health" target="_blank">🏥 Health Check</a>
            </div>
        </div>
    </body>
    </html>
    """


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await database.fetch_one("SELECT 1")
        return {
            "status": "healthy", 
            "database": "connected",
            "api_version": "v2.1",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {str(e)}")


@app.get("/api/parking/streets", response_model=AllStreetsResponse)
async def get_street_parking():
    """Get current parking availability for all monitored streets"""
    query = """
        SELECT street_name, total_bays, available_bays, last_updated
        FROM streets
        WHERE total_bays > 0
        ORDER BY street_name
    """
    
    try:
        results = await database.fetch_all(query)
        
        streets_data = []
        for row in results:
            availability_percentage = (row.available_bays / row.total_bays * 100) if row.total_bays > 0 else 0
            
            streets_data.append(StreetParkingResponse(
                street_name=row.street_name,
                total_bays=row.total_bays,
                available_bays=row.available_bays,
                occupancy_percentage=round(100 - availability_percentage, 1),
                availability_status=get_availability_status(availability_percentage),
                last_updated=row.last_updated.isoformat() if row.last_updated else None
            ))
        
        return AllStreetsResponse(
            streets=streets_data,
            last_refresh=datetime.now().isoformat()
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get("/api/parking/street/{street_name}", response_model=StreetDetailResponse)
async def get_specific_street(street_name: str, include_bays: bool = Query(False)):
    """Get detailed parking information for a specific street"""
    
    street_query = """
        SELECT street_name, total_bays, available_bays, last_updated
        FROM streets 
        WHERE street_name ILIKE $1
    """
    
    try:
        street_info = await database.fetch_one(street_query, f"{street_name}%")
        
        if not street_info:
            raise HTTPException(status_code=404, detail="Street not found")
        
        result = StreetDetailResponse(
            street_name=street_info.street_name,
            total_bays=street_info.total_bays,
            available_bays=street_info.available_bays,
            last_updated=street_info.last_updated.isoformat() if street_info.last_updated else None
        )
        
        if include_bays:
            bays_query = """
                SELECT bay_id, status, latitude, longitude, bay_type
                FROM parking_bays pb
                JOIN streets s ON pb.street_id = s.street_id
                WHERE s.street_name ILIKE $1
                ORDER BY pb.bay_id
            """
            
            bays = await database.fetch_all(bays_query, f"{street_name}%")
            result.bays = [
                {
                    "bay_id": bay.bay_id,
                    "status": bay.status,
                    "bay_type": bay.bay_type,
                    "latitude": bay.latitude,
                    "longitude": bay.longitude
                } for bay in bays
            ]
        
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.post("/api/parking/refresh", response_model=RefreshResponse)
async def refresh_parking_data(background_tasks: BackgroundTasks):
    """Manually trigger parking data refresh from Melbourne Open Data API"""
    background_tasks.add_task(parking_manager.update_street_availability)
    return RefreshResponse(
        message="Parking data refresh initiated",
        api_version="v2.1",
        timestamp=datetime.now().isoformat()
    )


@app.get("/api/parking/status", response_model=SystemStatusResponse)
async def get_system_status():
    """Get system status and statistics"""
    try:
        query = """
            SELECT COUNT(*) as total_streets,
                   SUM(total_bays) as total_bays,
                   SUM(available_bays) as total_available,
                   MAX(last_updated) as last_update
            FROM streets
            WHERE total_bays > 0
        """
        
        result = await database.fetch_one(query)
        
        return SystemStatusResponse(
            total_streets=result.total_streets or 0,
            total_bays=result.total_bays or 0,
            total_available=result.total_available or 0,
            overall_occupancy=round(((result.total_bays - result.total_available) / result.total_bays * 100), 1) if result.total_bays else 0,
            last_update=result.last_update.isoformat() if result.last_update else None,
            system_status="operational"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"System error: {str(e)}")


@app.get("/api/parking/test")
async def test_api_connection():
    """Test connection to Melbourne Open Data API v2.1"""
    try:
        await parking_manager.test_api_connection()
        return {
            "message": "API connection test completed", 
            "status": "success",
            "check_logs": "Check server logs for detailed results"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"API test failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(
        "app:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
