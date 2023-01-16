import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./Navigation.css"
import profileIcon from "../../images/profile-icon.svg"

function Navigation({ loggedIn, handleBurgerMenuOpen }) {
    const location = useLocation();
    const [toggleState, setToggleState] = useState(location.pathname)

    useEffect(() => {
        setToggleState(location.pathname)
    }, [location.pathname])

    return (
        !loggedIn ? (
            <div className="navigation__authorization">
                <Link to="/signup" className="navigation__registration">Регистрация</Link>
                <Link to="/signin" className="navigation__login">Войти</Link>
            </div>
        ) : (
            <>
                <button type="button" className="navigation__burgermenu-button" onClick={handleBurgerMenuOpen}></button>
                <div className="navigation__navigation-list">
                    <ul className="navigation__link-list">
                        <li><Link to="/movies" className={`navigation-link navigation__films ${toggleState === "/movies" ? "navigation-link_active" : ""}`}>Фильмы</Link></li>
                        <li><Link to="/saved-movies" className={`navigation-link navigation__saved-films ${toggleState === "/saved-movies" ? "navigation-link_active" : ""}`}>Сохранённые фильмы</Link></li>
                    </ul>

                    <Link to="/profile" className="navigation-profile">
                        <img src={profileIcon} alt="иконка профиля" />
                        <p className="navigation-profile__text">Аккаунт</p>
                    </Link>
                </div>
            </>
        )
    )
}

export default Navigation