import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import BannerHome from "../components/Banner/Banner.home";
import InformationHome from "../components/Banner/Information.home";


const Home = () => {
  // Inicializo a AOS al momento del montaje del componente
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  return (
    <div>
      <section
        className="bg-[#f6f6f6] min-h-[85vh]" // Ajusta la altura mínima aquí
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <BannerHome />
        
        <h1 className="text-4xl font-bold">Sección 1</h1>
        <p>Contenido de la sección 1</p>        
      </section>

      <section
        className="bg-white min-h-screen"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <InformationHome />
        <h1 className="text-4xl font-bold">Sección 2</h1>
        <p>Contenido de la sección 2</p>
      </section>

      <section
        className="bg-yellow-200 min-h-screen"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-4xl font-bold">Sección 3</h1>
        <p>Contenido de la sección 3</p>
      </section>
    </div>
    
  );
};

export default Home;
