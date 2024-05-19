import React, { useState } from 'react';
import './ReviewItems.scss';
import RatingForm from '../ratingForm/RatingForm';
import ReviewItem from '../reviewItem/ReviewItem';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const ReviewItems = ({ reviewData, courseId }) => {

    const [seen, setSeen] = useState(false);

    const togglePop = () => {
        setSeen(!seen);
    };

    const reviewsQuery = useQuery({
        queryKey: ["reviews", courseId],
        queryFn: () => newRequest.get(`/reviews/${courseId}`).then((res) => res.data),
        enabled: !!courseId,
    });

    return (
        <div className='reviewItems'>
            <div className="reviewHeader">
                <h2>Reviews</h2>
                <button onClick={togglePop}>Add Review</button>
                {seen ? <RatingForm toggle={togglePop} /> : null}
            </div>
            <div className="reviews">
                {reviewsQuery.isFetching ? "loading" :
                    reviewsQuery.error ? "Error has occured":
                    reviewsQuery.data.map(review => (
                    <ReviewItem key={review._id} review={review} />
                ))}
            </div>
        </div>
    )
}

export default ReviewItems

