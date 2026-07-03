"""
Preprocessing utilities for the Flood Prediction model.

Responsibilities:
1. Load the dataset
2. Drop unnecessary columns
3. Split features (X) and target (y)
4. Create train/test datasets
"""

import pandas as pd
from sklearn.model_selection import train_test_split


def load_data(filepath: str, sample_size: int = 10000):
    """
    Load the dataset.

    Parameters
    ----------
    filepath : str
        Path to train.csv

    sample_size : int
        Number of rows to load while developing.
        Use None to load the full dataset.

    Returns
    -------
    pandas.DataFrame
    """

    if sample_size:
        df = pd.read_csv(filepath, nrows=sample_size)
    else:
        df = pd.read_csv(filepath)

    return df


def preprocess_data(df: pd.DataFrame):
    """
    Prepare the dataset for machine learning.

    Returns
    -------
    X : Features

    y : Target variable
    """

    # Remove ID column
    if "id" in df.columns:
        df = df.drop(columns=["id"])

    # Target column
    y = df["FloodProbability"]

    # Everything except target becomes features
    X = df.drop(columns=["FloodProbability"])

    return X, y


def split_data(X, y, test_size=0.2):
    """
    Split into training and testing datasets.
    """

    return train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=42
    )


if __name__ == "__main__":

    df = load_data("datasets/train.csv")

    X, y = preprocess_data(df)

    X_train, X_test, y_train, y_test = split_data(X, y)

    print("Dataset loaded successfully!")

    print(f"Training samples : {len(X_train)}")
    print(f"Testing samples  : {len(X_test)}")

    print("\nFeatures:")

    print(X.columns.tolist())