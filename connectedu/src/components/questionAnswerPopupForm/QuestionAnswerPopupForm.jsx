import React from 'react';
import './QuestionAnswerPopupForm.scss';
import { useNavigate } from "react-router-dom";

const QuestionAnswerPopupForm = (props) => {

    let navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        // Here you can add your login logic, for now, let's just close the popup
        let path = '/notifications';
        navigate(path);
        props.toggle();
    }

    return (
        <div className="question-answer-popup">
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
    )
}

export default QuestionAnswerPopupForm;