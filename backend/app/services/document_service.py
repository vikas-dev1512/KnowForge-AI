from app.services.vector_service import rebuild_vector_store
import json
import os

from datetime import datetime

METADATA_FILE = "app/metadata/documents.json"


def save_document(filename, pages, chunks):

    os.makedirs(os.path.dirname(METADATA_FILE), exist_ok=True)

    documents = []

    if os.path.exists(METADATA_FILE):
        try:
            with open(METADATA_FILE, "r") as f:
                documents = json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            documents = []

    documents.append({
        "name": filename,
        "pages": pages,
        "chunks": chunks,
        "uploaded": datetime.now().strftime("%d %b %Y %H:%M")
    })

    with open(METADATA_FILE, "w") as f:
        json.dump(documents, f, indent=4)


def get_documents():

    if not os.path.exists(METADATA_FILE):
        return []

    try:
        with open(METADATA_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def delete_document(filename):

    documents = get_documents()

    documents = [
        doc
        for doc in documents
        if doc["name"] != filename
    ]

    with open(METADATA_FILE, "w") as f:
        json.dump(documents, f, indent=4)

    pdf_path = os.path.join("app", "uploads", filename)

    if os.path.exists(pdf_path):
        os.remove(pdf_path)

    # 👇 VERY IMPORTANT
    rebuild_vector_store()

    return True