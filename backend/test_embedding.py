from app.services.embedding_service import get_embedding

embedding = get_embedding("What is DBMS?")

print(len(embedding))
print(embedding[:10])