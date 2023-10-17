import React from "react";
import "tailwindcss/tailwind.css";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import GuideBackground from "../../assets/guidebackground.jpg";
import butterfly from "../../assets/butterfly-icegif-2.gif";

const containerStyle = {
  position: "relative",
  backgroundImage: `url(${GuideBackground})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "70vh",
  display: "flex",
  justifyContent: "flex-start",
  color: "#fff",
};

const leftColumnStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  margin: "120px 10% 0",
  width: "50%",
};

const textShadow = {
  textShadow: "2px 2px 4px rgba(183, 189, 160, 0.5)",
};

const butterflyButton = {
  position: "absolute",
  top: "63%",
  right: "80%",
  width: "75px",
};

const BannerGuide = () => {
  return (
    <div style={containerStyle} className="w-full">
      <div style={leftColumnStyle}>
        <p
          className="hidden sm:block sm:text-2xl text-2xl text-[#1d252d] font-medium"
          style={textShadow}
        >
          #Be more connected with nature
        </p>
        <h1 className="sm:text-8xl text-5xl font-semibold" style={textShadow}>
          Welcome to Our Plant Care Guides
        </h1>
        <p className="mt-4 text-[16px] text-[#fafafa] block" style={textShadow}>
          Here, you'll find answers to all your plant care questions and
          discover how to nurture your garden with confidence. Our mission is to
          connect you with the beauty of nature and provide you with expert
          guidance. Explore our catalog and embark on your green journey.
        </p>
        <Link to="/shop">
          <button className="mt-16 bg-green-500 text-white font-semibold py-4 px-8 rounded hover:bg-green-600 font-poppins flex mx-auto">
            {`Visit our Shop `}
            <CiLocationArrow1 className="ml-4 text-4xl sm:text-4xl" />
          </button>
        </Link>
      </div>
      <img src={butterfly} alt="Butterfly" style={butterflyButton} />
    </div>
  );
};

export default BannerGuide;
