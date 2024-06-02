import React, { useState, useEffect } from 'react';
import './QuestionAnswerPopupForm.scss';
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const QuestionAnswerPopupForm = ({ questionData, currentUser, toggle }) => {
    const navigate = useNavigate();
    const [answerContent, setAnswerContent] = useState('');

    useEffect(() => {
        if (questionData?.answer) {
            setAnswerContent(questionData.answer.content);
        }
    }, [questionData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentUser._id !== questionData.question.askerId._id) {
            await newRequest.post(`/questionAnswer/${questionData.question._id}`, { content: answerContent });
        }
        toggle();
    };

    return (
        <div className="question-answer-popup">
            <div className="popup-inner">
                <div className="popup-inner-header">
                    <h2>Q & A Popup Form</h2>
                    <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
                </div>
                <div className="popup-inner-item">
                    <label htmlFor="question">Question</label>
                    <textarea
                        id="question"
                        name='question'
                        cols="30"
                        rows="5"
                        value={questionData?.question?.content || ''}
                        readOnly
                    />
                </div>
                <div className="popup-inner-item">
                    <label htmlFor="answer">Answer</label>
                    <textarea
                        id="answer"
                        name='answer'
                        cols="30"
                        rows="5"
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                        readOnly={currentUser._id === questionData.question.askerId._id}
                    />
                </div>
                <div className='popupNav'>
                    {currentUser._id !== questionData.question.askerId._id && (<>
                        <button onClick={toggle} className='btn-cancel'>Cancel</button>
                        <button onClick={handleSubmit} className='btn-confirm'>Confirm</button>
                    </>
                    )}
                    {currentUser._id === questionData.question.askerId._id && (
                        <button onClick={toggle} className='btn-close'>Close</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswerPopupForm;
