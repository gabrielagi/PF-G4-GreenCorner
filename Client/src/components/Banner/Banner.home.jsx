import React from "react";
import bannerPlantHome from "../../assets/planta-banner-home.png";
import "tailwindcss/tailwind.css";

const BannerHome = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1480px] m-auto grid md:grid-cols-2">
        <div className="sm:py-60 py-20 font-poppins sm:ml-40 ml-10">
          <p className="sm:text-4xl text-2xl text-[#1d252d] font-medium hidden sm:block">
            #Be more connected with nature
          </p>
          <h1 className="sm:text-9xl text-4xl font-semibold">
            Welcome to GreenCorner
          </h1>
          <p className="mt-4 sm:text-2xl text-[#9a9a9a]">
            We offer plant care guidance and strive to enhance lives through the
            beauty of nature. Explore our catalog and welcome to our green
            sanctuary.
          </p>
          <button className="mt-16 bg-green-500 text-white font-semibold py-4 px-8 rounded hover:bg-green-600 font-poppins">
            Visit our Shop
          </button>
        </div>
        <img
          src={bannerPlantHome}
          alt="Imagen de fondo"
          className="bg-contain bg-center h-[150px] sm:h-auto hidden md:block"
        />
      </div>
    </div>
  );
};

export default BannerHome;
