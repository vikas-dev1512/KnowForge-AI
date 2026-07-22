def chunk_pages(pages, chunk_size=500, overlap=100):

    chunks = []

    for page in pages:

        text = page["text"]

        start = 0

        while start < len(text):

            end = start + chunk_size

            chunks.append({

                "text": text[start:end],

                "page": page["page"]

            })

            start += chunk_size - overlap

    return chunks