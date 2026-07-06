"""
Creates and manages the ChromaDB vector store.
"""

import chromadb

import shutil
import os

DB_PATH = "ai/rag/chroma_db"
COLLECTION_NAME = "disaster_documents"

if os.getenv("K_SERVICE"):
    TMP_DB_PATH = "/tmp/chroma_db"
    if not os.path.exists(TMP_DB_PATH):
        try:
            if os.path.exists(DB_PATH):
                shutil.copytree(DB_PATH, TMP_DB_PATH)
            else:
                os.makedirs(TMP_DB_PATH, exist_ok=True)
        except Exception as e:
            print(f"Error copying ChromaDB to /tmp: {e}")
    DB_PATH = TMP_DB_PATH


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