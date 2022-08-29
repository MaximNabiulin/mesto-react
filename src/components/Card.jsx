import React from 'react';

function Card(props) {
  const { card, onCardClick } = props;

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <div className="place">
      <div className="place__image-frame">
        <img
          src={card.link}
          alt={card.name}
          className="place__image"
          onClick={handleCardClick}
        />
        <button type="button" className="place__delete-button"></button>
      </div>
      <div className="place__caption">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__likes">
          <button type="button" className="place__like-button"></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
