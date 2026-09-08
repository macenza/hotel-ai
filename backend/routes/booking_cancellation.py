from fastapi import APIRouter
from services.booking_cancellation_service import predict_cancellation

router = APIRouter(
    prefix="/api/booking-cancellation",
    tags=["Booking Cancellation"]
)


@router.post("/predict")
def predict(data: dict):
    return predict_cancellation(data)