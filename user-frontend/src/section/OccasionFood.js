
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";

const IMAGE_BASE_URL = "https://munch-mates.onrender.com/uploads/"; // Update with your actual image base URL

const occasions = [
  "Corporate Events",
  "Weddings & Engagements",
  "Birthday Celebrations",
  "Festivals",
  "Housewarming Parties",
  "Baby Showers",
  "Weekend & Private Parties",
];

const OccasionFood = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(occasions[0]);
  const [occasionFoods, setOccasionFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch occasion foods from the backend API
  const fetchOccasionFoods = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://munch-mates.onrender.com/api/occasion-cards/getByCategory/${category}`
      );
      setOccasionFoods(response.data); // Assuming the response contains an array of foods
    } catch (err) {
      setError("Failed to load foods. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch food items whenever selected occasion changes
    fetchOccasionFoods(selectedOccasion);
  }, [selectedOccasion]);

  return (
    <div className="min-h-[80vh] p-6 sm:p-12 bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-yellow-400 text-sm uppercase tracking-widest font-semibold">
          Select an Occasion
        </h2>
        <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 text-gray-900 leading-tight drop-shadow-md">
          Curate Your Perfect Celebration Menu!
        </h1>
      </div>

      {/* Occasion Slider */}
      <div className="mt-10 px-4">
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4">
            {occasions.map((occasion, index) => (
              <Button
                key={index}
                variant="pill"
                selected={selectedOccasion === occasion}
                className={`flex-shrink-0 snap-center text-sm sm:text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  selectedOccasion === occasion
                    ? "bg-yellow-500 text-black font-semibold"
                    : "bg-white text-gray-800 border border-gray-200 hover:bg-yellow-100 hover:shadow-xl"
                }`}
                onClick={() => setSelectedOccasion(occasion)}
              >
                {occasion}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Display Food Options */}
      <div className="mt-12 px-4 animate-fadeIn">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-8 drop-shadow-sm">
          {selectedOccasion} Specialties
        </h3>

        {/* Loading state */}
        {loading && <p className="text-center text-lg text-gray-600">Loading...</p>}

        {/* Error state */}
        {error && <p className="text-center text-lg text-red-600">{error}</p>}

        {/* Display fetched food items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {occasionFoods.map((card, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Image with fallback */}
                <img
                  src={
                    card.image_url
                      ? `${IMAGE_BASE_URL}${card.image_url}`  // Prepend base URL if image_url is relative
                      : "https://via.placeholder.com/100"    // Fallback image
                  }
                  alt={card.title || "Food Item"}  // Use card.title as alt text if available
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  {/* Title of the card */}
                  <h4 className="text-lg font-semibold text-gray-900">
                    {card.title || "No Title Available"}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OccasionFood;
