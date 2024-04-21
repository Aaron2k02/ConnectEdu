import React from 'react';
import './ViewCourseSection.scss';

const ViewCourseSection = ({ section, onSelectSection }) => {

    const handleWatchClick = () => {
        onSelectSection(section);
    };
    
    return (
        <div className='viewCourseSection'>
            <div className="box-item">
                <div className="left-item">
                    <img src={'/images/square-unfill-play-button.png'} alt="" />
                </div>
                <div className="right-item">
                    <h2 className="section-title">{section.title}</h2>
                    <div className="section-duration">
                        <img src={'/images/clock.png'} alt="" />
                        <p className="section-duration">{section.duration}</p>
                    </div>
                    <button onClick={handleWatchClick}> Watch </button>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ViewCourseSection