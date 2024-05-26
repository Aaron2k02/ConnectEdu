import React from 'react';
import './EducatorCard.scss';

const EducatorCard = ({ item }) => {
  return (
    // Will be handled in the backend component
    // <Link to='/course?category=design'>
    <div className='EducatorCard'>
      <div className="educatorInfo">
        <img src={item.pp} />
        <div className="texts">
          <h2>
            {item.cat}
          </h2>
          <span>
            {item.username}
          </span>
        </div>
        <div className="educatorDetail">
          <p>Total Courses: 0</p>
        </div>
      </div>
      <div className="social">
        <img src={"/images/linkedin.png"} alt="" />
        <img src={"/images/twitter.png"} alt="" />
        <img src={"/images/instagram.png"} alt="" />
      </div>
    </div>
    // </Link>
  )
}

export default EducatorCard