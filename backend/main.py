from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router  # <== RELATIVE IMPORT

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
