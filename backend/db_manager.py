#!/usr/bin/env python3
"""
Simple database management script for ParkSync
Replaces Alembic for solo development
"""

import asyncio
import sys
import os

# Add current directory to Python path
sys.path.append(os.path.dirname(__file__))

from database import database, init_db, engine, Base
from parking_updater import StreetParkingManager

async def init_database():
    """Initialize database with tables and initial data"""
    print("🗄️  Initializing ParkSync database...")
    
    try:
        # Connect to database
        await database.connect()
        
        # Create all tables
        init_db()
        
        # Initialize streets
        parking_manager = StreetParkingManager()
        await parking_manager.initialize_streets()
        
        print("✅ Database initialization complete!")
        print("📍 Streets initialized: Collins, Bourke, Flinders, Swanston")
        
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        return False
    finally:
        await database.disconnect()
    
    return True

async def reset_database():
    """Reset database (drop and recreate all tables)"""
    print("⚠️  WARNING: This will delete all data!")
    response = input("Are you sure you want to reset the database? (yes/no): ")
    
    if response.lower() != 'yes':
        print("Database reset cancelled.")
        return
    
    print("🗑️  Resetting database...")
    
    try:
        await database.connect()
        
        # Drop all tables
        Base.metadata.drop_all(bind=engine)
        print("🗑️  Dropped all tables")
        
        # Recreate tables
        init_db()
        
        # Reinitialize data
        parking_manager = StreetParkingManager()
        await parking_manager.initialize_streets()
        
        print("✅ Database reset complete!")
        
    except Exception as e:
        print(f"❌ Database reset failed: {e}")
    finally:
        await database.disconnect()

async def test_connection():
    """Test database connection"""
    print("🔌 Testing database connection...")
    
    try:
        await database.connect()
        result = await database.fetch_one("SELECT 1 as test")
        
        if result:
            print("✅ Database connection successful!")
            print(f"🏥 Test query result: {result.test}")
        else:
            print("❌ Database connection failed - no result")
            
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
    finally:
        await database.disconnect()

def show_help():
    """Show available commands"""
    print("""
🗄️  ParkSync Database Manager

Available commands:
  init     - Initialize database tables and data
  reset    - Reset database (drop and recreate all tables)
  test     - Test database connection
  help     - Show this help message

Usage:
  python db_manager.py <command>

Examples:
  python db_manager.py init
  python db_manager.py test
  python db_manager.py reset
    """)

async def main():
    """Main function"""
    if len(sys.argv) < 2:
        show_help()
        return
    
    command = sys.argv[1].lower()
    
    if command == 'init':
        await init_database()
    elif command == 'reset':
        await reset_database()
    elif command == 'test':
        await test_connection()
    elif command == 'help':
        show_help()
    else:
        print(f"❌ Unknown command: {command}")
        show_help()

if __name__ == "__main__":
    asyncio.run(main())
