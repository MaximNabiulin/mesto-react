import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// подключаем объект контекста
import { CurrentUserContext } from '../context/CurrentUserContext';
// импортируем компоненты приложения
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function App() {
  // Стейт переменные открытия попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // Стэйт переменныя для данных пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // Стэйт переменные для карточек
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState({});

  // Стейт переменная для индикаторов загрузки запросов на сервер
  const [isLoading, setIsLoading] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfoFromApi(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCardBtnClick(card) {
    setCardToDelete(card);
    setIsDeleteCardPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  };

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api.editUserInfo(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api.editUserAvatar(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const action = isLiked
      ? api.removeLike(card._id)
      : api.setlike(card._id);

    action
      .then(newCard => {
        setCards((state) =>
          state.map((item) => item._id === card._id ? newCard : item)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleDeleteCard(card) {
      api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Возвращаем разметку
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            {/* <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
            >
            </ProtectedRoute> */}
              <Header>
                <p className="header__user-email">email@mail.com</p>
                <p className="header__auth">Выйти</p>
              </Header>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                cards={cards}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardBtnClick}
              />
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onLoad={isLoading}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onLoad={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onLoad={isLoading}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          card={cardToDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;