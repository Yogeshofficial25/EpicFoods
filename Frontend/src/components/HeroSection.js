


import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center text-center"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/623a24_ad26f6ba7a474830be3a88b985c86a8e~mv2.png/v1/fill/w_1920,h_757,al_c,q_90,enc_avif,quality_auto/623a24_ad26f6ba7a474830be3a88b985c86a8e~mv2.png)`, // Replace with your image URL
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay for readability
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
        Great food makes good times even better
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white drop-shadow-md">
          Elevate your meals with premium private chefs near you.
        </p>
        <button className="mt-6 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition duration-300">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
  