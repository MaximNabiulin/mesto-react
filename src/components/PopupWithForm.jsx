import React from 'react';

function PopupWithForm(props) {
  const { title, name, buttonText, children, isOpen, onClose} = props;

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
          <h3 className="popup__title">{title}</h3>
          <form
            id={`${name}-form`}
            name={`${name}-form`}
            action="#" method="get"
            noValidate
            className="popup__form"
          >
            {children}
            <button
              id = "profile-submit"
              type="submit"
              className="popup__submit-button"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm;