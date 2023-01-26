import React, { useState } from "react";
import Form from "../Form/Form";

function Login({ setErrorApi, handleLogin, errorApi }) {
    const [data, setData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ email: null, password: null })
    const [isValid, setIsValid] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target

        if (isValid) {
            setErrorApi('')
        }

        setErrors({ ...errors, [e.target.name]: e.target.validationMessage })
        setIsValid(e.target.closest("form").checkValidity())

        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(data)
    }
    return (
        <Form errorApi={errorApi} welcome="Рады видеть!" nameButton="Войти" question="Ещё не зарегистрированы?" nameSwitch="Регистрация" pathSwitch="/signup" handleAuthorization={handleSubmit} isValid={isValid}>
            <label className='form__label'>E-mail</label>
            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className='form__input' name="email" onChange={handleChange} required></input>
            <span className='form__input-error'>{errors.email}</span>

            <label className='form__label'>Пароль</label>
            <input type="password" className='form__input' name="password" onChange={handleChange} required></input>
            <span className='form__input-error'>{errors.password}</span>
        </Form>
    );
}

export default Login;