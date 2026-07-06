FROM python:3.11-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire workspace to ensure ai/ models and databases are included
COPY . .

# Run ingestion script to build the RAG vector database inside the container image
RUN python -m ai.rag.ingest

# Set environment variable for python path
ENV PYTHONPATH=/app

# Start FastAPI application
CMD python -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8080}
