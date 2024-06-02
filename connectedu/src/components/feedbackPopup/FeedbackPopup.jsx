import React, { useState } from 'react';
import './FeedbackPopup.scss';
import newRequest from '../../utils/newRequest';
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient

const FeedbackPopup = ({ course, isAdmin, toggle }) => {
    const [feedback, setFeedback] = useState(course.adminFeedback || '');
    const queryClient = useQueryClient(); // Initialize useQueryClient

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAdmin) {
            // Send feedback to the server
            await newRequest.post(`/courses/feedback/${course._id}`, { feedback });
            // Invalidate the query to trigger a refetch
            queryClient.invalidateQueries(['courseFeedback', course._id]);
        }
        // Close the feedback popup
        toggle();
    };

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
                        onChange={(e) => setFeedback(e.target.value)}
                        disabled={!isAdmin}
                    />
                </div>
                <div className='popupNav'>
                    <button onClick={toggle} className='btn-cancel'>Close</button>
                    {isAdmin && (
                        <button onClick={handleSubmit} className='btn-confirm'>Confirm</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FeedbackPopup;
