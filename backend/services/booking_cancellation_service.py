import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models",
    "booking_cancellation"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "booking_cancellation_model.pkl"
)

ENCODER_PATH = os.path.join(
    MODEL_DIR,
    "booking_cancellation_label_encoders.pkl"
)

model = joblib.load(MODEL_PATH)
label_encoders = joblib.load(ENCODER_PATH)

FEATURE_COLUMNS = [
    "adults",
    "children",
    "weekend_nights",
    "week_nights",
    "meal",
    "car_parking_space",
    "room_type_reserved",
    "lead_time",
    "market_segment",
    "repeated_guest",
    "previous_cancellations",
    "previous_bookings_not_canceled",
    "special_requests",
    "babies",
    "distribution_channel",
    "arrival_year",
    "arrival_month",
    "arrival_week_number",
    "assigned_room_type"
]


def predict_cancellation(data):
    df = pd.DataFrame([data])

    # Provide safe defaults for any missing features
    defaults = {
        "adults": 2,
        "children": 0,
        "weekend_nights": 1,
        "week_nights": 2,
        "meal": "BB",
        "car_parking_space": 0,
        "room_type_reserved": "A",
        "lead_time": 14,
        "market_segment": "Online TA",
        "repeated_guest": 0,
        "previous_cancellations": 0,
        "previous_bookings_not_canceled": 0,
        "special_requests": 1,
        "babies": 0,
        "distribution_channel": "TA/TO",
        "arrival_year": 2026,
        "arrival_month": 9,
        "arrival_week_number": 38,
        "assigned_room_type": "A"
    }
    for col, default_val in defaults.items():
        if col not in df.columns:
            df[col] = default_val

    for column, encoder in label_encoders.items():
        if column not in df.columns:
            continue
        value = str(df[column].iloc[0])
        if value not in encoder.classes_:
            value = encoder.classes_[0]
        df[column] = encoder.transform([value])

    df = df[FEATURE_COLUMNS]
    prediction = int(model.predict(df)[0])
    probability = float(model.predict_proba(df)[0][1])

    return {
        "prediction": prediction,
        "cancellation_probability": probability,
        "cancellation_risk": "High" if probability > 0.5 or prediction == 1 else "Low"
    }