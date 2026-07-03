"""ChromaDB vector store for disaster SOPs, guidelines, and historical reports."""
import chromadb
from chromadb.utils import embedding_functions
import os

CHROMA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "chroma_db")

class VectorStore:
    def __init__(self, collection_name: str = "disaster_knowledge"):
        self.client = chromadb.PersistentClient(path=CHROMA_PATH)
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            embedding_function=self.embedding_fn
        )

    def add_documents(self, docs: list[str], metadatas: list[dict], ids: list[str]):
        self.collection.add(documents=docs, metadatas=metadatas, ids=ids)

    def query(self, query_text: str, n_results: int = 5) -> dict:
        return self.collection.query(query_texts=[query_text], n_results=n_results)

    def count(self) -> int:
        return self.collection.count()


if __name__ == "__main__":
    vs = VectorStore()
    print(f"Documents in store: {vs.count()}")