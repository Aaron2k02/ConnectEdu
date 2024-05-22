import React, { useState, useRef } from 'react';
import './RatingForm.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const RatingForm = (props) => {

    const [rating, setRating] = useState(null);

    const [hover, setHover] = useState(null);

    const content = useRef('');

    let navigate = useNavigate();

    const { pathname } = useLocation();

    // Extract the course ID from the pathname
    const courseId = pathname.split('/').pop();
    // Should log the course ID
    console.log(courseId); 

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post('/reviews', review)
        },
        onSuccess: () => { 
            queryClient.invalidateQueries(["reviews"])
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        const review = {
            courseId,
            content: content.current.value,
            rating,
        };
        mutation.mutate(review);
        navigate(`/course/${courseId}`);
        props.toggle();
    }

    return (
        <div className="rating-popup">
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
                                        id={id}
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
                        ref={content}
                    ></textarea>
                </div>
                <div className='popupNav'>
                    <button onClick={props.toggle} className='btn-cancel'>Cancel</button>
                    <button onClick={handleSubmit} className='btn-confirm'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default RatingForm;