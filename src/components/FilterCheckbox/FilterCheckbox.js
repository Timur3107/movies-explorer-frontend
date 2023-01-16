import React, {useState} from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
    const [checked, setChecked] = useState(false);
	
	function handleChange() {
		setChecked(!checked);
	}
    
    return (
        <div className="checkbox">
            <input className="checkbox__input" type="checkbox" checked={checked} onChange={handleChange}/>
            <p className="checkbox__title">Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox