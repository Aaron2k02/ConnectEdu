import React from 'react';
import './EducatorCard.scss';

const EducatorCard = ({ educator }) => {
  return (
    // Will be handled in the backend component
    // <Link to='/course?category=design'>
    <div className='EducatorCard'>
      <div className="educatorInfo">
        <img src={educator.photoUrl ||"/images/noavatar.png"} />
        <div className="texts">
          <h2>
            {educator.profile.qualifications || "Pending Qualifications"}
          </h2>
          <span>
            {educator.username}
          </span>
        </div>
        <div className="educatorDetail">
          <p>Total Sales: {educator.totalSales}</p>
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