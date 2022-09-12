import React from 'react';

function ImagePopup(props) {
  const { card, onClose} = props;

  return (
    <div
      className={ `popup popup_type_image-view ${Object.keys(card).length !== 0 && 'popup_opened'}` }
    >
        <figure className="popup__image-container">
          <button
            id = "view-close"
            type="button"
            className="popup__close-button"
            onClick={onClose}
          >
          </button>
          <img src={card.link} alt={card.name} className="popup__image"/>
          <figcaption className="popup__image-caption"></figcaption>
        </figure>
      </div>
  )
}

export default ImagePopup;