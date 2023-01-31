import './Profile.css';
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { currentUserContext } from "../../context/currentUserContext";
import Preloader from '../Preloader/Preloader';

function Profile({ errorApi, setErrorApi, isLoading, handleUpdateUser, handleLogOut }) {
    const currentUser = useContext(currentUserContext)
    const [data, setData] = useState({ name: "", email: "" })
    const [errors, setErrors] = useState({ name: "", email: "" })
    const [isValid, setIsValid] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setErrors({ ...errors, [e.target.name]: e.target.validationMessage })

        if (isValid) {
            setErrorApi('')
        }

        if (value === currentUser.data.name || value === currentUser.data.email) {
            setIsValid(false)
        } else {
            setIsValid(e.target.closest("form").checkValidity())
        }

        setData({
            ...data,
            [name]: value
        })

    }

    function handleSubmit(e) {
        e.preventDefault()
        data.name === "" && (data.name = currentUser.data.name)
        data.email === "" && (data.email = currentUser.data.email)
        handleUpdateUser(data)
        setIsValid(false)
    }

    return (
        isLoading ? (
            <Preloader></Preloader>
        ) : (
            <div className='profile'>
                <h2 className='profile__title'>{`Привет, ${currentUser.data.name}!`}</h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                    <ul className='profile__element-list'>
                        <li className='profile__element'>
                            <p className='profile__type'>Имя</p>
                            <input className='profile__input' type="text" defaultValue={currentUser.data.name} name='name' onChange={handleChange} minLength="2" maxLength="30"></input>
                        </li>
                        <span className='profile__input-error'>{errors.name}</span>
                        <li className='profile__element'>
                            <p className='profile__type'>E-mail</p>
                            <input className='profile__input' type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" defaultValue={currentUser.data.email} name='email' onChange={handleChange}></input>
                        </li>
                        <span className='profile__input-error'>{errors.email}</span>
                    </ul>
                    <div className='profile__container-submit'>
                        <span className='profile__input-error-api'>{errorApi}</span>
                        <button className={`profile__submit ${isValid && !errorApi ? 'profile__submit_active' : ""}`} type='submit' disabled={!isValid || errorApi}>Редактировать</button>
                    </div>
                </form>
                <Link to="/" className='profile__logout' onClick={handleLogOut}>Выйти из аккаунта</Link>
            </div>)
    );
}

export default Profile;