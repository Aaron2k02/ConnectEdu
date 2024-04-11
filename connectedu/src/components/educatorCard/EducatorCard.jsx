import React from 'react';
import './EducatorCard.scss';

const EducatorCard = ({ item }) => {
  return (
    // Will be handled in the backend component
    // <Link to='/course?category=design'>
      <div className='EducatorCard'>
        <img src={item.img} />
        <div className="info">
          <img src={item.pp} />
          <div className="texts">
            <h2>
              {item.cat}
            </h2>
            <span>
              {item.username}
            </span>
          </div>
        </div>
      </div>
    // </Link>
  )
}

export default EducatorCard