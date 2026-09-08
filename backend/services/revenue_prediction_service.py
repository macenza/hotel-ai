import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models",
    "hotel_revenue"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "revenue_prediction_model.pkl"
)


model = joblib.load(MODEL_PATH)

print("✅ Revenue Prediction Model Loaded")


FEATURE_COLUMNS = [
    "adults",
    "children",
    "weekend_nights",
    "week_nights",
    "car_parking_space",
    "lead_time",
    "repeated_guest",
    "special_requests",
    "babies",
    "arrival_year",
    "arrival_month",
    "arrival_week_number",
    "total_guests",
    "total_nights"
]


def predict_revenue(booking):

    data = {
        "adults": float(booking.get("adults", 0)),
        "children": float(booking.get("children", 0)),
        "weekend_nights": float(
            booking.get("weekend_nights", 0)
        ),
        "week_nights": float(
            booking.get("week_nights", 0)
        ),
        "car_parking_space": float(
            booking.get("car_parking_space", 0)
        ),
        "lead_time": float(
            booking.get("lead_time", 0)
        ),
        "repeated_guest": float(
            booking.get("repeated_guest", 0)
        ),
        "special_requests": float(
            booking.get("special_requests", 0)
        ),
        "babies": float(
            booking.get("babies", 0)
        ),
        "arrival_year": float(
            booking.get("arrival_year", 0)
        ),
        "arrival_month": float(
            booking.get("arrival_month", 0)
        ),
        "arrival_week_number": float(
            booking.get("arrival_week_number", 0)
        ),
        "total_guests": float(
            booking.get("total_guests", 0)
        ),
        "total_nights": float(
            booking.get("total_nights", 0)
        )
    }

    df = pd.DataFrame(
        [data],
        columns=FEATURE_COLUMNS
    )

    prediction = model.predict(df)

    predicted_revenue = float(prediction[0])

    return {
        "predicted_revenue": predicted_revenue
    }