import React from 'react';
import './ReviewItem.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const ReviewItem = ({ review }) => {

    const reviewQuery = useQuery({
        queryKey: ["reviewUser", review._id],
        queryFn: () => newRequest.get(`/users/${review.userId}`).then((res) => res.data),
        enabled: !!review._id,
    });

    // reviewsQuery.data 

    return (
        <div className="reviewItem">
            <div className="container">
                {reviewQuery.isFetching ? "loading" :
                    reviewQuery.error ? "Error has occured" :
                       <div className="user">
                            <img className="pp" src={reviewQuery.data.photoUrl || '/images/noavatar.png'} alt="" />
                    <div className="info">
                        <span>{reviewQuery.data.username}</span>
                        <div className="country">
                            <span>{reviewQuery.data.country}</span>
                        </div>
                    </div>
                </div>}
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
                <hr />
            </div>
            
        </div>
    );
};

export default ReviewItem;
