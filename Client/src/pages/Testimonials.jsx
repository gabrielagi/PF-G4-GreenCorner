import React from "react";
import Comment from "./Comment";
import opinions from "../components/Testimonial/mock.json";

const Testimonials = () => {
  return (
    <div className="font-poppins py-40">
      <div className="text-center py-10">
        <h5 className="text-[#1d252d]">Testimonials</h5>
        <h1 className="text-4xl mx-auto leading-normal font-bold">
          Read what others have to say
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {opinions.map((opinion, index) => (
          <div key={index} className="py-5 mb-10 ml-3 mr-3">
            <Comment opinion={opinion} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
