from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import disaster, disasters, prediction
from backend.database.connection import init_db

app = FastAPI(
    title="Aegis Analytics API",
    description="Backend API for Disaster Intelligence Platform",
    version="1.0"
)

@app.on_event("startup")
def startup_event():
    # Initialize and seed database
    init_db()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(disaster.router)
app.include_router(disasters.router, prefix="/api")
app.include_router(prediction.router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Aegis Analytics"
    }

@app.get("/health")
def health():
    return {
        "status": "Running"
    }