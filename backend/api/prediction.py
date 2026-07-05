import os
from typing import Dict, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import google.generativeai as genai
from dotenv import load_dotenv

# Import our AI components
from ai.prediction.predict import FloodPredictor
from ai.recommendation.engine import RecommendationEngine
from ai.rag.retriever import DisasterRetriever

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api")

# Initialize AI instances
try:
    predictor = FloodPredictor()
    recommendation_engine = RecommendationEngine()
except Exception as e:
    print(f"Warning: Failed to load prediction models: {e}")
    predictor = None
    recommendation_engine = None

try:
    retriever = DisasterRetriever()
except Exception as e:
    print(f"Warning: Failed to initialize ChromaDB retriever: {e}")
    retriever = None

# Configure Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
else:
    print("Warning: GEMINI_API_KEY not found in environment variables. Chat endpoint will return retrieved text context only.")

# Pydantic input models
class PredictionInput(BaseModel):
    MonsoonIntensity: int = Field(..., ge=0, le=10)
    TopographyDrainage: int = Field(..., ge=0, le=10)
    RiverManagement: int = Field(..., ge=0, le=10)
    Deforestation: int = Field(..., ge=0, le=10)
    Urbanization: int = Field(..., ge=0, le=10)
    ClimateChange: int = Field(..., ge=0, le=10)
    DamsQuality: int = Field(..., ge=0, le=10)
    Siltation: int = Field(..., ge=0, le=10)
    AgriculturalPractices: int = Field(..., ge=0, le=10)
    Encroachments: int = Field(..., ge=0, le=10)
    IneffectiveDisasterPreparedness: int = Field(..., ge=0, le=10)
    DrainageSystems: int = Field(..., ge=0, le=10)
    CoastalVulnerability: int = Field(..., ge=0, le=10)
    Landslides: int = Field(..., ge=0, le=10)
    Watersheds: int = Field(..., ge=0, le=10)
    DeterioratingInfrastructure: int = Field(..., ge=0, le=10)
    PopulationScore: int = Field(..., ge=0, le=10)
    WetlandLoss: int = Field(..., ge=0, le=10)
    InadequatePlanning: int = Field(..., ge=0, le=10)
    PoliticalFactors: int = Field(..., ge=0, le=10)

class ChatMessage(BaseModel):
    role: str
    message: str

class ChatInput(BaseModel):
    question: str
    history: Optional[List[ChatMessage]] = []

@router.post("/predict")
def predict_flood(input_data: PredictionInput):
    if not predictor or not recommendation_engine:
        raise HTTPException(
            status_code=503,
            detail="Prediction models are not initialized. Check server logs."
        )
    
    try:
        # Convert Pydantic object to dict
        features_dict = input_data.model_dump()
        result = recommendation_engine.recommend(features_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.post("/chat")
def chat_rag(input_data: ChatInput):
    if not retriever:
        raise HTTPException(
            status_code=503,
            detail="ChromaDB RAG retriever is not initialized. Check server logs."
        )
    
    try:
        # 1. Search vector database for relevant disaster guidelines
        search_results = retriever.search(input_data.question, top_k=4)
        
        # 2. Extract texts to form context
        context_blocks = []
        for doc in search_results:
            context_blocks.append(f"Source: {doc['source']} (Page {doc['page']})\nContent: {doc['text']}")
        context = "\n\n---\n\n".join(context_blocks)
        
        # 3. Generate response using Gemini if key is provided
        ai_response = ""
        used_gemini = False
        
        if gemini_api_key:
            try:
                model = genai.GenerativeModel("gemini-1.5-flash")
                prompt = (
                    "You are Aegis AI, the intelligent disaster management assistant for Aegis Analytics.\n"
                    "Use the following retrieved official disaster guidelines and context to answer the user's question.\n"
                    "Provide a professional, clear, action-oriented, and structured response.\n"
                    "If the context doesn't contain the answer, use your pre-trained knowledge on emergency management "
                    "to provide general guidance, but clearly state that it is general advice.\n\n"
                    f"Context:\n{context}\n\n"
                    f"User Question: {input_data.question}\n"
                    "Answer:"
                )
                response = model.generate_content(prompt)
                ai_response = response.text
                used_gemini = True
            except Exception as e:
                ai_response = f"Error generating response from Gemini API: {str(e)}"
        else:
            ai_response = (
                "Gemini API is not configured on the backend. "
                "Here are the relevant sections retrieved from the disaster management guidelines:\n\n" + 
                "\n\n".join([f"- From {r['source']} (Page {r['page']}): {r['text']}" for r in search_results])
            )
            
        return {
            "answer": ai_response,
            "used_gemini": used_gemini,
            "sources": search_results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat execution error: {str(e)}")
