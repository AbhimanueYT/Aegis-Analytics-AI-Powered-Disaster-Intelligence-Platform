from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Weather(Base):
    __tablename__ = "weather"
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(100), nullable=False)
    temp = Column(Float, default=25.0)
    humidity = Column(Integer, default=60)
    wind_speed = Column(Float, default=5.0)
    condition = Column(String(50), default="Clear")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Road(Base):
    __tablename__ = "roads"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    status = Column(String(50), default="Open")  # Open, Closed, Blocked
    condition = Column(String(100), default="Normal")
    traffic_level = Column(String(50), default="Light")  # Light, Moderate, Heavy
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Shelter(Base):
    __tablename__ = "shelters"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    location = Column(String(200), nullable=False)
    capacity = Column(Integer, default=500)
    available = Column(Integer, default=500)
    contact = Column(String(50), default="")
    status = Column(String(50), default="Open")  # Open, Almost Full, Full
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    location = Column(String(200), nullable=False)
    severity = Column(String(50), default="Low")  # Critical, High, Moderate, Low
    time = Column(String(100), default="Just now")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    details = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

class Incident(Base):
    __tablename__ = "incidents"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, default="")
    location = Column(String(200), nullable=False)
    severity = Column(String(50), default="Low")  # Critical, High, Moderate, Low
    category = Column(String(100), default="Other")  # Flood, Cyclone, Road Damage, etc.
    reporter_name = Column(String(150), default="Anonymous")
    contact = Column(String(50), default="")
    status = Column(String(50), default="Pending")  # Pending, Dispatched, Resolved
    created_at = Column(DateTime, default=datetime.utcnow)

class RiskTrend(Base):
    __tablename__ = "risk_trends"
    
    id = Column(Integer, primary_key=True, index=True)
    month = Column(String(20), nullable=False)
    risk_score = Column(Integer, default=0)
    response_score = Column(Integer, default=0)
