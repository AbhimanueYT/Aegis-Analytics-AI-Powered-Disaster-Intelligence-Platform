from fastapi import FastAPI
from backend.api import disaster

app = FastAPI(
    title="Aegis Analytics API",
    description="Backend API for Disaster Intelligence Platform",
    version="1.0.0"
)

app.include_router(disaster.router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Aegis Analytics Backend"
    }

@app.get("/health")
def health():
    return {
        "status": "Backend Running Successfully"
    }