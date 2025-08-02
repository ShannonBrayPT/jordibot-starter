from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.endpoints.routes import router  # ✅ Corrected import

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
