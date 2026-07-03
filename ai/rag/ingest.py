"""
Reads PDF documents, splits them into chunks, generates embeddings,
and stores them in ChromaDB.
"""

import os
import re
import uuid

import wordninja
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

from ai.rag.vector_store import get_vector_store


EMBEDDING_MODEL = SentenceTransformer("all-MiniLM-L6-v2")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1200,
    chunk_overlap=150,
    separators=["\n\n", "\n", ". ", " ", ""]
)

# Matches a short 1-2 char syllable followed by 2+ single letters/digits, each
# separated by a space, e.g. "na t i o n a l" -> "national", "Su m m a r y" -> "Summary".
# Also covers fully spaced-out words like "D I S A S T E R" (prefix length 1).
# Requires 2+ trailing singles so normal short words ("a", "of", "is") next to
# another word are never merged.
_BROKEN_WORD_RE = re.compile(r"\b\w{1,2}(?:[ \t]\w){2,}\b")
_WHITESPACE_RE = re.compile(r"[ \t]+")
_BLANK_LINES_RE = re.compile(r"\n\s*\n+")


def _rejoin_broken_word(match: "re.Match") -> str:
    merged = match.group(0).replace(" ", "").replace("\t", "")
    # wordninja resolves ambiguous runs back into real words/word boundaries,
    # e.g. "Summaryof" -> "Summary of" (regex alone can't tell where one
    # letter-spaced word ends and the next begins).
    return " ".join(wordninja.split(merged))


def clean_extracted_text(text: str) -> str:
    """Fix OCR/PDF extraction spacing artifacts without altering content."""

    if not text:
        return text

    # Collapse "Di S a S t e r" -> "Disaster" (letters split by single spaces)
    text = _BROKEN_WORD_RE.sub(_rejoin_broken_word, text)

    # Collapse multiple spaces/tabs into one
    text = _WHITESPACE_RE.sub(" ", text)

    # Collapse random blank lines into a single newline
    text = _BLANK_LINES_RE.sub("\n", text)

    # Trim trailing spaces on each line
    text = "\n".join(line.strip() for line in text.split("\n"))

    return text.strip()


def ingest_documents():

    collection = get_vector_store()

    folder = "ai/rag/documents"

    for filename in os.listdir(folder):

        if not filename.endswith(".pdf"):
            continue

        print(f"Processing {filename}")

        filepath = os.path.join(folder, filename)

        loader = PyPDFLoader(filepath)

        pages = loader.load()

        for page_number, page in enumerate(pages, start=1):

            cleaned_text = clean_extracted_text(page.page_content)

            chunks = splitter.split_text(cleaned_text)

            for chunk in chunks:

                embedding = EMBEDDING_MODEL.encode(chunk).tolist()

                collection.add(
                    ids=[str(uuid.uuid4())],
                    documents=[chunk],
                    embeddings=[embedding],
                    metadatas=[
                        {
                            "source": filename,
                            "page": page_number,
                            "length": len(chunk)
                        }
                    ]
                )

    print("Documents indexed successfully.")


if __name__ == "__main__":
    ingest_documents()