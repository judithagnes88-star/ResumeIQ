import re
from typing import List, Dict

def sanitize_text(text: str) -> str:
    """Sanitize and normalize extracted resume or JD text."""
    if not text:
        return ""
    # Remove null bytes and non-printable characters
    cleaned = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    # Normalize multiple whitespace
    cleaned = re.sub(r'\s+', ' ', cleaned)
    return cleaned.strip()

def extract_contact_info(text: str) -> Dict[str, str]:
    """Deterministically extracts email, phone, and links from text."""
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    github_match = re.search(r'github\.com/([a-zA-Z0-9-_]+)', text)
    linkedin_match = re.search(r'linkedin\.com/in/([a-zA-Z0-9-_]+)', text)

    return {
        "email": email_match.group(0) if email_match else "",
        "phone": phone_match.group(0) if phone_match else "",
        "github": github_match.group(1) if github_match else "",
        "linkedin": linkedin_match.group(1) if linkedin_match else "",
    }

def detect_quantification(bullet: str) -> Dict:
    """Detects numbers, percentages, latencies, and monetary figures."""
    metric_patterns = [
        r'\d+%',
        r'\$\d+(?:,\d+)*(?:\.\d+)?',
        r'\b\d+(?:,\d+)*(?:\.\d+)?\b',
        r'\b\d+\s*(?:ms|seconds|minutes|hours|days|weeks|months)\b',
        r'\b\d+\s*(?:req/min|tps|users|clients|records|accounts)\b',
        r'\b(?:slashed|reduced|boosted|increased|saved)\s+by\s+\d+%',
    ]
    detected = []
    for pattern in metric_patterns:
        matches = re.findall(pattern, bullet, re.IGNORECASE)
        detected.extend(matches)

    detected = list(set(detected))
    return {
        "has_metrics": len(detected) > 0,
        "metrics": detected
    }
