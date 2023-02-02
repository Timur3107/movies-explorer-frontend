import './MoviesCardList.css';
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, handleSaveMovie, handleDeleteMovie, isSavedMovies, userSavedMovie }) {

    return (
        <div className='moviescardlist'>
            <ul className='moviescardlist-cover'>
                {isSavedMovies ?
                    (
                        movies.map((item) => (
                            <MoviesCard handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} key={item.movieId} movie={item} isSavedMovies={isSavedMovies}></MoviesCard>
                        ))

                    ) :
                    (
                        movies.map((item) => (
                            <MoviesCard isLiked={userSavedMovie.find(savedMovie => savedMovie.movieId === item.id)} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} key={item.id} movie={item} isSavedMovies={isSavedMovies}></MoviesCard>
                        ))
                    )
                }
            </ul>
        </div>
    );
}

export default MoviesCardList;
