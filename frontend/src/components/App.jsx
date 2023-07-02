import '../index.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx'
import AddPlacePopup from './AddPlacePopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import { CurrentUserContext } from '../contexsts/CurrentUserContext.jsx';
import api from "../utils/Api.js";
import React from 'react';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import * as auth from '../auth.js';
import { Link, useNavigate } from 'react-router-dom';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isCardViewPopupOpen, setCardViewPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [isSuccess, setSuccess] = React.useState(false);
    const [isFail, setFail] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Error ${err}`)
            });
    }, []);

    React.useEffect(() => {
        function handleUserInfo() {
            api.getUserInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => {
                    console.log(`Error ${err}`);
                });
        }
        handleUserInfo();
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    };

    function handleCardClick(evt) {
        setCardViewPopupOpen(true);
        setSelectedCard(evt);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setCardViewPopupOpen(false);
        setSelectedCard({name: '', link: ''});
        setSuccess(false);
        setFail(false);
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
    
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => {
                    state.map((c) => c._id === card._id ? newCard : c)
                    return state;
                });
            })
            .then(() => {
                api.getCards()
                        .then((data) => {
                            setCards(data);
                        })
                        .catch((err) => {
                            console.log(`Error ${err}`)
                        });
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleCardDelete(thisCard) {
        api.deleteCard(thisCard._id)
            .then(() => {
                setCards((cards) => cards.filter(card => card._id !== thisCard._id));
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleUpdateUser({me, job}) {
        api.editProfile(me, job)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data.avatar)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.createCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            });
    };

    function handleRegister(email, password) {
        console.log(isSuccess);
        auth.register(email, password)
            .then((res) => {
                if (res === undefined) {
                    setFail(true);
                } else {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/signin', {replace: true})
                    }, 3000)
                }
                console.log(isFail);
            })
            .catch((err) => {
                console.log(err);
                return setFail(true);
            })
            .finally(() => {
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            })
    }

    function handleLogin(email, password) {
        auth.login(email, password)
            .then((data) => {
                if (data) {
                    setCurrentUser(data);
                    setUserEmail(data.email);
                    api.getCards()
                        .then((data) => {
                            setCards(data);
                        })
                        .catch((err) => {
                            console.log(`Error ${err}`)
                        });
                    setLoggedIn(true);
                    navigate('/', {replace: true})
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        tokenCheck();
    }, [])
    
    const tokenCheck = () => {
        auth.getContent()
            .then((res) => {
                setLoggedIn(true);
                navigate('/', {replace: true});
                return res
            })
            .then((data) => {
                setUserEmail(data.email)
            })
            .catch((err) => {
                console.log(err)
            })
    };

    function handleLogOut() {
        auth.logout()
            .then((res) => {
                console.log(res);
                setLoggedIn(false);
                navigate('/signin', {replace: true})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className="content">
                    <Header loggedIn={isLoggedIn} userEmail={userEmail} onLogOut={handleLogOut} />
                    <Routes>
                        <Route 
                            path="/"
                            element={<ProtectedRouteElement
                                element={Main}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    cards={cards}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    loggedIn={isLoggedIn}
                                />}
                        />
                        <Route path="/signin" element={< Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={< Register onRegister={handleRegister} onSuccess={isSuccess} onFail={isFail} onPopupClose={closeAllPopups} />} />
                    </Routes>
                    <Footer/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewPlace={handleAddPlaceSubmit} />
                    <ImagePopup
                        onClose={closeAllPopups}
                        card={selectedCard}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>    
    );
}

export default App;
