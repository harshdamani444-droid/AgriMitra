# import pandas as pd
# import numpy as np
# import pickle
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report

# # Load dataset
# df = pd.read_csv("Crop_recommendation.csv")

# # Define features and target
# X = df.drop('label', axis=1)  # Features: N, P, K, temperature, humidity, ph, rainfall
# y = df['label']  # Target: crop label

# # Split dataset
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Initialize and train the model
# rf_model = RandomForestClassifier(
#     n_estimators=100,
#     random_state=42,
#     max_depth=10,
#     min_samples_split=5
# )
# rf_model.fit(X_train, y_train)

# # Evaluate model
# y_pred = rf_model.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)
# print(f"Model Accuracy: {accuracy * 100:.2f}%")
# print("\nClassification Report:")
# print(classification_report(y_test, y_pred))

# # Save model
# with open("crop_recommendation_model.pkl", "wb") as f:
#     pickle.dump(rf_model, f)

# print("Model saved as crop_recommendation_model.pkl")







import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("Crop_recommendation.csv")

# Define features and target
feature_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
X = df[feature_columns]  # Explicitly specify feature columns
y = df['label']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    max_depth=10,
    min_samples_split=5
)
rf_model.fit(X_train, y_train)

# Evaluate model
y_pred = rf_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save model
with open("crop_recommendation_model.pkl", "wb") as f:
    pickle.dump(rf_model, f)

print("Model saved as crop_recommendation_model.pkl")