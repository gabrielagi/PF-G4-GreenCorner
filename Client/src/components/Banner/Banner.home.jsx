import React from "react";
import bannerPlantHome from "../../assets/planta-banner-home.png";

const BannerHome = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center relative">
      <img
        src={bannerPlantHome}
        alt="Imagen de fondo"
        className="absolute inset-y-0 right-0 w-1/4 h-auto"
      />

      <div class="flex items-center">
        <div class="w-1/2 pl-10">
          <h1 class="text-6xl font-bold text-green-700 font-poppins">
            Your Green Oasis
          </h1>
          <p class="text-2xl text-gray-600 font-poppins mt-4">
            Welcome to your green oasis! Explore our wide range of plants, from
            lush indoor beauties to vibrant outdoor companions. We also offer a
            variety of gardening essentials and accessories. Let's make your
            world greener together.
          </p>
        </div>
        <div class="w-1/2">
          <button class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-2 font-poppins">
            Shop Now
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-poppins">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
