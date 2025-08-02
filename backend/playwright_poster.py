import os
import time
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()

EMAIL = os.getenv("ONLYFANS_EMAIL")
PASSWORD = os.getenv("ONLYFANS_PASSWORD")
MEDIA_FILE_PATH = "media/jordi_today.png"
CAPTION = "Hey fans 💋 Here's something special for you today!"
HEADLESS = os.getenv("ONLYFANS_HEADLESS", "True") == "True"

def login_if_needed(page):
    page.goto("https://onlyfans.com/")
    if "login" in page.url:
        print("Logging in...")
        page.fill("input[name='email']", EMAIL)
        page.fill("input[name='password']", PASSWORD)
        page.click("button[type='submit']")
        page.wait_for_url("**/my/**", timeout=15000)
        print("Login successful")

def create_post(page):
    print("Creating post...")
    page.goto("https://onlyfans.com/my/posts")
    page.click("button:has-text('New Post')")
    page.set_input_files("input[type='file']", MEDIA_FILE_PATH)
    page.fill("textarea[placeholder='Write something...']", CAPTION)
    time.sleep(3)
    page.click("button:has-text('Post')")
    print("Post published!")

def run_bot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS)
        context = browser.new_context(storage_state="auth.json")
        page = context.new_page()
        try:
            login_if_needed(page)
            create_post(page)
        finally:
            context.storage_state(path="auth.json")
            browser.close()

if __name__ == "__main__":
    run_bot()