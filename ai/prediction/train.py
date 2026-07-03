"""
Train the Flood Prediction Model using XGBoost.
"""

import os
import joblib
import xgboost as xgb

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

from ai.prediction.preprocess import (
    load_data,
    preprocess_data,
    split_data
)

# Where the trained model will be stored
MODEL_PATH = "ai/data/flood_model.joblib"


def train_model():

    print("Loading dataset...")

    df = load_data(
        "datasets/train.csv",
        sample_size=10000      # Change to None for final training
    )

    print(f"Loaded {len(df)} rows")

    X, y = preprocess_data(df)

    X_train, X_test, y_train, y_test = split_data(X, y)

    print("Training XGBoost model...")

    model = xgb.XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=6,
        random_state=42,
        objective="reg:squarederror"
    )

    model.fit(X_train, y_train)

    print("Evaluating model...")

    predictions = model.predict(X_test)

    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    rmse = mse ** 0.5
    r2 = r2_score(y_test, predictions)

    print("\nModel Performance")
    print("-" * 40)
    print(f"MAE  : {mae:.4f}")
    print(f"MSE  : {mse:.4f}")
    print(f"RMSE : {rmse:.4f}")
    print(f"R²   : {r2:.4f}")

    os.makedirs("ai/data", exist_ok=True)

    joblib.dump(model, MODEL_PATH)

    print(f"\nModel saved to {MODEL_PATH}")


if __name__ == "__main__":
    train_model()