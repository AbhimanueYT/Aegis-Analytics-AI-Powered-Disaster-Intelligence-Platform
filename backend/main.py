from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import disaster, prediction

app = FastAPI(
    title="Aegis Analytics API",
    description="Backend API for Disaster Intelligence Platform",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for hackathon simplicity; specify actual origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(disaster.router)
app.include_router(prediction.router)

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