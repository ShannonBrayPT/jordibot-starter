from fastapi import APIRouter
from . import chatbot, media, schedule, analytics

router = APIRouter()
router.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])
router.include_router(media.router, prefix="/media", tags=["Media"])
router.include_router(schedule.router, prefix="/schedule", tags=["Schedule"])
router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
