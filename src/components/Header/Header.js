import React, { useEffect, useState } from "react";
import "./Header.css"
import Logo from "../Logo/Logo";
import { useLocation } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, handleBurgerMenuOpen }) {
    const [headerClass, setHeaderClass] = useState("")
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (location.pathname) {
            case "/":
                setHeaderClass("header_place-header")
                break
            case "/profile":
            case "/movies":
            case "/saved-movies":
                setHeaderClass("")
                break
            case "/signup":
            case "/signin":
                setHeaderClass("header_hidden")
                break
            default:
                setHeaderClass("header_hidden")
                break
        }
    }, [location.pathname])

    return (
        <header className={`header ${headerClass}`}>
                <div className="header__cover">
                    <Logo></Logo>
                    <div className="navigation">
                    <Navigation loggedIn={loggedIn} handleBurgerMenuOpen={handleBurgerMenuOpen}></Navigation>
                    </div>
                </div>
        </header>
    )
}

export default Header