import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional
import google.generativeai as genai
from dotenv import load_dotenv

# Import database connection and models
from backend.database.connection import get_db
from backend.database.models import Alert, Shelter, Weather, Road, RiskTrend, Incident

load_dotenv()

router = APIRouter(prefix="/api")

# Configure Gemini for Incident Classification
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

# Input/Output Models
class IncidentCreate(BaseModel):
    title: str
    description: str
    location: str
    reporter_name: Optional[str] = "Anonymous"
    contact: Optional[str] = ""

class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    severity: str
    category: str
    reporter_name: str
    contact: str
    status: str
    
    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    title: str
    location: str
    severity: str
    time: str
    latitude: Optional[float]
    longitude: Optional[float]
    details: str
    
    class Config:
        from_attributes = True

class ShelterResponse(BaseModel):
    id: int
    name: str
    location: str
    capacity: int
    available: int
    contact: str
    status: str
    latitude: Optional[float]
    longitude: Optional[float]
    
    class Config:
        from_attributes = True

class WeatherResponse(BaseModel):
    location: str
    temp: float
    humidity: int
    wind_speed: float
    condition: str
    
    class Config:
        from_attributes = True

class RoadResponse(BaseModel):
    name: str
    status: str
    condition: str
    traffic_level: str
    
    class Config:
        from_attributes = True

class RiskTrendResponse(BaseModel):
    month: str
    risk_score: int
    response_score: int
    
    class Config:
        from_attributes = True

# Helper: AI incident analysis using Gemini
def analyze_incident_with_ai(title: str, description: str):
    default_category = "Other"
    default_severity = "Moderate"
    
    # 1. Simple rule-based fallback keywords
    text = (title + " " + description).lower()
    if "flood" in text or "water" in text or "drown" in text:
        default_category = "Flood"
    elif "cyclone" in text or "storm" in text or "wind" in text:
        default_category = "Cyclone"
    elif "fire" in text or "smoke" in text or "wildfire" in text:
        default_category = "Wildfire"
    elif "earthquake" in text or "quake" in text or "tremor" in text:
        default_category = "Earthquake"
    elif "road" in text or "block" in text or "tree" in text or "landslide" in text:
        default_category = "Road Blockage"
        
    if "critical" in text or "urgent" in text or "save" in text or "trapped" in text or "die" in text or "injury" in text:
        default_severity = "Critical"
    elif "high" in text or "danger" in text or "damage" in text:
        default_severity = "High"
    elif "low" in text or "minor" in text:
        default_severity = "Low"

    # 2. Call Gemini for high-quality classification if API key is present
    if gemini_api_key:
        try:
            model = genai.GenerativeModel("gemini-1.5-flash")
            prompt = (
                "You are an AI disaster dispatcher agent. Analyze this citizen incident report:\n"
                f"Title: {title}\n"
                f"Description: {description}\n\n"
                "Return exactly two lines in this format:\n"
                "CATEGORY: <Category>\n"
                "SEVERITY: <Severity>\n\n"
                "Allowed Categories: Flood, Cyclone, Wildfire, Earthquake, Road Blockage, Medical Emergency, Other\n"
                "Allowed Severities: Critical, High, Moderate, Low"
            )
            response = model.generate_content(prompt)
            lines = response.text.strip().split("\n")
            category = default_category
            severity = default_severity
            for line in lines:
                if line.startswith("CATEGORY:"):
                    cat_val = line.replace("CATEGORY:", "").strip()
                    if cat_val in ["Flood", "Cyclone", "Wildfire", "Earthquake", "Road Blockage", "Medical Emergency", "Other"]:
                        category = cat_val
                elif line.startswith("SEVERITY:"):
                    sev_val = line.replace("SEVERITY:", "").strip()
                    if sev_val in ["Critical", "High", "Moderate", "Low"]:
                        severity = sev_val
            return category, severity
        except Exception as e:
            print(f"Gemini incident analysis failed: {e}")
            
    return default_category, default_severity


# Routes
@router.get("/disasters")
def get_disasters():
    return {
        "message": "Disaster API Working. Please fetch specialized endpoints like /api/alerts or /api/shelters."
    }

@router.get("/alerts", response_model=List[AlertResponse])
def get_alerts(db: Session = Depends(get_db)):
    return db.query(Alert).all()

@router.get("/shelters", response_model=List[ShelterResponse])
def get_shelters(db: Session = Depends(get_db)):
    return db.query(Shelter).all()

@router.get("/weather", response_model=List[WeatherResponse])
def get_weather(db: Session = Depends(get_db)):
    return db.query(Weather).all()

@router.get("/roads", response_model=List[RoadResponse])
def get_roads(db: Session = Depends(get_db)):
    return db.query(Road).all()

@router.get("/risk", response_model=List[RiskTrendResponse])
def get_risk(db: Session = Depends(get_db)):
    return db.query(RiskTrend).all()

@router.get("/incidents", response_model=List[IncidentResponse])
def get_incidents(db: Session = Depends(get_db)):
    return db.query(Incident).order_by(Incident.id.desc()).all()

@router.post("/incident", response_model=IncidentResponse)
def create_incident(incident_data: IncidentCreate, db: Session = Depends(get_db)):
    # Run AI incident category classification and severity assessment
    category, severity = analyze_incident_with_ai(incident_data.title, incident_data.description)
    
    new_incident = Incident(
        title=incident_data.title,
        description=incident_data.description,
        location=incident_data.location,
        reporter_name=incident_data.reporter_name,
        contact=incident_data.contact,
        severity=severity,
        category=category,
        status="Pending"
    )
    
    try:
        db.add(new_incident)
        db.commit()
        db.refresh(new_incident)
        
        # Proactively trigger a new Alert in the database if severity is High or Critical
        if severity in ["Critical", "High"]:
            # Check if this alert already exists
            existing_alert = db.query(Alert).filter(Alert.title.like(f"%{category}%"), Alert.location == incident_data.location).first()
            if not existing_alert:
                new_alert = Alert(
                    title=f"Citizen Alert: {category} Reported",
                    location=incident_data.location,
                    severity=severity,
                    time="Just now",
                    details=f"Citizen report: '{incident_data.title}' - {incident_data.description}",
                    latitude=17.385,  # default lat/lng
                    longitude=78.4867
                )
                db.add(new_alert)
                db.commit()
                
        return new_incident
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create incident: {str(e)}")