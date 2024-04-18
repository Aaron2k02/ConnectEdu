import React from 'react';
import './CategoryCard.scss';
import { Link } from 'react-router-dom';

const CategoryCard = ({ item }) => {
  return (
    // Will be handled in the backend component
    <Link to='/courses'>
      <div className='categoryCard'>
        <img src={item.img} />
        <span className='title'>{ item.title }</span>
      </div>
    </Link>
  )
}

export default CategoryCard