import React, { useState } from "react";
import Form from "../Form/Form";

function Login({ handleLogin }) {
    const [data, setData] = useState({ email: "", password: "" })

    function handleChange(e) {
        const { name, value } = e.target
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
        <Form welcome="Рады видеть!" nameButton="Войти" question="Ещё не зарегистрированы?" nameSwitch="Регистрация" pathSwitch="/signup" handleAuthorization={handleSubmit}>
            <label className='form__label'>E-mail</label>
            <input type="email" className='form__input' name="email" onChange={handleChange}></input>
            <span className='form__input-error'></span>

            <label className='form__label'>Пароль</label>
            <input type="password" className='form__input' name="password" onChange={handleChange}></input>
            <span className='form__input-error'>Что-то пошло не так...</span>
        </Form>
    );
}

export default Login;