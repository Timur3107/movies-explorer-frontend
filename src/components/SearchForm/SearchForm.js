import React, { useState } from "react";
import './SearchForm.css';
import loupe from "../../images/loupe.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({handleSearch}) {
    const [film, setFilm] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        handleSearch(film)
    }

    function handleChange(e) {
        setFilm(e.target.value)
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__loupe"><img  alt="лупа" src={loupe}/></div>
                <input className="search__input" placeholder="Фильм" type="text" onChange={handleChange}></input>
                <button className="search__submit" type="submit"><img  alt="лупа" src={loupe}/></button>
            </form>
            <FilterCheckbox></FilterCheckbox>
        </div>
    )
}

export default SearchForm