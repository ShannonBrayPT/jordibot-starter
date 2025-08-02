
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_upload():
    return {"message": "This is the upload endpoint"}
