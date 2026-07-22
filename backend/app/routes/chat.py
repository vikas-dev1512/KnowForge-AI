from app.services.stats_service import increment_queries
from fastapi import APIRouter
from pydantic import BaseModel

from app.services.embedding_service import get_embedding
from app.services.vector_service import search_vectors
from app.services.gemini_service import ask_gemini

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    question = request.question

    embedding = get_embedding(question)

    chunks = search_vectors(embedding)

    print("\n===== Retrieved Chunks =====\n")

    for i, chunk in enumerate(chunks):
      print(f"\nChunk {i+1}\n")
      print(chunk)
      print("-" * 80)

    context = "\n\n".join(chunk["text"] for chunk in chunks)
    answer = ask_gemini(context, question)
    increment_queries()
    return {
    "answer": answer,
    "sources": chunks
}