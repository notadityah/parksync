from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from databases import Database
import os
from dotenv import load_dotenv

# Load environment variables from root .env file
load_dotenv(dotenv_path="../.env")

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/parksync_db")

# Async database connection
database = Database(DATABASE_URL)

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Street(Base):
    __tablename__ = "streets"
    
    street_id = Column(Integer, primary_key=True, index=True)
    street_name = Column(String(100), unique=True, index=True)
    total_bays = Column(Integer, default=0)
    available_bays = Column(Integer, default=0)
    last_updated = Column(DateTime)
    
    # Relationship
    bays = relationship("ParkingBay", back_populates="street")


class ParkingBay(Base):
    __tablename__ = "parking_bays"
    
    bay_id = Column(String(50), primary_key=True, index=True)
    street_id = Column(Integer, ForeignKey("streets.street_id"))
    bay_number = Column(Integer)
    bay_type = Column(String(50), default="standard")
    status = Column(String(20), default="unknown")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    last_updated = Column(DateTime)
    
    # Relationship
    street = relationship("Street", back_populates="bays")


class ParkingZone(Base):
    __tablename__ = "parking_zones"
    
    zone_id = Column(String(50), primary_key=True, index=True)
    street_id = Column(Integer, ForeignKey("streets.street_id"))
    zone_type = Column(String(100))
    restrictions = Column(Text)
    geometry = Column(Text)  # Store GeoJSON
    last_updated = Column(DateTime)


# Create tables automatically (replaces Alembic for solo projects)
def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")


# Dependency for getting database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
