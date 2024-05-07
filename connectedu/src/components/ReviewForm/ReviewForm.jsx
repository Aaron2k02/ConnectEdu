import React from 'react';
import './ReviewForm.scss';
import { useState } from 'react'


const ReviewForm = (props) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log('Comment:', comment);
        console.log('Rating:', rating);
        // Code to handle review submission goes here
        props.toggle();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2><b>Leave a Review</b></h2>
                <form onSubmit={handleReviewSubmit}>
                    
                    <label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Your opinion...'
                        />
                    </label>
                    <div className="button-group">
                        <button type="submit">Submit</button>
                        <button onClick={props.toggle}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;