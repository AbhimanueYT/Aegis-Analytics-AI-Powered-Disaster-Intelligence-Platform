"""
Creates and manages the ChromaDB vector store.
"""

import chromadb

DB_PATH = "ai/rag/chroma_db"


def get_vector_store():
    client = chromadb.PersistentClient(
    path=DB_PATH,
    settings=chromadb.Settings(
        anonymized_telemetry=False
    )
)

    collection = client.get_or_create_collection(
        name="disaster_documents"
    )

    return collection