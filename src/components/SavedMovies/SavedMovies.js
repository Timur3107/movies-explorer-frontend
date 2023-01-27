import './SavedMovies.css';
import React, { useState } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader"

function SavedMovies({ isLoading, handleSearch, handleSaveMovie, handleDeleteMovie, userSavedMovie, movies, handleChangeCheckbox }) {
    const searchText = JSON.parse(localStorage.getItem('filteringRequestForSavedMovies'))
    const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem('isCheckedForSavedMovies')) || false)

    const сhangeCheckbox = () => {
        setIsChecked(!isChecked)
        handleChangeCheckbox(!isChecked)
    }

    return (
        <section className='savedmovies'>
            <SearchForm handleSearch={handleSearch} handleChangeCheckbox={сhangeCheckbox} isChecked={isChecked} searchText={searchText}></SearchForm>
            {isLoading ? (
                <Preloader />
            ) : (
                searchText &&
                    movies.length === 0 ?
                    (
                        <p className='movies__not-found'>Ничего не найдено</p>
                    ) :
                    (
                        <MoviesCardList handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} movies={movies} userSavedMovie={userSavedMovie} isSavedMovies={true}></MoviesCardList>
                    )

            )
            }
        </section>
    );
}

export default SavedMovies;