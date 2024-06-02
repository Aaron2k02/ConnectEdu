import React, { useState } from 'react';
import './ReviewItems.scss';
import RatingForm from '../ratingForm/RatingForm';
import ReviewItem from '../reviewItem/ReviewItem';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const ReviewItems = ({ courseId, hasPurchasedCourse }) => {
    const [seen, setSeen] = useState(false);

    const togglePop = () => {
        setSeen(!seen);
    };

    const reviewsQuery = useQuery({
        queryKey: ["reviews", courseId],
        queryFn: () => newRequest.get(`/reviews/${courseId}`).then((res) => res.data),
        enabled: !!courseId,
    });

    if (reviewsQuery.isFetching) {
        return <div>Loading...</div>;
    }

    if (reviewsQuery.error) {
        return <div>Error has occurred: {reviewsQuery.error.message}</div>;
    }

    return (
        <div className='reviewItems'>
            <div className="reviewHeader">
                <h2>Reviews</h2>
                {hasPurchasedCourse && (
                    <button onClick={togglePop}>Add Review</button>
                )}
                {seen && <RatingForm toggle={togglePop} />}
            </div>
            <div className="reviews">
                {reviewsQuery.data && reviewsQuery.data.length > 0 ? (
                    reviewsQuery.data.map(review => (
                        <ReviewItem key={review._id} review={review} />
                    ))
                ) : (
                    <div className="no-reviews">
                        <img src={"/images/ConnectEduLogo-bg.png"} alt="ConnectEdu Logo" />
                        <p>No Review for this course</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewItems;
