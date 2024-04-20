import React from 'react'
import './PopularCard.scss'
const PopularCard = ({item}) => {
  return (
    <div className='popularCard'>
      <div className='imgCard'>
      <img src={item.img} alt="" />
         <div className='desc'>
          <h2>{item.desc}</h2>
             <div className='btn'>
               <button>Buy Now</button>
             </div>
          </div>
       </div>  
    </div>
  )
}

export default PopularCard
