import os
import pickle
import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "hotel_review",
    "hotel_sentiment_bilstm.keras"
)

TOKENIZER_PATH = os.path.join(
    BASE_DIR,
    "models",
    "hotel_review",
    "tokenizer_hotel_review.pkl"
)

LABEL_ENCODER_PATH = os.path.join(
    BASE_DIR,
    "models",
    "hotel_review",
    "label_encoder_hotel_review.pkl"
)


# Load model
model = load_model(MODEL_PATH)


# Load tokenizer
with open(TOKENIZER_PATH, "rb") as file:
    tokenizer = pickle.load(file)


# Load label encoder
with open(LABEL_ENCODER_PATH, "rb") as file:
    label_encoder = pickle.load(file)


def predict_sentiment(review: str):

    # Convert review into sequence
    sequence = tokenizer.texts_to_sequences([review])

    # Padding
    padded_sequence = pad_sequences(
        sequence,
        maxlen=200,
        padding="post",
        truncating="post"
    )

    # Model prediction
    prediction = model.predict(
        padded_sequence,
        verbose=0
    )

    # Get predicted class
    predicted_index = int(
        np.argmax(prediction, axis=1)[0]
    )

    # Convert class to sentiment label
    sentiment = label_encoder.inverse_transform(
        [predicted_index]
    )[0]

    # Make sentiment lowercase
    sentiment = str(sentiment).strip().lower()

    return sentiment