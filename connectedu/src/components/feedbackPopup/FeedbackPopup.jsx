import React, { useState } from 'react';
import './FeedbackPopup.scss';
import newRequest from '../../utils/newRequest';

const FeedbackPopup = ({ course, isAdmin, toggle }) => {
    const [feedback, setFeedback] = useState(course.adminFeedback || '');

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    }

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            await newRequest.put(`/courses/feedback/${course._id}`, { feedback });
            toggle();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="feedback-popup">
            <div className="popup-inner">
                <div className="popup-inner-header">
                    <h2>Course Feedback</h2>
                    <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
                </div>
                <div className="popup-inner-item">
                    <label htmlFor="feedback">Feedback</label>
                    <textarea
                        id="feedback"
                        cols="30"
                        rows="16"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        disabled={!isAdmin}
                    />
                </div>
                <div className='popupNav'>
                    <button onClick={toggle} className='btn-cancel'>Close</button>
                    {isAdmin && (
                        <button onClick={handleFeedbackSubmit} className='btn-confirm'>Confirm</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FeedbackPopup;
