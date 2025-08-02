
import asyncio
from playwright.async_api import async_playwright
import openai
import os
import sqlite3
from datetime import datetime
import time

# Configurable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-...")
CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL", 3600))  # default: 1 hour

onlyfans_email = os.getenv("ONLYFANS_EMAIL")
onlyfans_password = os.getenv("ONLYFANS_PASSWORD")

openai.api_key = OPENAI_API_KEY

DB = "onlyfans_inbox.sqlite"

def init_db():
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT,
        content TEXT,
        timestamp TEXT,
        replied INTEGER DEFAULT 0
    )""")
    cur.execute("""CREATE TABLE IF NOT EXISTS replies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message_id INTEGER,
        response TEXT,
        timestamp TEXT,
        FOREIGN KEY (message_id) REFERENCES messages(id)
    )""")
    conn.commit()
    conn.close()

async def fetch_messages(page):
    await page.goto("https://onlyfans.com/my/chats", timeout=60000)
    await page.wait_for_selector(".b-chats__item")

    items = await page.query_selector_all(".b-chats__item")

    messages = []
    for item in items:
        sender = await item.query_selector(".b-chats__item__title")
        preview = await item.query_selector(".b-chats__item__preview")
        time_el = await item.query_selector("time")

        if sender and preview and time_el:
            messages.append({
                "sender": await sender.inner_text(),
                "content": await preview.inner_text(),
                "timestamp": await time_el.get_attribute("datetime")
            "media_url": "https://example.com/sample.jpg",  # Placeholder media detection
            })

    return messages

def save_new_messages(messages):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    saved = []
    for msg in messages:
        cur.execute("SELECT 1 FROM messages WHERE sender=? AND content=?", (msg["sender"], msg["content"]))
        if not cur.fetchone():
            cur.execute("INSERT INTO messages (sender, content, timestamp) VALUES (?, ?, ?, ?)",
                        (msg["sender"], msg["content"], msg["timestamp"]))
            saved.append(msg)
    conn.commit()
    conn.close()
    return saved

def generate_reply(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "system", "content": "You are JordiBot, a friendly content creator assistant."
            }, {
                "role": "user", "content": prompt
            }]
        )
        return response.choices[0].message["content"]
    except Exception as e:
        return f"Error: {e}"

def store_reply(msg_id, reply):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute("INSERT INTO replies (message_id, response, timestamp) VALUES (?, ?, ?)",
                (msg_id, reply, datetime.utcnow().isoformat()))
    cur.execute("UPDATE messages SET replied=1 WHERE id=?", (msg_id,))
    conn.commit()
    conn.close()

async def login_onlyfans(context):
    page = await context.new_page()
    await page.goto("https://onlyfans.com/login", timeout=60000)

    await page.fill("input[name='email']", onlyfans_email)
    await page.fill("input[name='password']", onlyfans_password)
    await page.click("button[type='submit']")
    await page.wait_for_timeout(8000)

    return page

async def run_cycle():
    print(f"[{datetime.now().isoformat()}] Checking OnlyFans inbox...")
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await login_onlyfans(context)
        messages = await fetch_messages(page)
        await browser.close()

        new_msgs = save_new_messages(messages)
        print(f"✅ {len(new_msgs)} new message(s) saved.")

        # Respond to new messages
        conn = sqlite3.connect(DB)
        cur = conn.cursor()
        cur.execute("SELECT id, sender, content FROM messages WHERE replied=0")
        for row in cur.fetchall():
            msg_id, sender, content = row
            print(f"🤖 Replying to {sender}: {content}")
            reply = generate_reply(content)
            store_reply(msg_id, reply)
            print(f"💬 Sent: {reply}")
        conn.close()

async def main_loop():
    init_db()
    while True:
        await run_cycle()
        print(f"⏳ Sleeping {CHECK_INTERVAL} seconds...
")
        time.sleep(CHECK_INTERVAL)

if __name__ == "__main__":
    asyncio.run(main_loop())
