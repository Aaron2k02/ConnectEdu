import React from 'react';
import './CourseCard.scss';
import { Link } from 'react-router-dom';

const courseCard = ({ item }) => {
    return (
        <div className='courseCard'>
            <img src={item.img} alt="" />
            <div className="info">
                <div className="user">
                    <img src={item.pp} alt="" />
                    <span>{item.username}</span>
                </div>
            </div>
            <div className="courseInfo">
                <p> {item.desc.length > 30 ? item.desc.substring(0, 70) + '...' : item.desc}</p>
            </div>
            <div className="stars">
                <span> Rating: </span>
                <div className="rating">
                    <span>{item.star}</span>
                    <img src={"/images/star.png"} alt="" />
                </div>
            </div>
            <div className="courseDescription">
                <div className="item">
                    <span> Avaliable Seats: </span>
                    <p> {item.price}</p>
                </div>
                <div className="item price">
                    <span> Course Price: </span>
                    <p> RM {item.price}</p>
                </div>
            </div>
            <hr />
            <div className="details">
                {/* <img src={"/images/heart.png"} alt="" /> */}
                {/* <div className="price">
                        <span> Course Price </span>
                        <h2>${item.price}</h2>
                    </div> */}
                <Link to='/course/123' className='link courseDetail'>
                    <span>View Course</span>
                </Link>
                {/* <Link to='/course/123' className='link courseDetail'>
                    <span>Purchase Course</span>
                </Link> */}
            </div>
        </div>

    )
}

export default courseCard