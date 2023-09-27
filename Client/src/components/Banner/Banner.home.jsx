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
