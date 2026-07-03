"""
Loads the trained model and predicts flood probability.
Also returns the most important contributing factors.
"""

import joblib
import pandas as pd

MODEL_PATH = "ai/data/flood_model.joblib"

FEATURE_NAMES = [
    "MonsoonIntensity",
    "TopographyDrainage",
    "RiverManagement",
    "Deforestation",
    "Urbanization",
    "ClimateChange",
    "DamsQuality",
    "Siltation",
    "AgriculturalPractices",
    "Encroachments",
    "IneffectiveDisasterPreparedness",
    "DrainageSystems",
    "CoastalVulnerability",
    "Landslides",
    "Watersheds",
    "DeterioratingInfrastructure",
    "PopulationScore",
    "WetlandLoss",
    "InadequatePlanning",
    "PoliticalFactors"
]


class FloodPredictor:

    def __init__(self):
        self.model = joblib.load(MODEL_PATH)

    def get_top_factors(self, top_n=5):

        importance = self.model.feature_importances_

        pairs = list(zip(FEATURE_NAMES, importance))

        pairs.sort(key=lambda x: x[1], reverse=True)

        return [
            {
                "factor": name,
                "importance": round(float(score), 4)
            }
            for name, score in pairs[:top_n]
        ]

    def predict(self, input_data: dict):

        df = pd.DataFrame([input_data])

        probability = float(self.model.predict(df)[0])

        if probability < 0.30:
            level = "Low"
        elif probability < 0.70:
            level = "Medium"
        else:
            level = "High"

        return {
            "flood_probability": round(probability, 4),
            "risk_level": level,
            "confidence": round(probability * 100, 2),
            "top_factors": self.get_top_factors()
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

    predictor = FloodPredictor()

    result = predictor.predict(sample)

    print(result)