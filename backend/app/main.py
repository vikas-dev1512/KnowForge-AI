from fastapi.staticfiles import StaticFiles
from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.documents import router as document_router
app = FastAPI(
    title="KnowForge AI",
    description="Industrial Knowledge Intelligence Platform",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload_router)
app.include_router(document_router)
app.include_router(chat_router)
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)
@app.get("/")
def home():
    return {
        "message": "🚀 Welcome to KnowForge AI Backend"
    }