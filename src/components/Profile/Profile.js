import './Profile.css';
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Profile({ handleUpdateUser, handleLogOut }) {
    const [data, setData] = useState({ name: "", email: "" })

    function handleChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleUpdateUser(data)
    }

    return (
        <>
            <div className='profile'>
                <h2 className='profile__title'>Привет, Виталий!</h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                    <ul className='profile__element-list'>
                        <li className='profile__element'>
                            <p className='profile__type'>Имя</p>
                            <input className='profile__input' type="text" defaultValue="Виталий" name='name' onChange={handleChange}></input>
                        </li>
                        <li className='profile__element'>
                            <p className='profile__type'>E-mail</p>
                            <input className='profile__input' type="text" defaultValue="pochta@yandex.ru" name='email' onChange={handleChange}></input>
                        </li>
                    </ul>
                    <button className='profile__submit' type='submit'>Редактировать</button>
                </form>
                <Link to="/" className='profile__logout' onClick={handleLogOut}>Выйти из аккаунта</Link>
            </div>
        </>
    );
}

export default Profile;