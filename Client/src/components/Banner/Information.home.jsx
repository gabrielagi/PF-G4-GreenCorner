import React from "react";
import informationbannermobile1 from "../../assets/informationbannermobile1.png";
import informationbannermobile2 from "../../assets/informationbannermobile1.png";

const InformationHome = () => {
  return (
    <div className="w-full bg-white py-[80px]">
      <div className="max-w-[1480px] m-auto ">
        <h1 className="text-center text-4xl font-bold text-green-600 sm:ml-40 ml-10 md:ml-20 mr-10">
          Flowers and Plants for All: Trust Our 10+ Species
        </h1>
        <p className="text-center text-[#9a9a9a] text-md sm:ml-40 ml-10 md:ml-20 mr-10">
          Explore a Vibrant Variety of Botanical Treasures: Embrace Our Diverse
          Collection of Over 10 Unique Plant Species
        </p>
        <div className="flex flex-col xl:flex-row justify-center">
          <img src={informationbannermobile1} alt="" />
          <img src={informationbannermobile2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default InformationHome;
