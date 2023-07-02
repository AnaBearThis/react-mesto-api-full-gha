import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexsts/CurrentUserContext.jsx";
import React from 'react';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">

              <section className="profile">
                  <div className="profile__avatar" onClick={props.onEditAvatar}>
                      <img className="profile__pic" src={currentUser.avatar} alt="аватарка"/>
                  </div>
                  <div className="profile__info">
                      <div className="profile__first-line"><h1 className="profile__name">{currentUser.name}</h1><button className="profile__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button></div>
                      <p className="profile__description">{currentUser.about}</p>
                  </div>
                  <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
              </section>

              <section className="photos">
                  {
                    props.cards.map(card => (
                        <Card
                            key={card._id}
                            card={card}
                            onClick={props.onCardClick}
                            onLike={props.onCardLike}
                            onDelete={props.onCardDelete}
                        />
                    ))
                  }
              </section>
        </main>
    );
};

export default Main;