import './Form.css';
import React from "react";
import Logo from '../Logo/Logo';
import { Link } from "react-router-dom";

function Form({ welcome, children, nameButton, question, nameSwitch, pathSwitch, handleAuthorization }) {

    return (
        <div className='form__container'>
            <Logo></Logo>
            <h3 className='form__welcome'>{welcome}</h3>

            <form className='form' onSubmit={handleAuthorization}>
                <div className='form__inputs-list'>
                    {children}
                </div>
                <button className='form__submit' type='submit'>{nameButton}</button>
            </form>

            <p className='form__question'>{question}<Link className='form__switch' to={pathSwitch}>{nameSwitch}</Link></p>
        </div>
    );
}

export default Form;
