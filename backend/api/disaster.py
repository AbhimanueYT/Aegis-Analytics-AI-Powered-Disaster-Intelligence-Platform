from fastapi import APIRouter

router = APIRouter()

@router.get("/disasters")
def get_disasters():
    return {
        "message": "Disaster API Working"
    }