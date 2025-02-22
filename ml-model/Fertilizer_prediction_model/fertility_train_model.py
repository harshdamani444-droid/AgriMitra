# import pandas as pd
# import numpy as np
# import pickle
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import accuracy_score, classification_report

# # Load dataset
# df = pd.read_csv("Fertilizer_Prediction.csv")

# # Preprocess the data
# # Create label encoder object
# le = LabelEncoder()
# # Encode Soil Type and Crop Type
# df['Soil_Type'] = le.fit_transform(df['Soil_Type'])
# soil_type_mapping = dict(zip(le.classes_, le.transform(le.classes_)))

# df['Crop_Type'] = le.fit_transform(df['Crop_Type'])
# crop_type_mapping = dict(zip(le.classes_, le.transform(le.classes_)))


# print("Soil Type Mapping:")
# print(soil_type_mapping)
# print("\nCrop Type Mapping:")
# print(crop_type_mapping)


# # Save the label encoders
# with open('fertilizer_label_encoders.pkl', 'wb') as f:
#     pickle.dump({'soil_type': soil_type_mapping, 'crop_type': crop_type_mapping}, f)

# # Define features and target
# X = df[['Temparature', 'Humidity', 'Moisture', 'Soil_Type', 'Crop_Type', 'Nitrogen', 'Potassium', 'Phosphorous']]
# y = df['Fertilizer']

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
# with open("fertilizer_recommendation_model.pkl", "wb") as f:
#     pickle.dump(rf_model, f)

# print("Model saved as fertilizer_recommendation_model.pkl")
# print("Label encoders saved as fertilizer_label_encoders.pkl")


















import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("Fertilizer_Prediction.csv")

# Preprocess the data
# Create label encoder object
le = LabelEncoder()
# Encode Soil Type and Crop Type
df['Soil Type'] = le.fit_transform(df['Soil Type'])
soil_type_mapping = dict(zip(le.classes_, le.transform(le.classes_)))

df['Crop Type'] = le.fit_transform(df['Crop Type'])
crop_type_mapping = dict(zip(le.classes_, le.transform(le.classes_)))


print("Soil Type Mapping:")
print(soil_type_mapping)
print("\nCrop Type Mapping:")
print(crop_type_mapping)


# Save the label encoders
with open('fertilizer_label_encoders.pkl', 'wb') as f:
    pickle.dump({'soil_type': soil_type_mapping, 'crop_type': crop_type_mapping}, f)

# Define features and target
X = df[['Temparature', 'Humidity', 'Moisture', 'Soil Type', 'Crop Type', 'Nitrogen', 'Potassium', 'Phosphorous']]
y = df['Fertilizer Name']

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
print(f"Model Accuracy: {100 - accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save model
with open("fertilizer_recommendation_model.pkl", "wb") as f:
    pickle.dump(rf_model, f)

print("Model saved as fertilizer_recommendation_model.pkl")
print("Label encoders saved as fertilizer_label_encoders.pkl")
