"""Loads SOPs / guidelines / historical reports, chunks them, and stores in ChromaDB."""
import os
import glob
from ai.rag.vector_store import VectorStore

DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "docs", "sops")

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks

def ingest_directory(docs_dir: str = DOCS_DIR):
    vs = VectorStore()
    files = glob.glob(os.path.join(docs_dir, "*.txt")) + glob.glob(os.path.join(docs_dir, "*.md"))

    if not files:
        print(f"No files found in {docs_dir}. Add SOP/guideline .txt or .md files there.")
        return

    all_chunks, metadatas, ids = [], [], []
    for filepath in files:
        filename = os.path.basename(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            text = f.read()
        chunks = chunk_text(text)
        for idx, chunk in enumerate(chunks):
            all_chunks.append(chunk)
            metadatas.append({"source": filename, "chunk_index": idx})
            ids.append(f"{filename}_{idx}")

    vs.add_documents(all_chunks, metadatas, ids)
    print(f"Ingested {len(all_chunks)} chunks from {len(files)} files.")

if __name__ == "__main__":
    ingest_directory()