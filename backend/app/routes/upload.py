from fastapi import APIRouter, UploadFile, File
from app.services.document_service import save_document
import os
import shutil

from app.services.pdf_service import extract_pages
from app.services.chunk_service import chunk_pages

from app.services.vector_service import rebuild_vector_store

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Extracting text...")
    pages = extract_pages(file_path)

    print("Chunking...")
    chunks = chunk_pages(pages)

    save_document(
    filename=file.filename,
    pages=len(pages),
    chunks=len(chunks)
)

    print("Rebuilding Knowledge Base...")
    rebuild_vector_store()
    return {
        "success": True,
        "filename": file.filename
    }