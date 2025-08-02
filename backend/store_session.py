from playwright.sync_api import sync_playwright

def store_login_session():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto("https://onlyfans.com/login")

        print("🚨 Please log in manually in the browser window.")
        input("✅ Press Enter here after you are fully logged in...")

        context.storage_state(path="auth.json")
        print("✅ Session saved to auth.json")
        browser.close()

if __name__ == "__main__":
    store_login_session()