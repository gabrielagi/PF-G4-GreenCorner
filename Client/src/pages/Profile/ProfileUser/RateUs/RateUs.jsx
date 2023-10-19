import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  testimonialById,
  createTestimonial,
  updateTestimonial,
} from "../../../../Redux/actions/testimonial/actions";
import styles from "./RateUs.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const RateUs = () => {
  const userData = useSelector((state) => state.userDetail);
  const testimonialData = useSelector((state) => state.testimonialData);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData.id) {
      dispatch(testimonialById(userData.id));
    }
  }, [userData.id, dispatch]);

  useEffect(() => {
    if (testimonialData.message) {
      setMessage(testimonialData.message);
      setRating(testimonialData.rating);
    }
  }, [testimonialData.message, testimonialData.rating]);

  const stars = [1, 2, 3, 4, 5];

  const validateForm = () => {
    if (rating === 0) {
      setError("Please select a rating.");
      return false;
    }
    if (message.length > 256) {
      setError("Message should not exceed 256 characters.");
      return false;
    }
    return true;
  };

  const handleCreateTestimonial = () => {
    if (validateForm()) {
      const newTestimonial = {
        message: message,
        date: new Date().toLocaleDateString(),
        rating: rating,
        userId: userData.id,
      };
      dispatch(createTestimonial(newTestimonial));
      setIsEditing(false);
      setError(null);
    }
  };

  const handleUpdateTestimonial = () => {
    if (validateForm()) {
      const updatedTestimonial = {
        message: message,
        date: testimonialData.date,
        rating: rating,
        userId: userData.id,
      };
      dispatch(updateTestimonial(userData.id, updatedTestimonial));
      setIsEditing(false);
      setError(null);
    }
  };

  return (
    <div className={styles.centeredContainer}>
    <div className={styles.rateUs}>
      {testimonialData.id ? (
        <div className={styles.containerUs}>
          <h2 className={styles.heading}>Your Testimonial</h2>
          <div className={styles.rating}>
            <h3>Rating:</h3>
            {isEditing ? (
              <div className={styles.starsContainer}>
                {stars.map((star) => (
                  <span
                    key={star}
                    className={styles.star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {star <= (hoverRating || rating) ? (
                      <AiFillStar className={styles.starIcon} />
                    ) : (
                      <AiOutlineStar className={styles.starIcon} />
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <div className={styles.starsContainer}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={styles.star}
                  >
                    {i < testimonialData.rating ? (
                      <AiFillStar className={styles.starIcon} />
                    ) : (
                      <AiOutlineStar className={styles.starIcon} />
                    )}
                  </span>
                ))}
              </div>
            )}

            <h3>Message:</h3>
            {isEditing ? (
              <div className={styles.centeredContainer}>
                <textarea
                  className={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            ) : (
              <div className={styles.centeredContainer}>
                <textarea
                  disabled
                  className={styles.textarea2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            )}
            {error && <p className={styles.error}>{error}</p>}

            {isEditing ? (
              <button className={styles.button} onClick={handleUpdateTestimonial}>
                Save
              </button>
            ) : (
              <button className={styles.button} onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className={styles.heading}>Leave Your Testimonial</h2>
          <div className={styles.starsContainer}>
            {stars.map((star) => (
              <span
                key={star}
                className={styles.star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {star <= (hoverRating || rating) ? (
                  <AiFillStar className={styles.starIcon} />
                ) : (
                  <AiOutlineStar className={styles.starIcon} />
                )}
              </span>
            ))}
          </div>
          <div className={styles.centeredContainer}>
            <textarea
              className={styles.textarea}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.rightCornerContainer}>
            <button className={styles.button} onClick={handleCreateTestimonial}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default RateUs;
