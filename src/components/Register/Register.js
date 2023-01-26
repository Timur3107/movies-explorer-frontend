import React, { useState } from "react";
import Form from "../Form/Form";

function Register({ setErrorApi, errorApi, handleRegister }) {
    const [data, setData] = useState({ name: "", email: "", password: "" })
    const [errors, setErrors] = useState({ name: null, email: null, password: null })
    const [isValid, setIsValid] = useState(false)

    // function checkInputsValidation() {
    //     const keys = Object.values(errors);

    //     for (let i = 0; i < keys.length; i++) {
    //         if (keys[i] === "") {
    //             setIsValid(false)
    //         } else {
    //             setIsValid(true)
    //             break
    //         }
    //     }
    // }

    function handleChange(e) {
        const { name, value } = e.target
        setErrors({ ...errors, [e.target.name]: e.target.validationMessage })
        setIsValid(e.target.closest("form").checkValidity())
        
        if (isValid) {
            setErrorApi('')
        }
        // if (e.target.validationMessage) {
        //     setIsValid(true)
        // } else {
        //     checkInputsValidation()
        // }

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
        <Form errorApi={errorApi} isValid={isValid} welcome="Добро пожаловать!" nameButton="Зарегистрироваться" question="Уже зарегистрированы?" nameSwitch="Войти" pathSwitch="/signin" handleAuthorization={handleSubmit}>
            <label className='form__label'>Имя</label>
            <input type="text" className='form__input' name="name" onChange={handleChange} required minLength="2" maxLength="30"></input>
            <span className='form__input-error'>{errors.name}</span>

            <label className='form__label'>E-mail</label>
            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className='form__input' name="email" onChange={handleChange} required></input>
            <span className='form__input-error'>{errors.email}</span>

            <label className='form__label'>Пароль</label>
            <input type="password" className='form__input' name="password" onChange={handleChange} required></input>
            <span className='form__input-error'>{errors.password}</span>
        </Form>
    );
}

export default Register;