import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { testimonialById, getTestimonial} from "../../Redux/actions/testimonial/actions";
import {getAllUsers} from "../../Redux/actions/user/user-actions";
// import opinions from "./mock.json";



const Testimonial = () => {
  const [visibleOpinions, setVisibleOpinions] = useState(3);

  const handleShowMore = () => {
    setVisibleOpinions(opinions.length);
  };

  const userDetail = useSelector((state) => state.userDetail);
  const opinions = useSelector((state) => state.allTestimonial);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  
 const findUser = (id) => {
    return allUsers.find((user) => user.id === id);
  }

  useEffect(() => {
    dispatch(getTestimonial());
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(opinions)

  return (
    <div className="font-poppins py-40">
      <div className="text-center py-10">
        <h5 className="text-[#1d252d]">Testimonials</h5>
        <h1 className="text-4xl mx-auto leading-normal font-bold">
          Read what others have to say
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {opinions.map((opinion, index) => {
          const user = findUser(opinion.UserId);
          console.log(user)
          return (
            <div key={index} className="py-5 mb-10">
              <Comment
                opinion={opinion}
                user={user} 
              />
            </div>
          );
        })}
      </div>
      {visibleOpinions < opinions.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="text-blue-500 hover:underline"
          >
            Show more
          </button>
        </div>
      )}
      {visibleOpinions === opinions.length && (
        <div className="text-center mt-4">
          <Link to="/testimoniales" className="text-blue-500 hover:underline">
            View all Testimonial
          </Link>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
