import faiss
import numpy as np
import pickle
import os

VECTOR_DIR = "app/vectorstore"


def save_vectors(chunks, embeddings):
    os.makedirs(VECTOR_DIR, exist_ok=True)

    vectors = np.array(embeddings, dtype="float32")

    # Normalize vectors for cosine similarity
    faiss.normalize_L2(vectors)

    # Inner Product Index (Cosine Similarity)
    index = faiss.IndexFlatIP(vectors.shape[1])

    index.add(vectors)

    faiss.write_index(index, os.path.join(VECTOR_DIR, "index.faiss"))

    with open(os.path.join(VECTOR_DIR, "chunks.pkl"), "wb") as f:
        pickle.dump(chunks, f)

    print(f"✅ Saved {len(chunks)} chunks to FAISS.")

def search_vectors(query_embedding, top_k=10):

    index = faiss.read_index(os.path.join(VECTOR_DIR, "index.faiss"))

    with open(os.path.join(VECTOR_DIR, "chunks.pkl"), "rb") as f:
        chunks = pickle.load(f)

    query = np.array([query_embedding], dtype="float32")
    faiss.normalize_L2(query)

    similarities, indices = index.search(query, top_k)

    results = []

    seen_pages = set()

    for similarity, idx in zip(similarities[0], indices[0]):

        if idx == -1:
            continue

        chunk = chunks[idx].copy()

        text = chunk["text"].strip().lower()

        # Skip duplicate pages
        if chunk["page"] in seen_pages:
            continue

        # Skip useless chunks
        if (
            len(text) < 120
            or "index" in text
            or "table of contents" in text
            or "contents" in text
        ):
            continue

        seen_pages.add(chunk["page"])

        similarity_percent = round(((float(similarity) + 1) / 2) * 100)

        chunk["similarity"] = similarity_percent

        results.append(chunk)

        # Return only best 3
        if len(results) == 3:
            break

    return results
import glob

from app.services.pdf_service import extract_pages
from app.services.chunk_service import chunk_pages
from app.services.embedding_service import get_embedding


def rebuild_vector_store():

    all_chunks = []
    all_embeddings = []

    pdf_files = glob.glob("app/uploads/*.pdf")

    print(f"Rebuilding vector store from {len(pdf_files)} PDFs...")

    for pdf in pdf_files:

        pages = extract_pages(pdf)

        chunks = chunk_pages(pages)

        filename = os.path.basename(pdf)

        for chunk in chunks:
            chunk["file"] = filename

        embeddings = [
            get_embedding(chunk["text"])
            for chunk in chunks
        ]

        all_chunks.extend(chunks)
        all_embeddings.extend(embeddings)

    if all_chunks:
        save_vectors(all_chunks, all_embeddings)
    else:
        # No PDFs left — create empty store by removing old files
        for f in [
            "app/vectorstore/index.faiss",
            "app/vectorstore/chunks.pkl",
        ]:
            if os.path.exists(f):
                os.remove(f)

    print("✅ Vector store rebuilt.")