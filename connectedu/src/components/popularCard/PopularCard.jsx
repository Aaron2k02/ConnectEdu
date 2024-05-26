import React from 'react'
import './PopularCard.scss'
import { Link, useNavigate } from 'react-router-dom';

const PopularCard = ({ item }) => {

  const navigate = useNavigate();
  
  const handleReadMoreClick = (courseId) => {
      navigate(`/course/${courseId}`);
  };

  return (
    <div className='popularCard'>
      <div className='imgCard'>
        <img src={item.thumbnailUrl[0]} alt="" />
         <div className='desc'>
          <h2>{item.description}</h2>
             <div className='btn'>
             <button onClick={() => handleReadMoreClick(item._id)} className='link courseDetail' >Buy Now</button>
             </div>
          </div>
       </div>  
    </div>
  )
}

export default PopularCard
