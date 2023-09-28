import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import BannerHome from "../components/Banner/Banner.home";
import InformationHome from "../components/Banner/Information.home";
import ImagesBanner from "../components/Banner/imageshover.home";

const Home = () => {
  // Inicializo AOS al momento del montaje del componente
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  return (
    <div>
      <section
        className="bg-[#f6f6f6] min-h-[40vh]"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <BannerHome />
      </section>

      <section className="bg-white" data-aos="fade-up" data-aos-duration="1000">
        <InformationHome />
      </section>

      <section
        className="min-h-screen"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <ImagesBanner />
      </section>
    </div>
  );
};

export default Home;
