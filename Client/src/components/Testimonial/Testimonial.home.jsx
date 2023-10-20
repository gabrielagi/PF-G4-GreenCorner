import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTestimonial } from "../../Redux/actions/testimonial/actions";
import { getAllUsers } from "../../Redux/actions/user/user-actions";
import Aos from "aos";


const Testimonial = () => {
  const [visibleOpinions, setVisibleOpinions] = useState(6); 
  const userDetail = useSelector((state) => state.userDetail);
  const opinions = useSelector((state) => state.allTestimonial);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const findUser = (id) => {
    return allUsers.find((user) => user.id === id);
  }

  useEffect(() => {
    Aos.init({
      duration: 2200,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    dispatch(getTestimonial());
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(opinions);

  return (
    <div className="font-poppins py-40 " data-aos="fade-up" data-aos-duration="1000">
      <div className="text-center py-10">
        <h5 className="text-[#1d252d]">Testimonials</h5>
        <h1 className="text-4xl mx-auto leading-normal font-bold">
          Read what others have to say
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {opinions.slice(0, visibleOpinions).map((opinion, index) => {
          const user = findUser(opinion.UserId);
          return (
            <div key={index} className="py-5 mb-10">
              <Comment opinion={opinion} user={user} />
            </div>
          );
        })}
      </div>
      {visibleOpinions < 9 ? (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleOpinions((prev) => prev + 3)} 
            className="text-green-700 hover:underline"
          >
            Show more
          </button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <Link to="/testimonials" className="text-green-700 hover:underline">
            View all Testimonials
          </Link>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
