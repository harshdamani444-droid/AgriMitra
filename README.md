# AgriMitra

AgriMitra is a comprehensive platform designed to assist farmers with crop recommendations, fertilizer predictions, and soil fertility analysis. It combines a backend API, a frontend interface, and machine learning models to deliver actionable insights for agricultural practices.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Crop Recommendation**: Suggests the best crops to grow based on soil and environmental conditions.
- **Fertilizer Prediction**: Recommends optimal fertilizers for specific crops and soil types.
- **Soil Fertility Analysis**: Analyzes soil data to determine fertility levels.
- **User-Friendly Interface**: Intuitive frontend for farmers to interact with the platform.
- **Logging and Monitoring**: Backend logs for error tracking and combined logs for system monitoring.

## Project Structure

AgriMitra/
├── backend/
│ ├── .env # Environment variables for backend
│ ├── package.json # Backend dependencies
│ ├── logs/ # Log files
│ ├── public/ # Public assets for backend
│ └── src/ # Backend source code
│ ├── app.js # Main backend application
│ ├── constants.js # Constants used in the backend
│ ├── controllers/ # API controllers
├── frontend/
│ ├── .env # Environment variables for frontend
│ ├── package.json # Frontend dependencies
│ ├── src/ # Frontend source code
│ ├── tailwind.config.js # Tailwind CSS configuration
│ └── vite.config.js # Vite configuration for frontend
├── ml-model/
│ ├── app.py # Entry point for ML models
│ ├── Crop_recommendation_model/
│ ├── Fertilizer_prediction_model/
│ └── Soil_fertility_prediction_model/
├── SRS/
│ ├── Diagrams/ # System Requirement Specification diagrams
└── README.md # Project documentation

## Installation

### Prerequisites

- Node.js and npm (for backend and frontend)
- Python 3.x (for ML models)
- Git

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/AgriMitra.git
   cd AgriMitra
   ```
2. Set up the backend

```sh
   cd backend
   npm install
   cp .env.sample .env
   # Update .env with your configuration
```

3. Set up the frontend

   ```sh
   cd ../frontend
   npm install
   cp .env.sample .env
   # Update .env with your configuration
   ```

4. Set up the ML models:

```sh
cd ../ml-model
pip install -r requirements.txt
```

Usage

1. Start the backend server:

```sh
cd backend
npm start
```

2. Start the frontend development server:

```sh
cd frontend
npm run dev
```

3. Run the ML models:

```sh
cd ml-model
python app.py
```

4. Access the application in your browser at http://localhost:5173 (or the port specified in your frontend configuration).

## Technologies Used

### Backend: Node.js, Express.js

### Frontend: Vite, Tailwind CSS

### Machine Learning: Python, Scikit-learn, Pandas, NumPy

### Database: (Specify your database, e.g., MongoDB, PostgreSQL)

### Other Tools: Logging libraries, Environment configuration
