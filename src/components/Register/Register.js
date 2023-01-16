import React, { useState } from "react";
import Form from "../Form/Form";

function Register({ handleRegister }) {
    const [data, setData] = useState({ name: "", email: "", password: "" })

    function handleChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleRegister(data)
    }

    return (
        <Form welcome="Добро пожаловать!" nameButton="Зарегистрироваться" question="Уже зарегистрированы?" nameSwitch="Войти" pathSwitch="/signin" handleAuthorization={handleSubmit}>
            <label className='form__label'>Имя</label>
            <input type="text" className='form__input' name="name" onChange={handleChange}></input>
            <span className='form__input-error'></span>

            <label className='form__label'>E-mail</label>
            <input type="email" className='form__input' name="email" onChange={handleChange}></input>
            <span className='form__input-error'></span>

            <label className='form__label'>Пароль</label>
            <input type="password" className='form__input' name="password" onChange={handleChange}></input>
            <span className='form__input-error'>Что-то пошло не так...</span>
        </Form>
    );
}

export default Register;