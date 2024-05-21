import React from 'react';
import './CourseCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest'; // Ensure this is the correct path

const CourseCard = ({ item }) => {
    const navigate = useNavigate();

    // Backend Query handling
    const { isFetching, error, data } = useQuery({
        queryKey: [item.educatorId],
        queryFn: () => newRequest.get(`/users/${item.educatorId}`).then((res) => res.data),
    });

    const handleReadMoreClick = (courseId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            navigate('/login');
        } else {
            // Navigate to course detail page
            navigate(`/courses/${courseId}`);
        }
    };

    return (
        <div className='courseCard'>
            <img src={item.thumbnailUrl[0] || '/images/default-thumbnail.jpg'} alt={item.title} />
            <div className="info">
                {isFetching ? (
                    "Loading"
                ) : error ? (
                    "Something went wrong"
                ) : (
                    <div className="user">
                        <img src={data.photoUrl || '/images/noavatar.png'} alt={data.username || 'Unknown User'} />
                        <span>{data.username || 'Unknown User'}</span>
                    </div>
                )}
            </div>
            <div className="courseInfo">
                <p>{item.description && item.description.length > 70 ? item.description.substring(0, 70) + '...' : item.description}</p>
            </div>
            <div className="stars">
                <span> Rating: </span>
                <div className="rating">
                    <span>{!isNaN((item.totalStars / item.rateCount).toFixed(1)) &&
                        Math.round((item.totalStars / item.rateCount).toFixed(1))}</span>
                    <img src="/images/star.png" alt="Rating" />
                </div>
            </div>
            <div className="courseDescription">
                <div className="item">
                    <span> Course Purchase: </span>
                    <p>{item.totalSales || '0'}</p>
                </div>
                <div className="item price">
                    <span> Course Price: </span>
                    <p> RM {item.price || 'N/A'}</p>
                </div>
            </div>
            <hr />
            <div className="details">
                <button onClick={() => handleReadMoreClick(item._id)} className='link courseDetail'>
                    <span>View Course</span>
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
