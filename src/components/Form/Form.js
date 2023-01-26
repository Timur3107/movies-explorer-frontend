import './Form.css';
import React from "react";
import Logo from '../Logo/Logo';
import { Link } from "react-router-dom";

function Form({ welcome, children, nameButton, question, nameSwitch, pathSwitch, handleAuthorization, isValid, errorApi }) {

    return (
        <div className='form'>
            <Logo></Logo>
            <h3 className='form__welcome'>{welcome}</h3>

            <form className='form__container' onSubmit={handleAuthorization}>
                <div className='form__inputs-list'>
                    {children}
                </div>
                <div className='form__container-submit'>
                    <span className='form__input-error-api'>{errorApi}</span>
                    <button className={`form__submit ${!isValid || errorApi ? "form__submit_inactive" : ""}`} type='submit' disabled={!isValid || errorApi}>{nameButton}</button>
                </div>
            </form>
            <p className='form__question'>{question}<Link className='form__switch' to={pathSwitch}>{nameSwitch}</Link></p>
        </div>
    );
}

export default Form;
