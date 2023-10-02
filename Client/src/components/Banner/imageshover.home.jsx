import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageBanner1 from "../../assets/imagesbanner1.png";
import imageBanner2 from "../../assets/imagesbanner2.png";
import imageBanner3 from "../../assets/imagesbanner3.png";
import imageBanner4 from "../../assets/imagesbanner4.png";
import "tailwindcss/tailwind.css";

const titles = ["Título 1", "Título 2", "Título 3", "Título 4"];

const ImagesBanner = () => {
  return (
    <div className="relative w-full">
      {/* Web */}
      <div className="hidden md:flex justify-center items-center space-x-8">
        {[imageBanner1, imageBanner2, imageBanner3, imageBanner4].map(
          (image, index) => (
            <div
              key={index}
              className="group relative hover:bg-green-400 hover:opacity-90 rounded-md"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-xl font-semibold mb-2">
                  {titles[index]}
                </h2>
              </div>
            </div>
          )
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          swipeable={true}
          emulateTouch={true}
          dynamicHeight={false}
          centerMode={false}
        >
          {[imageBanner1, imageBanner2, imageBanner3, imageBanner4].map(
            (image, index) => (
              <div
                key={index}
                className="group relative hover:bg-green-400 hover:opacity-90 rounded-md"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-xl font-semibold mb-2">
                    {titles[index]}
                  </h2>
                </div>
              </div>
            )
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ImagesBanner;
