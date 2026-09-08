from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.review import router as review_router
from routes.customer_segmentation import (
    router as customer_segmentation_router
)
from routes.revenue_prediction import (
    router as revenue_prediction_router
)
from routes.booking_cancellation import router as booking_cancellation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review_router)

app.include_router(
    customer_segmentation_router
)

app.include_router(
    revenue_prediction_router
)
app.include_router(booking_cancellation_router)

@app.get("/")
def root():
    return {
        "message": "Hotel AI API is running"
    }