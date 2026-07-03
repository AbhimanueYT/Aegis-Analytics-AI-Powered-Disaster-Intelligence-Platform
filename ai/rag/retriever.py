"""
Retrieves relevant disaster management chunks from ChromaDB.
"""

from sentence_transformers import SentenceTransformer
from ai.rag.vector_store import get_vector_store

EMBEDDING_MODEL = SentenceTransformer("all-MiniLM-L6-v2")


class DisasterRetriever:

    def __init__(self):
        self.collection = get_vector_store()

    def search(self, question, top_k=5):

        # Convert query → embedding
        query_embedding = EMBEDDING_MODEL.encode(question).tolist()

        # Query ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )

        response = []

        for doc, metadata in zip(
            results["documents"][0],
            results["metadatas"][0]
        ):
            response.append({
                "text": doc,
                "source": metadata.get("source", "unknown"),
                "page": metadata.get("page", -1)
            })

        return response


if __name__ == "__main__":

    retriever = DisasterRetriever()

    results = retriever.search(
        "What should be done before a flood?"
    )

    for r in results:
        print("\n" + "=" * 80)
        print("SOURCE:", r["source"])
        print("PAGE:", r["page"])
        print("\n", r["text"])