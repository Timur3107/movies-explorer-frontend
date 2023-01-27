import React, { useState } from "react";
import './SearchForm.css';
import loupe from "../../images/loupe.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearch, handleChangeCheckbox, isChecked, searchText }) {
    const [film, setFilm] = useState()
    const [errors, setErrors] = useState({ search: null })
    const [isValid, setIsValid] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        handleSearch(film, isChecked)
    }

    function handleChange(e) {
        setFilm(e.target.value)
        setErrors({ ...errors, [e.target.name]: e.target.validationMessage })
        setIsValid(e.target.closest("form").checkValidity())
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit} >
                <div className="search__loupe"><img alt="лупа" src={loupe} /></div>
                <input className="search__input" placeholder="Фильм" type="text" onChange={handleChange} name="search" required defaultValue={searchText}></input>
                <button className={`search__submit ${!isValid ? "search__submit_inactive" : ""}`} disabled={!isValid} type="submit"><img alt="лупа" src={loupe} /></button>
            </form>
            <span className="search__input-error">{errors.search}</span>
            <FilterCheckbox isChecked={isChecked} handleChangeCheckbox={handleChangeCheckbox}></FilterCheckbox>
        </div>
    )
}

export default SearchForm