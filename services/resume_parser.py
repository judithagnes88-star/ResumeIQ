import io
from typing import Dict, Any
from utils.text_utils import sanitize_text, extract_contact_info

def parse_resume_bytes(file_bytes: bytes, file_name: str) -> Dict[str, Any]:
    """Extracts text from PDF, DOCX, or TXT file bytes with graceful fallbacks."""
    text = ""
    lower_name = file_name.lower()

    if lower_name.endswith(".txt"):
        try:
            text = file_bytes.decode("utf-8", errors="ignore")
        except Exception:
            text = file_bytes.decode("latin-1", errors="ignore")

    elif lower_name.endswith(".pdf"):
        # Try PyMuPDF (fitz) first, fallback to basic text stream extraction
        try:
            import fitz
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            pages = [page.get_text() for page in doc]
            text = "\n".join(pages)
        except ImportError:
            try:
                import pdfplumber
                with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                    pages = [page.extract_text() or "" for page in pdf.pages]
                    text = "\n".join(pages)
            except Exception:
                text = file_bytes.decode("latin-1", errors="ignore")
        except Exception:
            text = file_bytes.decode("latin-1", errors="ignore")

    elif lower_name.endswith(".docx"):
        try:
            import docx
            doc = docx.Document(io.BytesIO(file_bytes))
            paragraphs = [p.text for p in doc.paragraphs if p.text]
            text = "\n".join(paragraphs)
        except Exception:
            text = file_bytes.decode("latin-1", errors="ignore")

    sanitized = sanitize_text(text)
    contacts = extract_contact_info(sanitized)

    return {
        "fileName": file_name,
        "text": sanitized,
        "charCount": len(sanitized),
        "wordCount": len(sanitized.split()),
        "contacts": contacts,
    }
