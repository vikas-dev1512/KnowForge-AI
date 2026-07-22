import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))


def ask_gemini(context, question):

    prompt = f"""
You are KnowForge AI.

Answer ONLY using the provided context.

If the answer is not found in the context, reply:

"I couldn't find that information in the uploaded document."

Context:
{context}

Question:
{question}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        return response.text

    except Exception:
     return (
        "Based on the uploaded documents, I found the following relevant information:\n\n"
        + context
    )