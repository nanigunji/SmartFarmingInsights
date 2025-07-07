import React, { useState, useEffect } from "react";
import { Plane as Plant, Thermometer, Droplets, FlaskRound as Flask, Leaf, Sun, Cloud, Sprout } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";




interface FormData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

const farmImages = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
];

function App() {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 25,
    humidity: 50,
    ph: 7,
    rainfall: 100
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recommendedCrop, setRecommendedCrop] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % farmImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setRecommendedCrop(data.recommended_crop);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch recommendation.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section with Image Carousel */}
      <div
        className="h-96 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url("${farmImages[currentImageIndex]}")` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sprout className="h-16 w-16 text-green-400" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Smart Farming Assistant</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto px-4">
              Get expert crop recommendations based on your soil conditions and environmental factors.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Soil Nutrients (NPK) */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Plant className="text-green-600" />
                  Soil Nutrients (NPK)
                </h2>
                {["nitrogen", "phosphorus", "potassium"].map((name, index) => (
                  <div key={index} className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 capitalize">{name}</label>
                    <input
                      type="number"
                      name={name}
                      value={formData[name as keyof FormData]}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      min="0"
                      max="140"
                      step="1"
                    />
                  </div>
                ))}
              </div>

              {/* Environmental Factors */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Thermometer className="text-green-600" />
                  Environmental Factors
                </h2>
                {["temperature", "humidity", "ph", "rainfall"].map((name, index) => (
                  <div key={index} className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 capitalize">{name}</label>
                    <input
                      type="number"
                      name={name}
                      value={formData[name as keyof FormData]}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      min="0"
                      max={name === "ph" ? "14" : "100"}
                      step="1"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
              >
                Get Recommendation
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="dialog-overlay" onClick={() => setIsModalOpen(false)}>
          <div 
            className="dialog-container dialog-content"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-green-700 mb-2">Recommended Crop</h2>
            <p className="text-gray-600 mb-4">
              Based on your input, we suggest growing:
            </p>
            <p className="text-3xl font-bold text-green-600 mb-6">{recommendedCrop}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

