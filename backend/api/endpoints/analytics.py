from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
async def get_analytics():
    return {"views": 123, "likes": 45}
