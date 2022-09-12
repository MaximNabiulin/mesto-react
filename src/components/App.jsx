import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

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
    return new Promise ((resolve, reject) => {
      setIsLoading(true);
      api.editUserInfo(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        resolve();
      })
      .catch(reject)
      .finally(() => {
        setIsLoading(false);
      });
    });
  };

  function handleUpdateAvatar(currentUser) {
    return new Promise ((resolve, reject) => {
      setIsLoading(true);
      api.editUserAvatar(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        resolve();
      })
      .catch(reject)
      .finally(() => {
        setIsLoading(false);
      });
    });
  };

  function handleAddPlaceSubmit(card) {
    return new Promise ((resolve, reject) => {
      setIsLoading(true);
      api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        resolve();
      })
      .catch(reject)
      .finally(() => {
        setIsLoading(false);
      });
    });
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setlike(card._id)
        .then(newCard => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleDeleteCard(card) {
    return new Promise ((resolve, reject) => {
      api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        resolve();
      })
      .catch(reject);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            cards={cards}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardBtnClick}
          />
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