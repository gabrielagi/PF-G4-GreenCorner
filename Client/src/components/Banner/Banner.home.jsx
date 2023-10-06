import React from "react";
import bannerPlantHome from "../../assets/planta-banner-home.png";
import "tailwindcss/tailwind.css";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const BannerHome = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1480px] m-auto grid md:grid-cols-2 md:text-left text-center">
        <div className="sm:py-[180px] py-20 font-poppins sm:ml-40 ml-10 md:ml-20 mr-10">
          <p className="sm:text-2xl text-2xl text-[#1d252d] font-medium hidden sm:block">
            #Be more connected with nature
          </p>
          <h1 className="sm:text-8xl text-4xl font-semibold">
            Welcome to GreenCorner
          </h1>
          <p className="mt-4 text-[18px] text-[#9a9a9a]">
            We offer plant care guidance and strive to enhance lives through the
            beauty of nature. Explore our catalog and welcome to our green
            sanctuary.
          </p>
          <Link to="/shop">
            <button className="mt-16 bg-green-500 text-white font-semibold py-4 px-8 rounded hover:bg-green-600 font-poppins flex mx-auto">
              {`Visit our Shop `}
              <CiLocationArrow1 className="ml-2 text-2xl sm:text-4xl" />
            </button>
          </Link>
        </div>
        <img
          src={bannerPlantHome}
          alt="Imagen de fondo"
          className="bg-contain bg-center h-[180px] sm:h-auto hidden md:block xl:ml-[80px]"
        />
      </div>
    </div>
  );
};

export default BannerHome;
