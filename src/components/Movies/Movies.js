import './Movies.css';
import React, { useState } from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader"

function Movies({ isLoading, handleSearch, handleSaveMovie, handleDeleteMovie, movies, userSavedMovie, handleLoadMoreMovies, isLoadMoreBthInactive, handleChangeCheckbox }) {
    const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem('isChecked')) || false)
    const searchText = JSON.parse(localStorage.getItem('filteringRequest'))

    const сhangeCheckbox = () => {
        setIsChecked(!isChecked)
        handleChangeCheckbox(!isChecked)
    }

    return (
        <section className='movies'>
            <SearchForm handleSearch={handleSearch} handleChangeCheckbox={сhangeCheckbox} isChecked={isChecked} searchText={searchText}></SearchForm>
            {isLoading ?
                (
                    <Preloader />
                ) : (
                    searchText ?
                        movies.length === 0 ?
                        (
                            <p className='movies__not-found'>Ничего не найдено</p>
                        ) : (
                            <MoviesCardList userSavedMovie={userSavedMovie} handleSaveMovie={handleSaveMovie} movies={movies} isSavedMovies={false} handleDeleteMovie={handleDeleteMovie}></MoviesCardList>
                        ):
                        <p className='movies__not-found'>Пожалуйста, введите поисковой запрос&#128269;</p>
                )
            }
            <button type='button' onClick={handleLoadMoreMovies} className={`movies__more-button ${isLoadMoreBthInactive ? "movies__more-button_inactive" : ""}`} >Ещё</button>
        </section>
    );
}

export default Movies;
