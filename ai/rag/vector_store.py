"""
Creates and manages the ChromaDB vector store.
"""

import chromadb

DB_PATH = "ai/rag/chroma_db"
COLLECTION_NAME = "disaster_documents"


def _get_client():
    return chromadb.PersistentClient(
        path=DB_PATH,
        settings=chromadb.Settings(
            anonymized_telemetry=False
        )
    )


def get_vector_store():
    client = _get_client()

    collection = client.get_or_create_collection(
        name=COLLECTION_NAME
    )

    return collection


def reset_vector_store():
    """Delete and recreate the collection so re-ingestion doesn't accumulate duplicates."""

    client = _get_client()

    try:
        client.delete_collection(name=COLLECTION_NAME)
    except Exception:
        pass

    return client.create_collection(name=COLLECTION_NAME)