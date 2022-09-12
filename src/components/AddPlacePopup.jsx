import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onLoad, onAddPlace } = props;

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleCardNameChange(e) {
    setName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link
    })
    .then(() => {
      onClose();
      setName('');
      setLink('');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <PopupWithForm
          name="new-place"
          title="Новое Место"
          buttonText={onLoad ? "Сохранить..." : "Создать" }
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <>
            <input
              type="text"
              id="place-name"
              name="name"
              value={name}
              onChange={handleCardNameChange}
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
              className="popup__input popup__place-name"
            />
            <span className="place-name-error popup__error-span"></span>
            <input
              type="url"
              id="place-image-link"
              name="link"
              value={link}
              onChange={handleCardLinkChange}
              placeholder="Ссылка на картинку"
              required
              className="popup__input popup__place-image"
            />
            <span className="place-image-link-error popup__error-span"></span>
          </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;