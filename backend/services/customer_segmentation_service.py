import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models",
    "customer_segment"
)


# -----------------------------
# LOAD MODELS
# -----------------------------

model = joblib.load(
    os.path.join(
        MODEL_DIR,
        "kmeans_customer_segmentation.pkl"
    )
)

scaler = joblib.load(
    os.path.join(
        MODEL_DIR,
        "customer_segmentation_scaler.pkl"
    )
)

feature_columns = joblib.load(
    os.path.join(
        MODEL_DIR,
        "customer_segmentation_features.pkl"
    )
)


# -----------------------------
# PREDICTION
# -----------------------------

def predict_customer_segment(booking):

    # EXACT model features
    data = {
        "adults": float(booking.get("adults", 0)),
        "children": float(booking.get("children", 0)),
        "babies": float(booking.get("babies", 0)),

        "weekend_nights": float(
            booking.get("weekend_nights", 0)
        ),

        "week_nights": float(
            booking.get("week_nights", 0)
        ),

        "car_parking_space": float(
            booking.get("car_parking_space", 0)
        ),

        "special_requests": float(
            booking.get("special_requests", 0)
        ),

        "lead_time": float(
            booking.get("lead_time", 0)
        ),

        "total_nights": float(
            booking.get("total_nights", 0)
        ),

        "total_guests": float(
            booking.get("total_guests", 0)
        ),
    }

    # Create DataFrame
    df = pd.DataFrame(
        [data],
        columns=feature_columns
    )

    # Scale
    X_scaled = scaler.transform(df)

    # Predict cluster
    prediction = model.predict(X_scaled)

    cluster = int(prediction[0])

    return {
        "customer_segment": cluster
    }