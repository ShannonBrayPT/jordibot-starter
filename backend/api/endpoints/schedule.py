from fastapi import APIRouter

router = APIRouter()

@router.post("/task")
async def schedule_task(task_name: str):
    return {"message": f"Task '{task_name}' scheduled."}
