import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
const AboutUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  return (
    <div>
    <SectionOne/>
   {/* <SectionTwo/>
    <SectionThree/>*/}
    </div>
  );
};
export default AboutUs;
