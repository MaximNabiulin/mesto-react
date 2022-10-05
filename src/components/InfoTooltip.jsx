import React from 'react';

function InfoTooltip(props) {
  const {title, name, image, isOpen, onClose} = props;

  return (
    <div
      className={isOpen
      ? `popup popup_type_${name} popup_opened`
      : `popup popup_type_${name}` }
    >
      <div className="popup__content">
        <button
          id ={`${name}-close-button`}
          type="button"
          className="popup__close-button"
          onClick={onClose}
        >
        </button>
        <img
          src={image}
          alt={name}
          className="auth__image"
        />
        <h3 className="popup__title popup__title_tooltip">{title}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;