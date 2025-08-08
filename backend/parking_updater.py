import asyncio
import requests
from datetime import datetime
from typing import Dict, List, Optional
from database import database
import json


class StreetParkingManager:
    def __init__(self):
        self.target_streets = ['Collins', 'Bourke', 'Flinders', 'Swanston']
        self.base_url = "https://data.melbourne.vic.gov.au/api/explore/v2.1"
        self.datasets = {
            'parking_bays': 'on-street-parking-bays',
            'parking_sensors': 'on-street-parking-bay-sensors',
            'parking_zones': 'parking-zones-linked-to-street-segments',
            'sign_plates': 'sign-plates-located-in-each-parking-zone'
        }
    
    async def initialize_streets(self):
        """Initialize streets table with target streets"""
        for street in self.target_streets:
            street_name = f"{street} Street"
            
            query = "SELECT street_id FROM streets WHERE street_name = $1"
            existing = await database.fetch_one(query, street_name)
            
            if not existing:
                insert_query = """
                    INSERT INTO streets (street_name, total_bays, available_bays)
                    VALUES ($1, 0, 0)
                """
                await database.execute(insert_query, street_name)
                print(f"Initialized {street_name}")
    
    def fetch_parking_bays_data(self, street_name: str) -> List[Dict]:
        """Fetch parking bay locations for a specific street using API v2.1"""
        url = f"{self.base_url}/catalog/datasets/{self.datasets['parking_bays']}/records"
        
        params = {
            'where': f'street_name like "{street_name}%"',
            'limit': 1000,
            'offset': 0
        }
        
        try:
            response = requests.get(url, params=params, timeout=15)
            if response.status_code == 200:
                data = response.json()
                return data.get('results', [])
            else:
                print(f"API Error for {street_name} bays: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error fetching bay data for {street_name}: {e}")
            return []
    
    def fetch_sensor_data(self, street_name: str) -> List[Dict]:
        """Fetch real-time sensor data for a specific street using API v2.1"""
        url = f"{self.base_url}/catalog/datasets/{self.datasets['parking_sensors']}/records"
        
        params = {
            'where': f'street_name like "{street_name}%"',
            'limit': 1000,
            'offset': 0
        }
        
        try:
            response = requests.get(url, params=params, timeout=15)
            if response.status_code == 200:
                data = response.json()
                return data.get('results', [])
            else:
                print(f"API Error for {street_name} sensors: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error fetching sensor data for {street_name}: {e}")
            return []
    
    async def update_street_availability(self):
        """Update street availability using combined bay and sensor data"""
        print("Starting parking data update with API v2.1...")
        
        for street in self.target_streets:
            street_full_name = f"{street} Street"
            
            # Get street_id
            street_query = "SELECT street_id FROM streets WHERE street_name = $1"
            street_result = await database.fetch_one(street_query, street_full_name)
            
            if not street_result:
                continue
                
            street_id = street_result.street_id
            
            # Fetch bay locations and sensor data
            bay_data = self.fetch_parking_bays_data(street)
            sensor_data = self.fetch_sensor_data(street)
            
            # Create lookup for sensor data by bay_id
            sensor_lookup = {}
            for sensor in sensor_data:
                bay_id = sensor.get('bay_id')
                if bay_id:
                    sensor_lookup[bay_id] = sensor
            
            total_bays = len(bay_data)
            available_bays = 0
            
            # Process each parking bay
            for bay_record in bay_data:
                bay_id = bay_record.get('bay_id')
                if not bay_id:
                    continue
                
                # Get location data
                geometry = bay_record.get('geometry', {})
                coordinates = geometry.get('coordinates', [])
                latitude = coordinates[1] if len(coordinates) > 1 else None
                longitude = coordinates[0] if len(coordinates) > 0 else None
                
                # Get bay details
                bay_type = bay_record.get('parking_type', 'standard')
                
                # Check sensor status
                sensor_info = sensor_lookup.get(bay_id, {})
                status = sensor_info.get('status', 'unknown').lower()
                
                # Determine availability
                if status in ['vacant', 'unoccupied', 'available', '0']:
                    available_bays += 1
                    final_status = 'vacant'
                elif status in ['occupied', 'occupied_paid', 'occupied_unpaid', '1']:
                    final_status = 'occupied'
                else:
                    final_status = 'unknown'
                
                # Upsert bay data
                bay_upsert = """
                    INSERT INTO parking_bays (
                        bay_id, street_id, status, latitude, longitude, 
                        bay_type, last_updated
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    ON CONFLICT (bay_id) 
                    DO UPDATE SET 
                        status = EXCLUDED.status,
                        latitude = EXCLUDED.latitude,
                        longitude = EXCLUDED.longitude,
                        bay_type = EXCLUDED.bay_type,
                        last_updated = EXCLUDED.last_updated
                """
                
                await database.execute(
                    bay_upsert, 
                    bay_id, street_id, final_status, latitude, longitude,
                    bay_type, datetime.now()
                )
            
            # Update street summary
            street_update = """
                UPDATE streets 
                SET total_bays = $1, available_bays = $2, last_updated = $3
                WHERE street_id = $4
            """
            
            await database.execute(
                street_update, 
                total_bays, available_bays, datetime.now(), street_id
            )
            
            occupancy_rate = ((total_bays - available_bays) / total_bays * 100) if total_bays > 0 else 0
            print(f"{street_full_name}: {available_bays}/{total_bays} available ({occupancy_rate:.1f}% occupied)")
        
        print("Parking data update completed")
    
    async def test_api_connection(self):
        """Test API connectivity and data availability"""
        print("Testing API v2.1 connection...")
        
        for street in self.target_streets:
            bay_count = len(self.fetch_parking_bays_data(street))
            sensor_count = len(self.fetch_sensor_data(street))
            
            print(f"{street} Street - Bays: {bay_count}, Sensors: {sensor_count}")


# For standalone execution
if __name__ == "__main__":
    import asyncio
    from database import database
    
    async def main():
        await database.connect()
        manager = StreetParkingManager()
        await manager.initialize_streets()
        await manager.update_street_availability()
        await database.disconnect()
    
    asyncio.run(main())
