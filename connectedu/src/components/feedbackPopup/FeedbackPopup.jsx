import React from 'react';
import './FeedbackPopup.scss';
import { useNavigate } from "react-router-dom";

const FeedbackPopup = (props) => {

    let navigate = useNavigate();

    function handleFeedback(e) {
        e.preventDefault();
        // Here you can add your login logic, for now, let's just close the popup
        let path = '/ManageClass';
        navigate(path);
        props.toggle();
    }

    return (
        <div className="feedback-popup">
            <div className="popup-inner">
                <div className="popup-inner-header">
                    <h2> Feedback Form Popup </h2>
                    <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
                </div>
                <div className="popup-inner-item">
                    <label htmlFor="question">Provide Feedback</label>
                    <textarea
                        id="question"
                        cols="30"
                        rows="16"
                        placeholder='Question from student'
                    >
                    </textarea>
                </div>
                <div className='popupNav'>
                    <button onClick={props.toggle} className='btn-cancel'>Cancel</button>
                    <button onClick={handleFeedback} className='btn-confirm'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackPopup;