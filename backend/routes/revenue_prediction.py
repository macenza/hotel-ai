from fastapi import APIRouter, HTTPException

from services.revenue_prediction_service import (
    predict_revenue
)


router = APIRouter(
    prefix="/api/revenue-prediction",
    tags=["Revenue Prediction"]
)


# =====================================================
# REVENUE PREDICTION
# =====================================================

@router.post("/predict")
def revenue_prediction(
    booking: dict
):

    try:

        print(
            "========================================"
        )

        print(
            "REVENUE PREDICTION REQUEST:"
        )

        print(
            booking
        )


        # -----------------------------------------
        # Prediction
        # -----------------------------------------

        result = predict_revenue(
            booking
        )


        print(
            "PREDICTED REVENUE:",
            result["predicted_revenue"]
        )


        print(
            "========================================"
        )


        return {
            "success": True,
            "predicted_revenue": result[
                "predicted_revenue"
            ]
        }


    except Exception as e:

        print(
            "❌ Revenue prediction error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )