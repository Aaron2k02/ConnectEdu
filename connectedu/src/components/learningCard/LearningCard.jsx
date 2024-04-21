import React from 'react'
import './LearningCard.scss'
import { Link } from 'react-router-dom';




const LearningCard = ({item}) => {
  return (
    <div className='learningCard'>
        <div className='imgCard'>
            <img src={item.img} alt="" />
        </div>
        <div className='title'>
            <span>{item.title}</span>
            
        </div>
        <div></div>
        

        
        <div className='btn'>
        <Link to='/viewCourse'> 
        <button>Continue..</button>
        </Link>
        </div>
    </div>
  )
}

export default LearningCard

