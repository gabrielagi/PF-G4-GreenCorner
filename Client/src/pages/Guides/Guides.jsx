import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "tailwindcss/tailwind.css";
import BannerGuide from "./Banner.guide";
import InformationGuides from "./Information.guides";

const Guides = () => {
  useEffect(() => {
    Aos.init({
      duration: 2200,
      offset: 0,
    });
  }, []);

  return (
    <div>
      <section data-aos="fade-up" data-aos-duration="1000">
        <BannerGuide />
      </section>

      <section className="bg-white" data-aos="fade-up" data-aos-duration="1000">
        <InformationGuides />
      </section>

      <section data-aos="fade-up" data-aos-duration="1000">
        {/* <ImagesBanner /> */}
      </section>
      <section data-aos="fade-up" data-aos-duration="1000">
        {/* <Testimonial /> */}
      </section>
    </div>
  );
};

export default Guides;
