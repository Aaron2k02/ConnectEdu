import React from 'react'
import './LearningCard.scss'





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
        <button>Continue..</button>
        </div>
    </div>
  )
}

export default LearningCard

