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

    for column, encoder in label_encoders.items():

        if column not in df.columns:
            continue

        value = str(df[column].iloc[0])

        if value not in encoder.classes_:
            value = encoder.classes_[0]

        df[column] = encoder.transform([value])

    df = df[FEATURE_COLUMNS]

    prediction = int(model.predict(df)[0])

    probability = float(
        model.predict_proba(df)[0][1]
    )

    return {
        "prediction": prediction,
        "cancellation_probability": probability
    }