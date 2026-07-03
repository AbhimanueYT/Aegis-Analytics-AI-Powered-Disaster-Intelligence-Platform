"""
Recommendation Engine

Uses the prediction result and suggests actions.
"""

from ai.prediction.predict import FloodPredictor


class RecommendationEngine:

    def __init__(self):
        self.predictor = FloodPredictor()

    def recommend(self, input_data):

        prediction = self.predictor.predict(input_data)

        probability = prediction["flood_probability"]

        if probability >= 0.70:

            actions = [
                "Issue immediate flood alerts.",
                "Open emergency shelters.",
                "Deploy rescue teams.",
                "Evacuate high-risk communities.",
                "Monitor river levels continuously."
            ]

            priority = "High"

        elif probability >= 0.30:

            actions = [
                "Increase monitoring frequency.",
                "Prepare emergency shelters.",
                "Notify local authorities.",
                "Inspect drainage systems."
            ]

            priority = "Medium"

        else:

            actions = [
                "Continue routine monitoring.",
                "Maintain disaster preparedness.",
                "No immediate intervention required."
            ]

            priority = "Low"

        return {
            "prediction": prediction,
            "priority": priority,
            "recommended_actions": actions
        }


if __name__ == "__main__":

    sample = {
        "MonsoonIntensity": 8,
        "TopographyDrainage": 6,
        "RiverManagement": 5,
        "Deforestation": 7,
        "Urbanization": 8,
        "ClimateChange": 8,
        "DamsQuality": 4,
        "Siltation": 7,
        "AgriculturalPractices": 5,
        "Encroachments": 7,
        "IneffectiveDisasterPreparedness": 8,
        "DrainageSystems": 4,
        "CoastalVulnerability": 5,
        "Landslides": 6,
        "Watersheds": 5,
        "DeterioratingInfrastructure": 7,
        "PopulationScore": 8,
        "WetlandLoss": 6,
        "InadequatePlanning": 7,
        "PoliticalFactors": 5
    }

    engine = RecommendationEngine()

    print(engine.recommend(sample))