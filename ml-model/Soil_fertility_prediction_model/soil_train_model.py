import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("Soil_Data.csv")  # Replace with actual dataset path

# Define features and target
X = df.drop(columns=['fertility'])  # Assuming 'Fertility' is the target column
y = df['fertility']

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save model as pickle file
with open("soil_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved as soil_model.pkl")
