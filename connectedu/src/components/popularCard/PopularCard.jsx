import React from 'react'
import './PopularCard.scss'
import { Link } from 'react-router-dom';
const PopularCard = ({item}) => {
  return (
    <div className='popularCard'>
      <div className='imgCard'>
      <img src={item.img} alt="" />
         <div className='desc'>
          <h2>{item.desc}</h2>
             <div className='btn'>
               <Link to='/course/123' className='link courseDetail'>
               <button>Buy Now</button>
                </Link>
               
             </div>
          </div>
       </div>  
    </div>
  )
}

export default PopularCard
