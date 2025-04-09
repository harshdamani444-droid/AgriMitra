import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np
import pickle

# Load your dataset
df = pd.read_csv("crop_yield.csv")  # Replace with your actual file path

# Preview
print("Initial columns:", df.columns)

# Encode boolean columns (Fertilizer_Used, Irrigation_Used)
df["Fertilizer_Used"] = df["Fertilizer_Used"].astype(int)
df["Irrigation_Used"] = df["Irrigation_Used"].astype(int)

# Label encode categorical features
label_encoders = {}
categorical_cols = ["Soil_Type", "Crop", "Weather_Condition"]

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le  # store encoders if needed later

# Define features and target
X = df.drop("Yield_tons_per_hectare", axis=1)
y = df["Yield_tons_per_hectare"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train Random Forest
model = RandomForestRegressor(n_estimators=40, max_depth=15, min_samples_leaf=5, max_features='sqrt',random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluation
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print(f"RMSE: {rmse:.3f}")
print(f"R² Score: {r2:.3f}")

with open("random_forest_yield_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("encoders.pkl", "wb") as f:
    pickle.dump(label_encoders, f)

print("Model and encoders saved successfully.")