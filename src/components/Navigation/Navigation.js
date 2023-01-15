import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./Navigation.css"
import profileIcon from "../../images/profile-icon.svg"

function Navigation({ loggedIn, handleBurgerMenuOpen }) {
    const screenWidth = window.screen.width
    const location = useLocation();
    const [toggleState, setToggleState] = useState(location.pathname)

    useEffect(()=>{
        setToggleState(location.pathname)
    }, [location.pathname])

    return (
        !loggedIn ? (
            <div className="navigation__authorization">
                <Link to="/signup" className="navigation__registration">Регистрация</Link>
                <Link to="/signin" className="navigation__login">Войти</Link>
            </div>
        ) : screenWidth <= 900 ? (
            <button type="button" className="navigation__burgermenu-button" onClick={handleBurgerMenuOpen}></button>
        ) : (
            <div className="navigation__navigation-list">
                <nav className="navigation__link-list">
                    <li><Link to="/movies" className={`navigation__link navigation__films ${toggleState === "/movies" ? "navigation__link_active" : ""}`}>Фильмы</Link></li>
                    <li><Link to="/saved-movies" className={`navigation__link navigation__saved-films ${toggleState === "/saved-movies" ? "navigation__link_active" : ""}`}>Сохранённые фильмы</Link></li>
                </nav>

                <Link to="/profile" className="navigation__profile">
                    <img src={profileIcon} alt="иконка профиля" />
                    <p className="navigation__profile-text">Аккаунт</p>
                </Link>
            </div>
        )
    )
}

export default Navigation