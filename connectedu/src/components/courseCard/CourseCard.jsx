import React from 'react';
import './CourseCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest'; // Ensure this is the correct path

const CourseCard = ({ item }) => {
    const navigate = useNavigate();

    const handleReadMoreClick = (courseId) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            // Redirect to login page
            navigate('/login');
        } else {
            // Navigate to course detail page
            navigate(`/course/${courseId}`);
        }
    };

    return (
        <div className='courseCard'>
            <img src={item.thumbnailUrl[0] || '/images/default-thumbnail.jpg'} alt={item.title} />
            <div className="info">
                <div className="user">
                    <img src={item.educatorId.photoUrl || '/images/noavatar.png'} alt={item.educatorId.username || 'Unknown User'} />
                    <span>{item.educatorId.username || 'Unknown User'}</span>
                </div>
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
