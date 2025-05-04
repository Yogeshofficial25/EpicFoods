

import React, { useState, useEffect } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "https://munch-mates.onrender.com/uploads/"; // Use your deployed image base URL here

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

  const fetchOccasionFoods = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://munch-mates.onrender.com/api/occasion-cards/getByCategory/${category}`
      );
      setOccasionFoods(res.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOccasionFoods(selectedOccasion);
  }, [selectedOccasion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-purple-50 pt-20 px-4 py-10 md:px-12 lg:px-20">
      <h2 className="text-yellow-400 text-sm uppercase tracking-widest font-semibold text-center">
          Select an Occasion
         </h2>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-fuchsia-700 mb-8 font-fancy tracking-wide">
      Curate Your Perfect Celebration Menu!
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {occasions.map((occasion, index) => (
          <button
            key={index}
            onClick={() => setSelectedOccasion(occasion)}
            className={`px-6 py-2 text-sm rounded-full font-medium border transition ${
              selectedOccasion === occasion
                ? "bg-fuchsia-600 text-white border-fuchsia-700"
                : "bg-white text-fuchsia-700 border-fuchsia-300 hover:bg-fuchsia-100"
            }`}
          >
            {occasion}
          </button>
        ))}
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center text-lg text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {occasionFoods.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 cursor-pointer hover:shadow-pink-300 flex flex-col h-[250px]" // Reduced height
          >
            <img
              src={
                card.image_url
                  ? `${IMAGE_BASE_URL}${card.image_url}`
                  : "https://via.placeholder.com/300x200"
              }
              alt={card.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-md font-semibold text-pink-700 font-fancy mb-2 border-b border-rose-300 inline-block pb-1 hover:text-fuchsia-700 transition">
                  {card.title || "No Title"}
                </h3>
                <p className="text-sm text-gray-700 hover:text-gray-900 transition duration-300 font-medium leading-snug">
                  {card.description || "No description available."}
                </p>
              </div>
              {/* Removed the buttons */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccasionFood;
