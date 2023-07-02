import logo from '../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function Header(props) {

    return (
        <header className="header">
              <img className="header__logo" src={logo} alt="логотип Место"/>
              <div className='header__container'>
                <Routes>
                    <Route path="/" element={
                        <div className='header__container'>
                            <p className='header__username'>{props.userEmail}</p>
                            <Link className='header__link' to={'/signin'} onClick={props.onLogOut}>Выйти</Link>
                        </div>
                    } />   
                    <Route path="/signin" element={<Link className='header__link' to='/signup'>Регистрация</Link>} />
                    <Route path="/signup" element={<Link className='header__link' to='/signin'>Войти</Link>} />
                </Routes>
              </div>  
        </header>
    )
}

export default Header;