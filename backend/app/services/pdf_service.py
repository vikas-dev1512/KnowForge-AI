from pypdf import PdfReader


def extract_pages(pdf_path):

    reader = PdfReader(pdf_path)

    pages = []

    for page_num, page in enumerate(reader.pages):

        text = page.extract_text()

        if text:

            pages.append({
                "page": page_num + 1,
                "text": text
            })

    return pages