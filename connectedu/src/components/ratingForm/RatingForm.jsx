import React, { useState } from 'react';
import './RatingForm.scss';
import { useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

const RatingForm = (props) => {

    let navigate = useNavigate();
    const [showThankYou, setShowThankYou] = useState(false);
    const [showRatingForm, setShowRatingForm] = useState(true);

    function handleLogin(e) {
        e.preventDefault();
        // Here you can add your login logic, for now, let's just close the popup
        let path = '/course/123';
        navigate(path);
        setShowRatingForm(false);
        setShowThankYou(true);
    }

    function closeThankYou() {
        setShowThankYou(false);
        setShowRatingForm(true);
        props.toggle();
    }

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            <div className="rating-popup" style={{ display: showRatingForm ? 'block' : 'none' }}>
                <div className="popup-inner">
                    <div className="popup-inner-header">
                        <h2> Leave a Review </h2>
                        <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
                    </div>
                    <div className="popup-inner-item">
                        <div className="popup-inner-item-star">
                            {[...Array(5)].map((star, index) => {
                                const currentRating = index + 1;
                                const id = `rating-${currentRating}`; // Unique id for each radio button
                                return (
                                    <label key={index} htmlFor={id}>
                                        <input
                                            type='radio'
                                            id= {id}
                                            name='rating'
                                            value={currentRating}
                                            onClick={() => setRating(currentRating)}
                                        />
                                        <FaStar
                                            className='star'
                                            size={50}
                                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                            onMouseEnter={() => setHover(currentRating)}
                                            // onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <p>Your rating is {rating}</p>
                        <textarea
                            id="answer"
                            cols="30"
                            rows="16"
                            placeholder='Let us know your experience about the course'
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
                            <h2><b> Thank you for your review! </b></h2>
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
