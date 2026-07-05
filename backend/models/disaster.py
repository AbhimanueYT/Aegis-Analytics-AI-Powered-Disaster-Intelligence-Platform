from pydantic import BaseModel

class Disaster(BaseModel):
    id: int
    location: str
    type: str
    severity: str