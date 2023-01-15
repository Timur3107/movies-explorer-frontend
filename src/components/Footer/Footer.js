import './Footer.css';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function Footer() {
    const [footerClass, setFooterClass] = useState("")
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (location.pathname) {
            case "/":
            case "/movies":
            case "/saved-movies":
                setFooterClass("")
                break
            case "/profile":
            case "/signup":
            case "/signin":
                setFooterClass("footer_hidden")
                break
            default:
                setFooterClass("footer_hidden")
                break
        }
    }, [location.pathname])

    return (
        <footer className={`footer ${footerClass}`}>
            <h5 className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</h5>
            <div className='footer__info'>
                <p className='footer__copyright'>&copy; 2022</p>
                <div className='footer__links'>
                    <a href='https://practicum.yandex.ru' className='footer__link'>Яндекс.Практикум</a>
                    <a href='https://github.com/Timur3107/movies-explorer-frontend' className='footer__link'>Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
