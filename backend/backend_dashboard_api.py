
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "onlyfans_inbox.sqlite"

@app.get("/api/dashboard/messages")
def get_dashboard_messages():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages ORDER BY timestamp DESC")
    rows = cur.fetchall()
    return {"messages": [dict(row) for row in rows]}

@app.get("/api/dashboard/replies")
def get_dashboard_replies():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("""
        SELECT m.sender, m.content AS original, r.response, r.timestamp
        FROM replies r
        JOIN messages m ON m.id = r.message_id
        ORDER BY r.timestamp DESC
    """)
    rows = cur.fetchall()
    return {"replies": [dict(row) for row in rows]}
