"""Retrieval + Gemini generation for the AI Decision Assistant."""
import os
import google.generativeai as genai
from dotenv import load_dotenv
from ai.rag.vector_store import VectorStore

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are Aegis Analytics' AI Decision Assistant, helping emergency 
responders and city administrators make disaster response decisions. Use the provided 
context (SOPs, guidelines, historical reports) to answer accurately. If context is 
insufficient, say so rather than guessing. Be concise and actionable."""

class Retriever:
    def __init__(self):
        self.vs = VectorStore()
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def retrieve_context(self, query: str, n_results: int = 5) -> str:
        results = self.vs.query(query, n_results=n_results)
        docs = results.get("documents", [[]])[0]
        return "\n\n---\n\n".join(docs) if docs else "No relevant context found."

    def answer_query(self, query: str) -> dict:
        context = self.retrieve_context(query)
        prompt = f"{SYSTEM_PROMPT}\n\nContext:\n{context}\n\nQuestion: {query}\n\nAnswer:"
        response = self.model.generate_content(prompt)
        return {
            "query": query,
            "answer": response.text,
            "context_used": context
        }


if __name__ == "__main__":
    retriever = Retriever()
    result = retriever.answer_query("Which areas are at highest flood risk?")
    print(result["answer"])