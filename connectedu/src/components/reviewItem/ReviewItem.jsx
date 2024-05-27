import React from 'react';
import './ReviewItem.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const ReviewItem = ({ review }) => {
    
    return (
        <div className="reviewItem">
            <div className="container">
                <div className="user">
                    <img className="pp" src={review.userId.photoUrl || '/images/noavatar.png'} alt="" />
                    <div className="info">
                        <span>{review.userId.username}</span>
                    </div>
                </div>
                <div className="stars">
                    {Array.from({ length: review.rating }, (_, index) => (
                        <img key={index} src="/images/star.png" alt="" />
                    ))}
                    <span>{review.rating}</span>
                </div>
                <p>{review.content}</p>
                <div className="helpful">
                    <span>Helpful?</span>
                    <img src="/images/like.png" alt="" />
                    <span>Yes</span>
                    <img src="/images/dislike.png" alt="" />
                    <span>No</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
