import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">

          <div className="item">
            <h2>Categories</h2>
            <span>Web Development</span>
            <span>Mobile App Development</span>
            <span>Game Development</span>
            <span>Software Testing</span>
            <span>Database Management</span>
            <span>Cloud Computing</span>
            <span>DevOps</span>
            <span>Cybersecurity</span>
          </div>

          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>

          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Liverr</span>
            <span>Buying on Liverr</span>
          </div>

          <div className="item">
            <h2>Community</h2>
            <span>Events & Workshops</span>
            <span>Developer Forum</span>
            <span>Education Blog</span>
            <span>Student Success Stories</span>
            <span>Open Source Projects</span>
          </div>

          <div className="item">
            <h2>Explore ConnectEdu</h2>
            <span>EduPro Services</span>
            <span>Learning Community</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>ConnectEdu</h2>
            <span> € ConnectEdu International Ltd. 2024 </span>
          </div>
          <div className="right">
            <div className="social">
              <img src={"/images/linkedin.png"} alt="" />
              <img src={"/images/facebook.png"} alt="" />
              <img src={"/images/twitter.png"} alt="" />
              <img src={"/images/instagram.png"} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer