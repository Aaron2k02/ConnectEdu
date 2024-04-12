import React from 'react';
import './CourseCard.scss';
import { Link } from 'react-router-dom';

const courseCard = ({ item }) => {
    return (
      <Link to='/course/123' className='link'>
        <div className='courseCard'>
                <img src={item.img} alt="" />
                <div className="info">
                    <div className="user">
                        <img src={item.pp} alt="" />
                        <span>{item.username}</span>
                    </div>
                </div>
                <p> {item.desc}</p>
                <div className="star">
                    <img src={"/images/star.png"} alt="" />
                    <span>{item.star}</span>
                </div>
                <hr/>
                <div className="details">
                    <img src={"/images/heart.png"} alt="" />
                    <div className="price">
                        <span> Course Price </span>
                        <h2>${item.price}</h2>
                    </div>
                </div>
        </div>
      </Link>
  )
}

export default courseCard