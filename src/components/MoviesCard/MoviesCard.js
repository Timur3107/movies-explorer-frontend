import './MoviesCard.css';
import React, { useState } from "react";

function MoviesCard({ handleSaveMovie, handleDeleteMovie, movie, isSavedMovies }) {
    const { nameRU, duration, image, trailerLink } = movie
    const [isLiked, setIsLiked] = useState(false)

    function handleSaveMovieClick() {
        handleSaveMovie(movie)
        setIsLiked(!isLiked)
    }

    function handleDeleteMovieClick() {
        handleDeleteMovie(movie)
    }

    return (
        <li className='moviescard'>
            <div className='moviescard__info'>
                <div className='moviescard__text-container'>
                    <h3 className='moviescard__name'>{nameRU}</h3>
                    <p className='moviescard__duration'>{duration}</p>
                </div>
                {isSavedMovies ?
                    <button type='button' className="moviescard__save moviescard__save_inactive" onClick={handleDeleteMovieClick} />
                    :
                    <button type='button' className={`moviescard__save ${isLiked && "moviescard__save_active"}`} onClick={handleSaveMovieClick} />
                }

            </div>
            <a className='moviescard__image-link' href={trailerLink} target="_blank" rel="noreferrer">
                <img className='moviescard__image' src={`https://api.nomoreparties.co/${image.url}`} alt='изображение к фильму'></img>
            </a>
        </li>
    );
}

export default MoviesCard;
