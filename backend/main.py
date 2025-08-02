import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import shutil
import sqlite3
from datetime import datetime
import requests
import uuid

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

DB_PATH = "jordibot.sqlite"
ENABLE_VISION_TAGGING = os.getenv("ENABLE_VISION_TAGGING", "false").lower() == "true"
SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL", "")

def run_openai_vision_analysis(image_path):
    return "tag1, tag2, tag3"  # mock tags

def get_db():
    return sqlite3.connect(DB_PATH)

@app.post("/api/upload-media")
async def upload_media(file: UploadFile = File(...), reply_to: str = Form(...)):
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    conn = get_db()
    cur = conn.cursor()
    cur.execute("UPDATE replies SET media_url = ? WHERE id = ?", (file_path, reply_to))

    if ENABLE_VISION_TAGGING and file_ext.lower() in [".jpg", ".jpeg", ".png"]:
        tags = run_openai_vision_analysis(file_path)
        cur.execute("UPDATE replies SET vision_tags = ? WHERE id = ?", (tags, reply_to))
        if SLACK_WEBHOOK_URL:
            requests.post(SLACK_WEBHOOK_URL, json={"text": f"🧠 Vision tags for reply {reply_to}: {tags}"})

    conn.commit()
    conn.close()
    return {"status": "ok", "filename": filename}
@app.get("/api/dashboard/messages")
async def get_dashboard_messages():
    return {
        "messages": [
            {"sender": "subscriber1", "message": "Hey Jordi!", "timestamp": "2025-08-01T14:00:00", "media_url": ""},
            {"sender": "Jordi", "message": "Hi back 💕", "timestamp": "2025-08-01T14:05:00", "media_url": ""},
            {"sender": "subscriber2", "message": "Can you send a new pic?", "timestamp": "2025-08-02T10:20:00", "media_url": ""}
        ]
    }

@app.post("/api/openai")
async def get_openai_reply(payload: dict):
    input_text = payload.get("input", "")
    return {"reply": f"Suggested AI reply to: {input_text}"}

@app.post("/api/upload-media")
async def upload_media_test(file: UploadFile = File(...), reply_to: str = Form(...)):
    filename = f"mock_{file.filename}"
    return {
        "status": "ok",
        "filename": filename,
        "suggested_prompt": "Suggested GPT prompt from media (mock)"
    }