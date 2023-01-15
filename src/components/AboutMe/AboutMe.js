import './AboutMe.css';
import myAvatar from "../../images/myAvatar.jpg"
import React from "react";

function AboutMe() {

    return (
        <section className='aboutme' id='aboutme'>
            <h2 className='main__title'>Студент</h2>
            <div className='aboutme__info'>
                <div className='aboutme__block-text'>
                    <h3 className='aboutme__name'>Тимур</h3>
                    <p className='aboutme__specialization'>Фронтенд-разработчик, 15 лет</p>
                    <p className='aboutme__description'>
                        Я родился и живу в Уфе, на данный момент учусь в 9-ом классе.
                        Занимаюсь баскетболом, люблю горнолыжный спорт, играть в видеоигры и программировать.
                        В 13 лет я написал свою первую программу на Python, и уже тогда я понял, что программирование мне очень нравится.
                        Решил пройти курс Я.Практикум, чтобы получить нужные знания и навыки.
                        Считаю, что успеха можно добиться в любом возрасте!
                    </p>
                    <a href="https://github.com/Timur3107" className='aboutme__link'>Github</a>
                </div>
                <img src={myAvatar} alt="Фото" className='aboutme__image' />
            </div>
        </section>
    );
}

export default AboutMe;
