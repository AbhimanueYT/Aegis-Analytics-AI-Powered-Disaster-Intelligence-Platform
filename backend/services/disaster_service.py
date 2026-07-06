from backend.models.disaster import Disaster

def get_disasters():

    disasters = [

        Disaster(
            id=1,
            location="Hyderabad",
            type="Flood",
            severity="High"
        ),

        Disaster(
            id=2,
            location="Chennai",
            type="Cyclone",
            severity="Medium"
        ),

        Disaster(
            id=3,
            location="Delhi",
            type="Earthquake",
            severity="Low"
        )

    ]

    return disasters