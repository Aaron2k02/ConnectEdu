import React from 'react';
import './CourseCard.scss';
import { Link } from 'react-router-dom';

const CourseCard = ({ item }) => {
    return (
        <div className='courseCard'>
            <img src={item.thumbnailUrl[0] || '/images/default-thumbnail.jpg'} alt={item.title} />
            <div className="info">
                <div className="user">
                    <img src={item.pp || '/images/default-user.png'} alt={item.username} />
                    <span>{item.username || 'Unknown User'}</span>
                </div>
            </div>
            <div className="courseInfo">
                <p>{item.description && item.description.length > 70 ? item.description.substring(0, 70) + '...' : item.description}</p>
            </div>
            <div className="stars">
                <span> Rating: </span>
                <div className="rating">
                    <span>{item.totalStars > 0 ? (item.totalStars / item.rateCount).toFixed(1) : 'N/A'}</span>
                    <img src="/images/star.png" alt="Rating" />
                </div>
            </div>
            <div className="courseDescription">
                <div className="item">
                    <span> Available Seats: </span>
                    <p>{item.availableSeats || 'N/A'}</p>
                </div>
                <div className="item price">
                    <span> Course Price: </span>
                    <p> RM {item.price || 'N/A'}</p>
                </div>
            </div>
            <hr />
            <div className="details">
                <Link to={`/course/${item._id}`} className='link courseDetail'>
                    <span>View Course</span>
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
