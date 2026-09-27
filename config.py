import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = "ResumeIQ — AI Resume & Career Intelligence Platform"
APP_VERSION = "2.0.0"
APP_DESCRIPTION = "Advanced career intelligence platform with multi-role fit radar, ATS simulation, bullet impact rewriter, and explainable AI."

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = "gemini-3.8-flash"

MAX_FILE_SIZE_MB = 10
ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"]

DEFAULT_ROLES = [
    "Backend Developer",
    "Data Analyst",
    "Data Scientist",
    "AI/ML Engineer",
    "Software Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cybersecurity Analyst",
    "Full Stack Developer"
]

EXPERIENCE_LEVELS = [
    "Intern",
    "Entry-level",
    "Junior",
    "Mid-level",
    "Senior"
]
