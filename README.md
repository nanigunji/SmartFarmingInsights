# 🌾 Smart Farming Insights

An AI-powered smart farming system designed to revolutionize agriculture by providing real-time, data-driven insights for farmers. This project leverages weather conditions, soil types, and advanced ML models to recommend optimal cultivation practices.

---

## 🚀 Overview

🌱 **Smart Farming Insights** combines the power of machine learning, meteorological data, and modern UI/UX to:
- Predict the best crops for current soil and climate conditions
- Provide insights on farming techniques
- Enhance agricultural productivity and sustainability

---

## 🧠 Key Features

- ✅ Soil & weather-based crop recommendations
- 📊 ML-powered predictive models
- 🌤️ Real-time weather integration
- 🖥️ Intuitive React-based dashboard
- ⚙️ REST API using Flask
- 🧪 Pretrained `.pkl` model files for fast setup

---

## 👨‍💻 Tech Stack

| Frontend | Backend | ML/AI | Tools |
|----------|---------|-------|-------|
| React.js | Flask   | Scikit-learn | Git & GitHub |
| Axios    | REST APIs | Pandas, NumPy | VS Code |
| Tailwind CSS | JSON | Pickle files | Postman |

---

## 🗂️ Project Structure

```text
SmartFarmingInsights/
├── backend/                  # Flask API and ML logic
│   └── ...                   # Backend files (app.py, model logic, etc.)
├── src/                      # React frontend source files
│   └── ...                   # Components, pages, styles, etc.
├── stacking_pipeline.pkl     # Pre-trained ML model
├── index.html                # Entry point for frontend (Vite-based)
├── package.json              # Node dependencies
├── package-lock.json         # Dependency lock file
├── vite.config.ts            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # Linting rules
├── .gitignore
└── README.md




## 📌 Future Enhancements

- Add farmer-friendly mobile app interface 
- Integrate with IoT sensors for live soil data 
- Support multiple regional languages
- Use Deep Learning for crop disease prediction 

---

## Setup Instructions

```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install
npm start
