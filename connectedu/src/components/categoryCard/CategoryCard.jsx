import React from 'react';
import './CategoryCard.scss';

const CategoryCard = ({ item }) => {
  return (
    // Will be handled in the backend component
    // <Link to='/course?category=design'>
      <div className='categoryCard'>
        <img src={item.img} />
        <span className='desc'>{ item.desc }</span>
        <span className='title'>{ item.title }</span>
      </div>
    // </Link>
  )
}

export default CategoryCard