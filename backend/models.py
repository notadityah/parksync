from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ParkingBayBase(BaseModel):
    bay_id: str
    status: str
    bay_type: Optional[str] = "standard"
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class ParkingBay(ParkingBayBase):
    pass

class StreetParkingResponse(BaseModel):
    street_name: str
    total_bays: int
    available_bays: int
    occupancy_percentage: float
    availability_status: str
    last_updated: Optional[str] = None

class StreetDetailResponse(BaseModel):
    street_name: str
    total_bays: int
    available_bays: int
    last_updated: Optional[str] = None
    bays: Optional[List[ParkingBay]] = None

class AllStreetsResponse(BaseModel):
    streets: List[StreetParkingResponse]
    last_refresh: str

class SystemStatusResponse(BaseModel):
    total_streets: int
    total_bays: int
    total_available: int
    overall_occupancy: float
    last_update: Optional[str]
    system_status: str

class RefreshResponse(BaseModel):
    message: str
    api_version: str = "v2.1"
    timestamp: str
