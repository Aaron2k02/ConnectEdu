import React from 'react';
import './ReviewItem.scss';

const ReviewItem = ({ review }) => {
    return (
        <div className="reviewItem">
            <div className="container">
                <div className="user">
                    <img className="pp" src={review.userImage} alt="" />
                    <div className="info">
                        <span>{review.userName}</span>
                        <div className="country">
                            <img src={review.countryFlag} alt="" />
                            <span>{review.country}</span>
                        </div>
                    </div>
                </div>
                <div className="stars">
                    {Array.from({ length: review.rating }, (_, index) => (
                        <img key={index} src="/images/star.png" alt="" />
                    ))}
                    <span>{review.rating}</span>
                </div>
                <p>{review.comment}</p>
                <div className="helpful">
                    <span>Helpful?</span>
                    <img src="/images/like.png" alt="" />
                    <span>Yes</span>
                    <img src="/images/dislike.png" alt="" />
                    <span>No</span>
                </div>
                <hr />
            </div>
            
        </div>
    );
};

export default ReviewItem;
