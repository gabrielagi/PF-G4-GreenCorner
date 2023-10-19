import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import imageBanner1 from "../../assets/imagesbanner1.png";
import imageBanner2 from "../../assets/imagesbanner2.png";
import imageBanner3 from "../../assets/imagesbanner3.png";
import imageBanner4 from "../../assets/imagesbanner4.png";

const ImageBanner1 = () => (
  <div className="group relative hover:bg-green-400 hover:opacity-90 rounded-md overflow-hidden">
    <div className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md">  
    <img
      src={imageBanner1}// Reemplaza con la ruta correcta
      alt="Banner 3"
      className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md"
    />
      <div className="bg-black bg-opacity-50 w-full h-full absolute inset-0"></div>
      <h2 className="text-white text-3xl font-semibold mb-2 z-10 relative text-center">
        Descubre la serenidad de la naturaleza en nuestra colección de plantas exquisitas.
      </h2>
    </div>
  </div>
);

const ImageBanner2 = () => (
  <div className="group relative hover:bg-green-400 hover:opacity-90 rounded-md overflow-hidden">
    <div className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md">
    <img
      src={imageBanner2  }// Reemplaza con la ruta correcta
      alt="Banner 3"
      className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md"
    />
      <div className="bg-black bg-opacity-50 w-full h-full absolute inset-0"></div>
      <h2 className="text-white text-3xl font-semibold mb-2 z-10 relative text-center">
        Entra en nuestro mundo verde y encuentra la compañía perfecta para tu hogar.
      </h2>
    </div>
  </div>
);


const ImageBanner3 = () => (
    <div className="group relative hover:bg-green-400 hover:opacity-90 rounded-md overflow-hidden">
      <img
        src={imageBanner3 } // Reemplaza con la ruta correcta
        alt="Banner 3"
        className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md"
      />
      <div className="bg-black bg-opacity-50 w-full h-full absolute inset-0"></div>
      <h2 className="text-white text-3xl font-semibold mb-2 z-10 relative text-center !important">
        {/* Tu texto para ImageBanner3 */}aaaaaaaaa
      </h2>
    </div>
  );
  
  const ImageBanner4 = () => (
    <div className="group relative hover:bg-green-400 hover:opacity-90 rounded-md overflow-hidden">
      <div className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md">
      <img
      src={imageBanner4}  // Reemplaza con la ruta correcta
      alt="Banner 4"
      className="w-96 h-96 object-cover transition-transform transform scale-100 group-hover:scale-105 rounded-md"
    />
        <div className="bg-black bg-opacity-50 w-full h-full absolute inset-0"></div>
        <h2 className="text-white text-3xl font-semibold mb-2 z-10 relative text-center">
          Entra en nuestro mundo verde y encuentra la compañía perfecta para tu hogar.
        </h2>
      </div>
    </div>
  );
  
  const ImagesBanner = () => {
    return (
      <div className="relative w-full">
        {/* Web */}
        <div className="hidden md:flex justify-center items-center space-x-8">
          <ImageBanner1 />
          <ImageBanner2 />
          <ImageBanner3 />
          <ImageBanner4 />
          {/* Agregas ImageBanner3 e ImageBanner4 aquí */}
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
            <ImageBanner1 />
            <ImageBanner2 />
            <ImageBanner3 />
            <ImageBanner4 />
            {/* Agregas ImageBanner3 e ImageBanner4 aquí */}
          </Carousel>
        </div>
      </div>
    );
  };
  
  export default ImagesBanner;