import './Portfolio.css';
import React from "react";

function Portfolio() {

    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__projects'>
                <li className='portfolio__project'>
                    <a href='https://timur3107.github.io/how-to-learn/index.html' className='portfolio__link'>
                        Статичный сайт
                        <div className='portfolio__icon' />
                    </a>
                </li>

                <li className='portfolio__project'>
                    <a href='https://timur3107.github.io/russian-travel/index.html' className='portfolio__link'>
                        Адаптивный сайт
                        <div className='portfolio__icon' />
                    </a>
                </li>

                <li className='portfolio__project'>
                    <a href='https://mesto.gin.nomoredomains.club' className='portfolio__link'>
                        Одностраничное приложение
                        <div className='portfolio__icon' />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
