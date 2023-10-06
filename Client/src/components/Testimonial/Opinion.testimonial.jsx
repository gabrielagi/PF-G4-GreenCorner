import React from "react";
import "./styles.css";
import rating from "../../assets/rating.png";

const OpinionCard = ({ card }) => {
  return (
    <div className="card swiper-slide ml-10">
      <div className="card__image">
        <img src={card.img} alt="card image" />
      </div>

      <div className="card__content">
        <p className="card__title text-[#1d252d]">{card.title}</p>
        <p className="card__text">{card.text}</p>
      </div>
      <img src={rating} alt="" className="ml-50 mr-50 w-10 h-10" />
    </div>
  );
};

export default OpinionCard;
