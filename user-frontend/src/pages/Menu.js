

import React, { useEffect, useState } from "react";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const IMAGE_BASE_URL = "https://munch-mates.onrender.com/uploads/";

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("https://munch-mates.onrender.com/api/menu/");
        if (!response.ok) throw new Error("Failed to fetch menu data");
        const data = await response.json();
        setMenuData(data);

        const initialQuantities = {};
        data.forEach((item) => {
          initialQuantities[item.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-purple-50 py-12 px-4">
      <div className="text-center pt-8">
        <h2 className="text-fuchsia-600 text-xs uppercase tracking-widest font-medium">
          Explore Our Offerings
        </h2>
        <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-pink-700">
          Our Menu
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl mx-auto">
          Discover a variety of culinary delights crafted with care and precision.
        </p>
      </div>

      {loading ? (
        <div className="text-center mt-8 text-base text-gray-600">Loading...</div>
      ) : (
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center px-4">
          {menuData.map((item) => (
            <div
              key={item.id}
              className="w-72 bg-white rounded-lg shadow-md hover:shadow-pink-300 transition-transform transform hover:scale-105 duration-300 border border-rose-200 flex flex-col"
            >
              <img
                src={item.image ? `${IMAGE_BASE_URL}${item.image}` : "https://via.placeholder.com/300"}
                alt={item.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-3 flex flex-col flex-grow">
                <div>
                  <h2 className="text-lg font-semibold text-pink-700 truncate">{item.title}</h2>
                  <p className="text-gray-500 mt-1 text-xs leading-snug line-clamp-2">{item.description}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-6 h-6 text-base font-bold bg-rose-100 text-pink-700 rounded-full hover:bg-rose-200 transition"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{quantities[item.id] || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-6 h-6 text-base font-bold bg-rose-100 text-pink-700 rounded-full hover:bg-rose-200 transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-pink-700 font-bold text-sm">
                    ₹{item.price}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-fuchsia-700 font-semibold text-sm">
                    Total: ₹{item.price * (quantities[item.id] || 1)}
                  </p>
                </div>

                <div className="mt-4">
                  <button className="text-sm bg-fuchsia-500 text-white px-3 py-1 rounded hover:bg-fuchsia-600 transition">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
