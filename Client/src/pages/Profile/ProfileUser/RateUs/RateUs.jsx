import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  testimonialById,
  createTestimonial,
  updateTestimonial,
} from "../../../../Redux/actions/testimonial/actions";
import styles from "./RateUs.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RateUs = () => {
  const userData = useSelector((state) => state.userDetail);
  const testimonialData = useSelector((state) => state.testimonialData);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userData.id) {
      dispatch(testimonialById(userData.id));
    }
  }, [userData.id, dispatch]);

  const handleCreateTestimonial = () => {
    const newTestimonial = {
      message: message,
      date: new Date().toLocaleDateString(),
      rating: rating,
      userId: userData.id,
    };

    dispatch(createTestimonial(newTestimonial));
    setIsEditing(false);
  };

  const handleUpdateTestimonial = () => {
    const updatedTestimonial = {
      message: message,
      date: testimonialData.date, 
      rating: rating,
      userId: userData.id,
    };

    dispatch(updateTestimonial(userData.id, updatedTestimonial));
    setIsEditing(false);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.rateUs}>
      {testimonialData ? (
        <div>
          <h2>Your Testimonial</h2>
          <div className={styles.rating}>
            <p>Rating: {testimonialData.rating} stars</p>
            <p>Message: {testimonialData.message}</p>
            {isEditing ? (
              <div>
                <div className={styles.starsContainer}>
                  {stars.map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {star <= (hoverRating || rating) ? (
                        <StarIcon />
                      ) : (
                        <StarOutlineIcon />
                      )}
                    </span>
                  ))}
                </div>
                <textarea
                  className={styles.textarea}
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className={styles.button} onClick={handleUpdateTestimonial}>
                  Update
                </button>
              </div>
            ) : (
              <button className={styles.button} onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Leave Your Testimonial</h2>
          <div className={styles.starsContainer}>
            {stars.map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {star <= (hoverRating || rating) ? <StarIcon /> : <StarOutlineIcon />}
              </span>
            ))}
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.button} onClick={handleCreateTestimonial}>
            Send
          </button>
        </div>
      )}
    </div>
  );
  
};

export default RateUs;
