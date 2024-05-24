import React from 'react'
import './LearningCard.scss'
import { Link, useNavigate } from 'react-router-dom';

const LearningCard = ({ item }) => {

  let navigate = useNavigate();

  const viewCourse = (courseId) => {
    let path = `/viewCourse/${courseId}`;
    navigate(path);
  };

  return (
    <div className='learningCard'>
        <div className='imgCard'>
        <img src={item.thumbnailUrl[0]} alt="" />
        </div>
        <div className='title'>
            <span>{item.title}</span>
        </div>
        <div className='btn'>
          <button onClick={() => viewCourse(item._id)}>Continue Learning</button>
        </div>
    </div>
  )
}

export default LearningCard

