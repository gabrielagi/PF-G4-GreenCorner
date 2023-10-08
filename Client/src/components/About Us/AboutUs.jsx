import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import OurTeam from "../OurTeam/OurTeam";
const AboutUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  return (
    <div className="bg-green-100">
    <SectionOne/>
    <section className="my-20">
    <h1 className='text-center my-20 text-4xl font-bold text-[#4b9239] drop-shadow-xl md:text-6xl'>Our happy developers </h1>
   <OurTeam className/>
    </section>
   <SectionTwo/> 
   <hr className="my-10"></hr>
    <SectionThree/>
    </div>
  );
};
export default AboutUs;
