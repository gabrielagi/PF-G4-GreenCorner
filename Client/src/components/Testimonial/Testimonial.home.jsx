import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import OpinionCard from "./Opinion.testimonial";
import opinions from "./mock.json";

const Testimonial = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateCenterSlidePercentage = () => {
    if (windowWidth <= 500) {
      return 100;
    } else if (windowWidth >= 400 && windowWidth <= 1000) {
      return 70;
    } else {
      return 30;
    }
  };

  return (
    <div className="font-poppins text-[#1d252d]  py-40">
      <div className="text-center py-10">
        <h5 className="text-[#1d252d]">Testimonials</h5>
        <h1 className="text-4xl mx-auto leading-normal font-bold">
          Read what others have to say
        </h1>
      </div>
      <div className="wrapper">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          infiniteLoop={false}
          centerMode={true}
          centerSlidePercentage={calculateCenterSlidePercentage()}
        >
          {opinions.map((card, index) => (
            <li key={index} className="carousel-card py-5 mb-10">
              <OpinionCard card={card} />
            </li>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
