import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTestimonial } from "../../Redux/actions/testimonial/actions";
import { getAllUsers } from "../../Redux/actions/user/user-actions";

const AllTestimonial = () => {
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

  return (
    <div className="font-poppins py-30">
      <div className="text-center py-10">
        <h1 className="text-4xl mx-auto leading-normal font-bold">All Testimonials</h1>
      </div>
      <Link to="/" className="text-green-600 hover:underline text-2xl mb-4 block ml-5">
     ← Back to Home
        </Link>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {opinions.map((opinion, index) => {
          const user = findUser(opinion.UserId);
          return (
            <div key={index} className="py-5 mb-10">
              <Comment opinion={opinion} user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTestimonial;
