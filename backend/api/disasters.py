from fastapi import APIRouter
from backend.services.disaster_service import get_disasters

router = APIRouter()

@router.get("/disasters")
def disasters():
    return get_disasters()