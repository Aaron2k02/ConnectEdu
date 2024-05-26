import React from 'react';
import './LogOutPopup.scss';

const LogOutPopup = (props) => {

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2> Confirm to Proceed </h2>
                <div className='popupNav'>
                    <button onClick={props.toggle} className='btn-cancel'>Cancel</button>
                    <button onClick={props.handleConfirm} className='btn-confirm'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default LogOutPopup;
