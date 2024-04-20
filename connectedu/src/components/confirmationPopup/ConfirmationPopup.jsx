import React from 'react';
import './ConfirmationPopup.scss';
import { useNavigate } from "react-router-dom";

const ConfirmationPopup = (props) => {

    let navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        // Here you can add your login logic, for now, let's just close the popup
        let path = '/manageCourses';
        navigate(path);
        props.toggle();
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2> Confirm to Proceed </h2>
                <div className='popupNav'>
                    <button onClick={props.toggle} className='btn-cancel'>Cancel</button>
                    <button onClick={handleLogin} className='btn-confirm'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup;
