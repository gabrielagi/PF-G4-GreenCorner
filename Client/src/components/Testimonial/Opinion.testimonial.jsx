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
        <span className="card__title">{card.title}</span>
        <p className="card__text">{card.text}</p>
      </div>
      <img
        src={rating}
        alt=""
        className="ml-20 mr-20 w-12 h-12" // Tamaño más pequeño
      />
    </div>
  );
};

export default OpinionCard;
