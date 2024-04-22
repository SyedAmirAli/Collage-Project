import os
from dotenv import load_dotenv

load_dotenv()

KEY = os.environ.get("GEMINI_API_KEY")
print(KEY)
