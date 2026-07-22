from sentence_transformers import SentenceTransformer

# Load model once when the server starts
model = SentenceTransformer("all-MiniLM-L6-v2")


def get_embedding(text: str):
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding.tolist()