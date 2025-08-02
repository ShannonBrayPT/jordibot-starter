from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def handle_chat(input_text: str):
    return {"response": f"Echoing back: {input_text}"}
