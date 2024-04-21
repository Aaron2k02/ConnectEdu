import React from 'react';
import './ViewCourseSection.scss';

const ViewCourseSection = () => {
  return (
      <div className='viewCourseSection'>
          <div className="box-item">
              <div className="left-item">
                  <img src={'/images/square-unfill-play-button.png'} alt="" />
              </div>
              <div className="right-item">
                  <h2 className="section-title">lesson - 1 Portfolio Demo</h2>
                  <div className="section-duration">
                      <img src={'/images/clock.png'} alt="" />
                      <p className="section-duration">12m 1s</p>
                  </div>
                  <button> Watch </button>
              </div>
          </div>
          <hr />
      </div>
  )
}

export default ViewCourseSection