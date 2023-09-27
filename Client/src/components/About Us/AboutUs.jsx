import { useEffect } from "react";
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
       <br />
        <header>
            <h1>About Us</h1>
        </header>
        <br />
        <div className="div1">
        <section className="bg-green-200" style={{ height: '400px' }} data-aos="fade-left"  data-aos-duration="1000" >
          <img src={plantsAbout} alt="" className="sm:flex"/>
       <strong className="titleSectionOne"> We believe that a world full of plants is a better world</strong>
       <p>We want to become your favorite place for everything related to the world of plants: 
        from different types of plants, designer pots and accessories, to advice and personalized care programs.</p>
       <strong className="strongSectionOne">Our mission is to help you find your perfect plant to transform your environments
        into stylish spaces, full of life and warmth.💚</strong>
        </section>
        </div>
          <br />
        <div>
          <h1>Our commitment plant by plant</h1>
        </div>
    </div>
  );
};
export default AboutUs;
