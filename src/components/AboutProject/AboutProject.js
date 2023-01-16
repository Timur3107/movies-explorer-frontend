import './AboutProject.css';
import React from "react";

function AboutProject() {

    return (
        <section className='aboutproject' id='aboutproject'>
            <h2 className='main__title'>О проекте</h2>
            <ul className='aboutproject__list'>
                <li className='aboutproject__element'>
                    <h3 className='aboutproject__name'>Дипломный проект включал 5 этапов</h3>
                    <p className='aboutproject__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>

                <li className='aboutproject__element'>
                    <h3 className='aboutproject__name'>На выполнение диплома ушло 5 недель</h3>
                    <p className='aboutproject__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>

            <div className='aboutproject__process'>
                <div className='aboutproject__scale'>
                    <p className='aboutproject__week'>1 неделя</p>
                    <p className='aboutproject__development'>Back-end</p>
                </div>

                <div className='aboutproject__scale'>
                    <p className='aboutproject__week aboutproject__week_second'>4 недели</p>
                    <p className='aboutproject__development'>Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
