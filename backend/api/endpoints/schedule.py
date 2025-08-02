from fastapi import APIRouter

router = APIRouter()

@router.post("/schedule")
async def schedule_post(time: str):
    return {"scheduled_time": time}
