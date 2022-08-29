import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const {onEditAvatar, onEditProfile, onAddPlace, onCardClick} = props;
  const [userAvatar, setUserAvatar] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoFromApi(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setUserAvatar(userInfo.avatar);
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={userAvatar} alt={userName} className="profile__avatar"/>
          <button
            id = "avatar-button"
            type="button"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}>
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__name-row">
            <h1 className="profile__name">{userName}</h1>
            <button
              id = "edit-button"
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__about-self">{userDescription}</p>
        </div>
        <button
          id = "add-button"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="places">
        {cards.map((card) =>
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
          />
        )}
      </section>
    </main>
  );
}

export default Main;