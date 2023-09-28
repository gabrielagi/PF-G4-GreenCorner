import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";



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
        className="bg-color:#f6f6f6 min-h-screen"
        data-aos="fade-up"
        data-aos-duration="1000"
        >
        <h1 className="text-4xl font-bold">Sección 1</h1>
        <p>Contenido de la sección 1</p>        
      </section>

      <section
        className="bg-green-200 min-h-screen"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
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
