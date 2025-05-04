
import React from "react";
import Button from "../components/Button";

const Services = [
  {
    name: "Private Chefs",
    image:
      "https://static.wixstatic.com/media/7c969b_caa29433157b404bb7992ee8622d2cf8~mv2.webp/v1/fill/w_152,h_164,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/wix%201.webp",
    description: "Gourmet chefs in your own kitchen. Perfect for small gatherings or intimate dinners.",
  },
  {
    name: "Catering Solutions",
    image:
      "https://static.wixstatic.com/media/7c969b_8ab24cfaeffa437fba77bdb25a0ed142~mv2.webp/v1/fill/w_152,h_164,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/wix3.webp",
    description: "Tailored catering for events of all sizes, from weddings to corporate functions.",
  },
  {
    name: "Chef's Table",
    image:
      "https://static.wixstatic.com/media/7c969b_54d05f1e92f8450d9abf24823bc594fe~mv2.webp/v1/fill/w_145,h_164,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7c969b_54d05f1e92f8450d9abf24823bc594fe~mv2.webp",
    description: "An exclusive dining experience with a personal chef, tailored to your tastes.",
  },
  {
    name: "Grazing Tables",
    image:
      "https://static.wixstatic.com/media/7c969b_867f8ef4b4ef4da89c5a20639c1c5e7b~mv2.jpg/v1/fill/w_145,h_158,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/A%20grazing%20table.jpg",
    description: "Our artisanal grazing tables, dessert tables, and charcuterie boards.",
  },
  {
    name: "Event Rentals",
    image:
      "https://static.wixstatic.com/media/7c969b_54d05f1e92f8450d9abf24823bc594fe~mv2.webp/v1/fill/w_145,h_164,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7c969b_54d05f1e92f8450d9abf24823bc594fe~mv2.webp",
    description: "Elevate your event with our premium rentals, from tables to tents.",
  },
];

const Discover = () => {
  return (
    <div className="min-h-[80vh] p-4 sm:p-8 bg-gradient-to-br from-white via-rose-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto text-center px-2">
        <h2 className="text-fuchsia-700 text-sm sm:text-base uppercase tracking-widest font-semibold font-fancy">
          Our Services
        </h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-fuchsia-800 leading-tight drop-shadow-md">
          Savor Every Occasion with US!
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          From grand weddings to cozy house parties, explore our handpicked
          catering options that are stealing the spotlight.
        </p>
      </div>

      {/* Services Section */}
      <div className="mt-8 px-2">
        <div className="flex flex-wrap justify-center gap-4">
          {Services.map((service, index) => (
            <div
              key={index}
              className="w-[90%] sm:w-[45%] lg:w-[22%] bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-28 sm:h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="text-sm font-semibold text-fuchsia-700">
                  {service.name}
                </h4>
                <p className="text-xs text-gray-700 mt-1 line-clamp-3">
                  {service.description}
                </p>
                <Button
                  variant="pill"
                  className="mt-3 px-3 py-1.5 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white text-xs font-medium rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition duration-300 shadow-md"
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
