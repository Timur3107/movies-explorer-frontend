import React, { useState, useEffect } from "react";
import "./BurgerMenu.css"
import { Link } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg"
import { useLocation } from 'react-router-dom';

function BurgerMenu({ isBurgerMenuOpen, onClose }) {
    const location = useLocation();
    const [toggleState, setToggleState] = useState(location.pathname)

    useEffect(() => {
        setToggleState(location.pathname)
    }, [location.pathname])

    return (
        <div className={`burgermenu ${isBurgerMenuOpen ? "burgermenu_active" : ""}`}>
            <div className={`burgermenu__navigation ${isBurgerMenuOpen ? "burgermenu__navigation_active" : ""}`}>

                <nav className="burgermenu__link-list">
                    <button className="burgermenu__close-bth" type="button" onClick={onClose}></button>
                    <ul className="burgermenu__links">
                        <li><Link to="/" className={`navigation-link ${toggleState === "/" ? "navigation-link_active" : ""}`}>Главная</Link></li>
                        <li><Link to="/movies" className={`navigation-link ${toggleState === "/movies" ? "navigation-link_active" : ""}`}>Фильмы</Link></li>
                        <li><Link to="/saved-movies" className={`navigation-link ${toggleState === "/saved-movies" ? "navigation-link_active" : ""}`}>Сохранённые фильмы</Link></li>
                    </ul>
                </nav>

                <Link to="/profile" className="navigation-profile">
                    <img src={profileIcon} alt="иконка профиля" />
                    <p className="navigation-profile__text">Аккаунт</p>
                </Link>
            </div>
        </div>
    )
}

export default BurgerMenu