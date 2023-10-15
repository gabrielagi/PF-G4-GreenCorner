import React, { useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom
import Comment from "./Comment";
import opinions from "./mock.json";

const Testimonial = () => {
  const [visibleOpinions, setVisibleOpinions] = useState(3);

  const handleShowMore = () => {
    setVisibleOpinions(opinions.length);
  };

  return (
    <div className="font-poppins py-40">
      <div className="text-center py-10">
        <h5 className="text-[#1d252d]">Testimonials</h5>
        <h1 className="text-4xl mx-auto leading-normal font-bold">
          Read what others have to say
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {opinions.slice(0, visibleOpinions).map((opinion, index) => (
          <div key={index} className="py-5 mb-10">
            <Comment opinion={opinion} />
          </div>
        ))}
      </div>
      {visibleOpinions < opinions.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="text-blue-500 hover:underline"
          >
            Ver más
          </button>
        </div>
      )}
      {visibleOpinions === opinions.length && (
        <div className="text-center mt-4">
          <Link to="/testimoniales" className="text-blue-500 hover:underline">
            Ver todos los testimonios
          </Link>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
