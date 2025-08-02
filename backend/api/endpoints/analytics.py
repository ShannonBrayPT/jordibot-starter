from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def example():
    return {"message": "This is the analytics endpoint"}
