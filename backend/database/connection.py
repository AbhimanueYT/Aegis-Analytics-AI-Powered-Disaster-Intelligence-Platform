import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.database.models import Base, Alert, Shelter, Weather, Road, RiskTrend

# Use writeable /tmp/ directory in Cloud Run to prevent read-only filesystem crash
if os.getenv("K_SERVICE"):
    DATABASE_URL = "sqlite:////tmp/aegis.db"
else:
    DATABASE_URL = "sqlite:///backend/database/aegis.db"

# Create database directories if they do not exist
os.makedirs(os.path.dirname(DATABASE_URL.replace("sqlite:///", "")), exist_ok=True)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Check if empty, and seed data
    db = SessionLocal()
    try:
        if db.query(Alert).count() == 0:
            print("Database is empty. Seeding initial Aegis Analytics data...")
            
            # 1. Seed Alerts
            alerts = [
                Alert(
                    title="Severe Flood Warning",
                    location="Hyderabad, Telangana",
                    severity="Critical",
                    time="5 mins ago",
                    latitude=17.385,
                    longitude=78.4867,
                    details="Water levels in Hussain Sagar and Musi River have exceeded danger limits. Evacuation recommended for low-lying areas."
                ),
                Alert(
                    title="Cyclone Alert",
                    location="Chennai, Tamil Nadu",
                    severity="High",
                    time="18 mins ago",
                    latitude=13.0827,
                    longitude=80.2707,
                    details="Cyclone storm expected to make landfall with wind speeds up to 110 km/h. Residents are advised to stay indoors."
                ),
                Alert(
                    title="Wildfire Detected",
                    location="Bengaluru, Karnataka",
                    severity="Moderate",
                    time="42 mins ago",
                    latitude=12.9716,
                    longitude=77.5946,
                    details="Forest fire detected in adjacent reserve forest area. Containment teams have been dispatched."
                ),
                Alert(
                    title="Earthquake Tremors",
                    location="Delhi NCR",
                    severity="Low",
                    time="1 hour ago",
                    latitude=28.6139,
                    longitude=77.209,
                    details="Tremors of magnitude 4.2 felt across the National Capital Region. No major damage or casualty reported."
                )
            ]
            db.add_all(alerts)
            
            # 2. Seed Shelters
            shelters = [
                Shelter(
                    name="Hyderabad Relief Centre",
                    location="Hyderabad, Telangana",
                    capacity=850,
                    available=342,
                    contact="+91 98765 43210",
                    status="Open",
                    latitude=17.395,
                    longitude=78.4967
                ),
                Shelter(
                    name="Visakhapatnam Shelter",
                    location="Visakhapatnam, Andhra Pradesh",
                    capacity=620,
                    available=188,
                    contact="+91 91234 56789",
                    status="Open",
                    latitude=17.6868,
                    longitude=83.2185
                ),
                Shelter(
                    name="Chennai Emergency Camp",
                    location="Chennai, Tamil Nadu",
                    capacity=1000,
                    available=96,
                    contact="+91 99887 66554",
                    status="Almost Full",
                    latitude=13.0927,
                    longitude=80.2807
                )
            ]
            db.add_all(shelters)
            
            # 3. Seed Weather
            weather_data = [
                Weather(location="Hyderabad", temp=22.5, humidity=92, wind_speed=18.4, condition="Heavy Rain"),
                Weather(location="Chennai", temp=25.0, humidity=88, wind_speed=35.0, condition="Stormy"),
                Weather(location="Bengaluru", temp=21.0, humidity=75, wind_speed=12.0, condition="Cloudy"),
                Weather(location="Delhi", temp=32.0, humidity=40, wind_speed=8.0, condition="Clear"),
                Weather(location="Visakhapatnam", temp=26.5, humidity=85, wind_speed=25.0, condition="Rain")
            ]
            db.add_all(weather_data)
            
            # 4. Seed Roads
            roads = [
                Road(name="Musi River Bridge Road", status="Closed", condition="Flooded", traffic_level="Heavy"),
                Road(name="ECR Expressway Chennai", status="Closed", condition="Blocked by Fallen Trees", traffic_level="Heavy"),
                Road(name="Bengaluru Outer Ring Road", status="Open", condition="Wet surface", traffic_level="Moderate"),
                Road(name="Delhi Metro Expressway", status="Open", condition="Clear", traffic_level="Light")
            ]
            db.add_all(roads)
            
            # 5. Seed Risk Trends
            trends = [
                RiskTrend(month="Jan", risk_score=32, response_score=18),
                RiskTrend(month="Feb", risk_score=45, response_score=24),
                RiskTrend(month="Mar", risk_score=52, response_score=31),
                RiskTrend(month="Apr", risk_score=40, response_score=26),
                RiskTrend(month="May", risk_score=61, response_score=38),
                RiskTrend(month="Jun", risk_score=70, response_score=45)
            ]
            db.add_all(trends)
            
            db.commit()
            print("Successfully seeded initial data!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()
