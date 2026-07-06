"""
Generates natural-language answers with Gemini on Vertex AI, grounded in
RAG-retrieved context plus the flood prediction and recommendation output.
"""

import json
import os

from dotenv import load_dotenv
import vertexai
from vertexai.generative_models import GenerativeModel

load_dotenv()

PROJECT_ID = os.getenv("GCP_PROJECT_ID")
LOCATION = os.getenv("VERTEX_LOCATION", "us-central1")
MODEL_NAME = os.getenv("VERTEX_MODEL", "gemini-2.5-flash")

SYSTEM_INSTRUCTION = """You are Aegis, an AI-powered disaster management assistant.

Your job is to answer the user's question using the retrieved disaster management documents whenever possible.

Guidelines:
- Prioritize information from the RETRIEVED CONTEXT.
- If information comes from a retrieved document, cite it inline as:
  (Source: <source>, Page: <page>)
- Use the flood prediction and recommendation sections only to personalize the answer.
- If the retrieved context does not contain enough information, clearly say so instead of making up facts.
- Provide practical and concise disaster-response advice.
"""


class GeminiService:

    def __init__(self):

        if not PROJECT_ID:
            raise ValueError(
                "GCP_PROJECT_ID not found. Please set it in your .env file."
            )

        vertexai.init(
            project=PROJECT_ID,
            location=LOCATION
        )

        self.model = GenerativeModel(
            MODEL_NAME,
            system_instruction=SYSTEM_INSTRUCTION
        )

    def _format_context(self, retrieved_context):

        if not retrieved_context:
            return "No relevant documents were retrieved."

        formatted = []

        for i, chunk in enumerate(retrieved_context, start=1):

            formatted.append(
                f"[{i}] "
                f"(Source: {chunk.get('source', 'Unknown')}, "
                f"Page: {chunk.get('page', 'Unknown')})\n"
                f"{chunk.get('text', '')}"
            )

        return "\n\n".join(formatted)

    def _json(self, data):

        if not data:
            return "Not available."

        return json.dumps(data, indent=2)

    def _build_prompt(
        self,
        question,
        retrieved_context,
        prediction,
        recommendation
    ):

        return f"""
RETRIEVED CONTEXT
-----------------
{self._format_context(retrieved_context)}

PREDICTION
----------
{self._json(prediction)}

RECOMMENDATION
--------------
{self._json(recommendation)}

QUESTION
--------
{question}

Answer using the retrieved context whenever possible.
Cite document sources when used.
"""

    def generate_answer(
        self,
        question,
        retrieved_context,
        prediction=None,
        recommendation=None
    ):

        prompt = self._build_prompt(
            question,
            retrieved_context,
            prediction,
            recommendation
        )

        response = self.model.generate_content(prompt)

        return response.text


if __name__ == "__main__":

    service = GeminiService()

    sample_context = [
        {
            "text": "Before a flood, communities should prepare emergency kits and identify evacuation routes.",
            "source": "NDMA Flood Guidelines.pdf",
            "page": 43,
        }
    ]

    sample_prediction = {
        "flood_probability": 0.82,
        "risk_level": "High",
        "confidence": 82.0,
    }

    sample_recommendation = {
        "priority": "High",
        "recommended_actions": [
            "Issue immediate flood alerts.",
            "Open emergency shelters.",
        ],
    }

    answer = service.generate_answer(
        question="What should be done before a flood?",
        retrieved_context=sample_context,
        prediction=sample_prediction,
        recommendation=sample_recommendation,
    )

    print(answer)