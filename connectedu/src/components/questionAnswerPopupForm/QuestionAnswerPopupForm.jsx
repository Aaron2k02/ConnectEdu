import React, { useState } from 'react';
import './QuestionAnswerPopupForm.scss';
import { useNavigate } from "react-router-dom";

const QuestionAnswerPopupForm = (props) => {

    let navigate = useNavigate();
    const [showThankYou, setShowThankYou] = useState(false);
    const [showQuestionForm, setShowQuestionForm] = useState(true);

    function handleLogin(e) {
        e.preventDefault();
        // Here you can add your login logic, for now, let's just close the popup
        let path = '/notifications';
        navigate(path);
        setShowQuestionForm(false);
        setShowThankYou(true);
    }

    function closeThankYou() {
        setShowThankYou(false);
        setShowQuestionForm(true);
        props.toggle();
    }

    return (
        <div>
            <div className="question-answer-popup" style={{ display: showQuestionForm ? 'block' : 'none' }}>
                <div className="popup-inner">
                    <div className="popup-inner-header">
                        <h2> Q & A Popup Form </h2>
                        <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
                    </div>
                    <div className="popup-inner-item">
                        <label htmlFor="question">Question</label>
                        <textarea
                            id="question"
                            cols="30"
                            rows="16"
                            placeholder='Question from student'
                        >
                        </textarea>
                    </div>
                    <div className="popup-inner-item">
                        <label htmlFor="answer">Answer</label>
                        <textarea
                            id="answer"
                            cols="30"
                            rows="16"
                            placeholder='Answer to question'
                        ></textarea>
                    </div>
                    <div className='popupNav'>
                        <button onClick={props.toggle} className='btn-cancel'>Cancel</button>
                        <button onClick={handleLogin} className='btn-confirm'>Confirm</button>
                    </div>
                </div>
            </div>
            {showThankYou && (
                <div className="thank-you-popup">
                    <div className="popup-inner">
                        <div className="popup-inner-header">
                            <h2><b> Thank you for your answer! </b></h2>
                        </div>
                        <div className='popupNav'>
                            <button onClick={closeThankYou} className='btn-close'>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionAnswerPopupForm;
