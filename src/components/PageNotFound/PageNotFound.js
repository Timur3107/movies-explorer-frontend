import React from 'react'
import './PageNotFound.css'
import {useNavigate} from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='pagenotfound'>
            <h3 className='pagenotfound__title'>404</h3>
            <p className='pagenotfound__description'>Страница не найдена</p>
            <p className='pagenotfound__goback' onClick={() => navigate(-1)}>Назад</p>
        </div>
    )
};

export default PageNotFound