
from dotenv import load_dotenv
import openai
import base64

load_dotenv()
ENABLE_VISION_TAGGING = os.getenv("ENABLE_VISION_TAGGING", "false").lower() == "true"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
openai.api_key = OPENAI_API_KEY

def run_openai_vision_analysis(image_path):
    with open(image_path, "rb") as img:
        b64_image = base64.b64encode(img.read()).decode("utf-8")

    result = openai.ChatCompletion.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this image in detail"},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64_image}"}}
                ]
            }
        ],
        max_tokens=300
    )
    return result.choices[0].message["content"]



from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import sqlite3
import shutil
import os
from datetime import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploaded_media"
DB_PATH = "jordibot.sqlite"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload-media")
async def upload_media(file: UploadFile = File(...), reply_to: int = Form(...)):
    filename = f"{datetime.utcnow().timestamp()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save file path to reply
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("UPDATE replies SET media_url = ? WHERE id = ?", (file_path, reply_to))
    import requests
    SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL", "")
    
    if ENABLE_VISION_TAGGING and filename.lower().endswith((".jpg", ".jpeg", ".png")):
        tags = run_openai_vision_analysis(file_path)
        print("[Vision] Tags:", tags)
        cur.execute("UPDATE replies SET vision_tags = ? WHERE id = ?", (tags, reply_to))
        if SLACK_WEBHOOK_URL:
            requests.post(SLACK_WEBHOOK_URL, json={"text": f"🧠 Vision tags for reply {reply_to}: {tags}"})
    conn.commit()
    conn.close()

    return JSONResponse({"status": "uploaded", "path": file_path})

@app.get("/api/replies")
def get_all_replies():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM replies")
    rows = cur.fetchall()
    return {"replies": [dict(row) for row in rows]}