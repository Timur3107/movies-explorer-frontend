import './SavedMovies.css';
import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader"

function SavedMovies({ searchText, setIsCheckedForSavedMovies, isCheckedForSavedMovies, isLoading, handleSearch, handleSaveMovie, handleDeleteMovie, userSavedMovie, movies, handleChangeCheckbox }) {

    const сhangeCheckbox = () => {
        setIsCheckedForSavedMovies(!isCheckedForSavedMovies)
        handleChangeCheckbox(!isCheckedForSavedMovies)
    }

    return (
        <section className='savedmovies'>
            <SearchForm handleSearch={handleSearch} handleChangeCheckbox={сhangeCheckbox} isChecked={isCheckedForSavedMovies}></SearchForm>
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