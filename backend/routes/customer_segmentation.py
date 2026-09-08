from fastapi import APIRouter, HTTPException

from services.customer_segmentation_service import (
    predict_customer_segment
)


router = APIRouter(
    prefix="/api/customer-segmentation",
    tags=["Customer Segmentation"]
)


@router.post("/predict")
def predict(booking: dict):

    try:

        result = predict_customer_segment(
            booking
        )

        return {
            "success": True,
            "customer_segment": result["customer_segment"]
        }

    except Exception as e:

        print(
            "Customer segmentation error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )