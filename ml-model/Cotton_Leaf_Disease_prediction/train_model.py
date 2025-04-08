import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Flatten, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint
from glob import glob

# Check GPU availability
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    print("✅ GPU detected. Using GPU:", gpus)
else:
    print("⚠️ No GPU detected. Using CPU.")

# Path to your cotton dataset (4 folders inside it)
train_path = './cotton'  # Adjusted for local directory

# Set image size and batch size
IMAGE_SIZE = [128, 128]
BATCH_SIZE = 32

# Count number of classes
folders = glob(os.path.join(train_path, '*'))
num_classes = len(folders)
print(f"📂 Number of classes: {num_classes}")

# Load MobileNetV2 base model
base_model = MobileNetV2(input_shape=IMAGE_SIZE + [3], weights='imagenet', include_top=False)

# Freeze base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom classification head
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
output = Dense(num_classes, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=output)

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

# Data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # 20% for validation
)

# Training & validation sets
train_set = train_datagen.flow_from_directory(
    train_path,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_set = train_datagen.flow_from_directory(
    train_path,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Save model checkpoint
checkpoint = ModelCheckpoint("cotton_model.h5", monitor='val_accuracy', save_best_only=True, verbose=1)

# Train the model
history = model.fit(
    train_set,
    validation_data=val_set,
    epochs=10,
    callbacks=[checkpoint]
)

# Save final model (if not using checkpoint)
model.save("cotton_model_final.h5")
print("✅ Model saved as cotton_model_final.h5")

# Plot training & validation accuracy and loss
plt.figure(figsize=(12, 5))

# Accuracy Plot
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy', marker='o')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy', marker='o')
plt.title('Accuracy vs Epochs')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)

# Loss Plot
plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss', marker='o')
plt.plot(history.history['val_loss'], label='Validation Loss', marker='o')
plt.title('Loss vs Epochs')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)

# Show the plots
plt.tight_layout()
plt.savefig("training_plots.png")  # Optional: Save as image
plt.show()
