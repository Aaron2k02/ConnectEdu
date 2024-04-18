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
                    <p> {item.desc}</p>
                </div>
                <div className="courseDescription">
                    <div className="item">
                        <span> Avaliable Seats: </span>
                        <p> {item.price}</p>
                    </div>
                    <div className="item">
                        <span> Total Student: </span>
                        <p> {item.price}</p>
                    </div>
                    <div className="item">
                        <span> Course Price: </span>
                        <p> RM {item.price}</p>
                    </div>
                </div>
                <div className="stars">
                <span> Rating: </span>
                    <span>{item.star}</span>
                    <img src={"/images/star.png"} alt="" />
                </div>
                <hr/>
                <div className="details">
                    {/* <img src={"/images/heart.png"} alt="" /> */}
                    {/* <div className="price">
                        <span> Course Price </span>
                        <h2>${item.price}</h2>
                    </div> */}
                    <Link to='/course/123' className='link detailsLink'>
                    <span>View Course</span>
                    </Link>
                </div>
        </div>
     
  )
}

export default courseCard