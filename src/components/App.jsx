import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from '../Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({})
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="text" id="name-edit" name="name" placeholder="Имя" minLength="2" maxLength="40" required className="popup__input popup__profile-name"/>
          <span className="name-edit-error popup__error-span"></span>
          <input type="text" id="aboutself-edit" name="about" placeholder="О себе" minLength="2" maxLength="200" required className="popup__input popup__profile-aboutself"/>
          <span className="aboutself-edit-error popup__error-span"></span>
          <button id = "profile-submit" type="submit" className="popup__submit-button">Сохранить</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="url" id="avatar-edit" name="avatar" placeholder="Ссылка на картинку" required className="popup__input popup__profile-avatar"/>
          <span className="avatar-edit-error popup__error-span"></span>
          <button id = "avatar-submit" type="submit" className="popup__submit-button">Сохранить</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="new-place"
        title="Новое Место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="text" id="place-name" name="name" placeholder="Название" minLength="2" maxLength="30" required className="popup__input popup__place-name"/>
          <span className="place-name-error popup__error-span"></span>
          <input type="url" id="place-image-link" name="link" placeholder="Ссылка на картинку" required className="popup__input popup__place-image"/>
          <span className="place-image-link-error popup__error-span"></span>
          <button id = "new-place-submit" type="submit" className="popup__submit-button">Создать</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        onClose={closeAllPopups}
      >
        <button id = "delete-place-submit" type="submit" className="popup__submit-button">Да</button>
      </PopupWithForm>

      <PopupWithImage
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
