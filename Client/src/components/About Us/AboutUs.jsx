import React, { useEffect } from "react";
import "../About Us/AboutUs.css";
import Aos from "aos";
import "aos/dist/aos.css";
import  plantsAbout  from "../../img/plantsAbout.jpg";

const AboutUs = () => {

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  return (
    <div>
        <header>
            <strong>About Us</strong>
        </header>
        <div className="div1">
        <section className="bg-green-200" style={{ height: '400px' }} data-aos="fade-left"  data-aos-duration="1000" >
          <img src={plantsAbout} alt="" />
       <h2>We believe that a world full of plants is a better world</h2>
       <p>We want to become your favorite place for everything related to the world of plants: 
        from different types of plants, designer pots and accessories, to advice and personalized care programs.</p>
       <strong>Our mission is to help you find your perfect plant to transform your environments into stylish spaces, full of life and warmth.💚</strong>
        </section>
        </div>
    </div>
  );
};
export default AboutUs;
