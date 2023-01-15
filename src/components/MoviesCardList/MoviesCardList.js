import './MoviesCardList.css';
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, handleSaveMovie,handleDeleteMovie, isSavedMovies}) {

    return (
        <div className='moviescardlist'>
            <ul className='moviescardlist-cover'>
                {/* временное решение */}
                {
                    [...Array(12)].map(() => (
                        movies.map((item) => (
                            <MoviesCard handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} key={item.id} movie={item} isSavedMovies={isSavedMovies}></MoviesCard>
                        ))
                    ))

                }
            </ul>
        </div>
    );
}

export default MoviesCardList;
