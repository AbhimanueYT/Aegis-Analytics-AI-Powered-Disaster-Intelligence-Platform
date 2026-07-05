from fastapi import APIRouter

router = APIRouter()

@router.get("/disasters")
def get_disasters():
    return [
        {
            "id": 1,
            "location": "Hyderabad",
            "type": "Flood",
            "severity": "High"
        },
        {
            "id": 2,
            "location": "Chennai",
            "type": "Cyclone",
            "severity": "Medium"
        }
    ]