import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({isChecked, handleChangeCheckbox}) {

    return (
        <div className="checkbox">
            <input className="checkbox__input" type="checkbox" checked={isChecked} onChange={handleChangeCheckbox} />
            <p className="checkbox__title">Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox