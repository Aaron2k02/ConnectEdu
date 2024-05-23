import React from 'react'
import './courseSection.scss'

const courseSection = ({ sectionState }) => {
    return (
        <div className="sections">
            <div className="sections-container">
                <h2>Course content</h2>
                {sectionState.map((section, index) => (
                    <div className="section" key={index}>
                        <div className="section-title">
                            <img src={'/images/square-fill-play-button.png'} alt="" />
                            <h3>{section.sectionTitle}</h3>
                        </div>
                        <div className="content">
                            <div className="content-title">
                                <img src={'/images/square-unfill-play-button.png'} alt="" />
                                <span>{section.videoTitle}</span>
                            </div>
                            <div className="content-duration">
                                <img src={'/images/clock.png'} alt="" />
                                <span>{section.videoDuration} Minutes</span>
                            </div>
                            <div className="content-description">
                                <p>Course Description</p>
                                <span>{section.videoDescription}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default courseSection