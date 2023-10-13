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
    <div className="bg-white-100">
      <h1 className='bg-[url("https://i.pinimg.com/originals/eb/26/4b/eb264b97203cc481d8f1f26fe1539eda.jpg")] bg-cover bg-center  text-center  md:text-start md:pl-[300px] align-middle py-20  my-10 text-4xl font-bold text-[#183012] drop-shadow-xl md:text-7xl'>MEET OUR HAPPY DEVS</h1>
   <OurTeam />
   

    <div className='bg-white bg-cover bg-no-repeat my-20'>
          <SectionOne/>
    </div>

    
   <SectionTwo/> 
   
    <SectionThree/>
    </div>
  );
};
export default AboutUs;
