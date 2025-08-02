from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# If "routes.py" is in the same directory as main.py, use:
from backend.api.routes import router

# If "routes.py" is in a subdirectory/package (e.g., backend/routes.py), use:
# from .routes import router

# If you installed "routes" as a package, use:
# from routes import router


app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
