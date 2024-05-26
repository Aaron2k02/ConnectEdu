import React from 'react'
import './createCourseErrorPopop.scss'

const createCourseErrorPopop = ({ message, toggle }) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Error</h2>
                <p>{message}</p>
                <div className='popupNav'>
                    <button onClick={toggle} className='btn-cancel'>Close</button>
                </div>
            </div>
        </div>
    );
}

export default createCourseErrorPopop