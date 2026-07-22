from fastapi import APIRouter

from app.services.document_service import (
    get_documents,
    delete_document,
)

from app.services.stats_service import get_stats
from app.services.vector_service import rebuild_vector_store

router = APIRouter()


@router.get("/documents")
def list_documents():
    return get_documents()


@router.delete("/documents/{filename}")
def remove_document(filename: str):

    delete_document(filename)

    rebuild_vector_store()

    return {
        "message": "Document deleted successfully"
    }


@router.get("/dashboard")
def dashboard():

    documents = get_documents()

    stats = get_stats()

    return {
        "documents": len(documents),
        "pages": sum(doc["pages"] for doc in documents),
        "chunks": sum(doc["chunks"] for doc in documents),
        "queries": stats["queries"]
    }