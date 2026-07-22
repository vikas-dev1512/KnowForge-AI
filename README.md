# 🚀 KnowForge AI

> AI-Powered Industrial Knowledge Intelligence Platform  
> Built for **ET AI Hackathon 2.0**

---

## 📖 Overview

KnowForge AI is an AI-powered knowledge intelligence platform that enables users to upload industrial documents and interact with them using natural language.

Instead of manually searching through lengthy PDFs, users can ask questions and receive accurate, context-aware answers with references to the original document pages.

The platform combines **Retrieval-Augmented Generation (RAG)**, semantic search, vector databases, and Google's Gemini AI to deliver intelligent document understanding.

---

# ✨ Features

- 📄 Upload PDF documents
- 🤖 AI-powered Question Answering
- 🔍 Semantic Search using FAISS
- 🧠 Sentence Transformer Embeddings
- 📚 Context-aware RAG Pipeline
- 📍 Source Page References
- 📊 Analytics Dashboard
- 📂 Knowledge Base Management
- 💬 Interactive Chat Interface
- ⚡ FastAPI Backend
- 🎨 Modern React + Vite Frontend

---

# 🏗️ System Architecture

```
PDF Documents
      │
      ▼
Text Extraction (PyMuPDF)
      │
      ▼
Document Chunking
      │
      ▼
Sentence Transformers
(all-MiniLM-L6-v2)
      │
      ▼
FAISS Vector Database
      │
      ▼
Semantic Search
      │
      ▼
Top Relevant Chunks
      │
      ▼
Gemini 2.5 Flash
      │
      ▼
AI Generated Answer
      │
      ▼
Source References
```

---

# ⚙️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React PDF

## Backend

- FastAPI
- Python
- SentenceTransformers
- FAISS
- PyMuPDF
- Google Gemini API

---

# 🧠 How It Works

1. User uploads PDF documents.
2. Text is extracted from PDFs.
3. Documents are split into semantic chunks.
4. Sentence Transformers generate embeddings.
5. Embeddings are stored in FAISS.
6. User asks a question.
7. Semantic search retrieves relevant chunks.
8. Gemini generates a context-aware response.
9. Source page references are returned with every answer.

---

# 📂 Project Structure

```
KnowForge-AI
│
├── backend/
│   ├── app/
│   ├── services/
│   ├── routes/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
│   ├── Project_Report.pdf
│   └── Presentation.pptx
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📸 Screenshot
<img width="1910" height="915" alt="Screenshot 2026-07-22 224456" src="https://github.com/user-attachments/assets/fab310d8-09f6-4fad-8b2a-369e823006e3" />
<img width="1901" height="892" alt="Screenshot 2026-07-22 224525" src="https://github.com/user-attachments/assets/e81fce31-75bf-4adb-87f7-040b029f519f" />
<img width="1917" height="1025" alt="Screenshot 2026-07-22 224607" src="https://github.com/user-attachments/assets/75788443-939d-4574-bd60-94dfc9ffc213" />
<img width="1917" height="905" alt="Screenshot 2026-07-22 224613" src="https://github.com/user-attachments/assets/07f1072c-57f1-41ae-902c-4f2c725494be" />
<img width="1917" height="923" alt="Screenshot 2026-07-22 224654" src="https://github.com/user-attachments/assets/91e89341-094a-4b66-85af-bd84545bdf55" />
<img width="1916" height="902" alt="Screenshot 2026-07-22 225101" src="https://github.com/user-attachments/assets/a2d16e1c-0851-4d1f-94c3-319acd7204c8" />
<img width="1916" height="918" alt="Screenshot 2026-07-22 225134" src="https://github.com/user-attachments/assets/cad59463-5f25-4074-b6dc-98475bd33023" />
<img width="1917" height="891" alt="Screenshot 2026-07-22 225210" src="https://github.com/user-attachments/assets/6a9910cd-61ee-44ac-b92f-b06a79367c21" />
<img width="1912" height="903" alt="Screenshot 2026-07-22 225239" src="https://github.com/user-attachments/assets/484e244b-3cc2-4b9d-a3c3-08d6108b879d" />
<img width="1883" height="912" alt="Screenshot 2026-07-22 225305" src="https://github.com/user-attachments/assets/0e2e6fc0-9312-402d-a05b-d80f08b6e9a6" />
<img width="1917" height="917" alt="Screenshot 2026-07-22 225345" src="https://github.com/user-attachments/assets/bd98a4e1-7d3f-43c6-aee6-7629409c1685" />









# 🎯 Future Scope

- Multi-document querying
- OCR support for scanned PDFs
- Role-based authentication
- Cloud deployment
- Multi-language support
- Enterprise knowledge management
- Voice-based document interaction

---

# 👨‍💻 Team

ET AI Hackathon 2.0

Project Name:

**KnowForge AI**

---

# 📄 Documentation

Complete documentation is available inside the **docs/** folder.

- 📘 Project Report
  

---

# 📜 License

This project was developed for educational and hackathon purposes.
