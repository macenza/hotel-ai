from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.sentiment_service import predict_sentiment

import mysql.connector
import os
from pathlib import Path
from dotenv import load_dotenv


# ---------------------------------------------------------
# Load backend/.env
# review.py -> routes -> backend -> .env
# ---------------------------------------------------------
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(ENV_PATH)


router = APIRouter(
    prefix="/api/review",
    tags=["Hotel Review"]
)


class ReviewRequest(BaseModel):
    review: str
    rating: int


def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "localhost"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        database=os.getenv("MYSQL_DATABASE", "hotel_website")
    )


@router.post("/analyze")
def analyze_review(data: ReviewRequest):

    if not data.review.strip():
        raise HTTPException(
            status_code=400,
            detail="Review cannot be empty."
        )

    if data.rating < 1 or data.rating > 5:
        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5."
        )

    review_text = data.review.strip()

    # AI sentiment prediction
    sentiment = predict_sentiment(review_text)

    # Save review to MySQL
    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            INSERT INTO reviews
            (review_text, sentiment)
            VALUES (%s, %s)
        """

        cursor.execute(
            query,
            (review_text, sentiment)
        )

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:

        print("Database error:", e)

        raise HTTPException(
            status_code=500,
            detail="Review was analyzed but could not be saved to database."
        )

    return {
        "review": review_text,
        "rating": data.rating,
        "sentiment": sentiment
    }