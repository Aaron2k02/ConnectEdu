import React from 'react';
import './TrustedBy.scss';

const TrustedBy = () => {
  return (
    <div className='trustedBy'>
      <div className="container">
        <span>Trusted By: </span>
        <img src={"/images/amazon-logo-bg.png"} />
        <img src={"/images/google-logo-bg.png"} />
        <img src={"/images/huawei-logo-bg.png"} />
        <img src={"/images/samsung-logo-bg.png"} />
        <img src={"/images/tiktok-logo-bg.png"} />
      </div>
    </div>
  )
}

export default TrustedBy