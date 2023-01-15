import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg"
import "./Logo.css"

function Logo() {
    return (
        <Link to="/">
            <img className="logo" src={headerLogo} alt="Логотип"/>
        </Link>
    )
}

export default Logo