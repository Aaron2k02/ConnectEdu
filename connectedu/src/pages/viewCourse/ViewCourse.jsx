import React, { useState } from 'react'
import './ViewCourse.scss'

import ViewCourseSection from '../../components/viewCourseSection/ViewCourseSection'

import { sectionData } from '../../data/sectionData';

const ViewCourse = () => {

    const [selectedSection, setSelectedSection] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectSection = (section) => {
        // Activate loading state
        setIsLoading(true);
        // Simulate loading delay with setTimeout
        setTimeout(() => {
        // Set selected section after delay
        setSelectedSection(section);
        // Deactivate loading state
        setIsLoading(false);
        }, 1000); // Change 1000 to desired loading delay in milliseconds
    };

    return (
        <div className='viewCourse'>
            <div className="container">
                <div className="item">
                    {selectedSection && (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${selectedSection.videoId}`}
                            title={selectedSection.title}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen 
                        ></iframe>
                    )}
                    <div className="courseSectionDescription">
                        <div className="courseTitle">
                            <img src={'/images/square-fill-play-button.png'} alt="" />
                            <h3>{selectedSection ? selectedSection.title : 'Select a section to view'}</h3>
                        </div>
                        <div className="courseDescription">
                            <div className="courseAbout">
                                <img src={'/images/about-course-icon.png'} alt="" />
                                <h2>About Course Section</h2>
                            </div>
                            <p>
                                {selectedSection ? selectedSection.description : 'Select a section to view'}
                            </p>
                        </div>
                    </div>
                    <div className="write">
                        <textarea id="questionInput" name="question" placeholder="Ask a question" cols="30" rows="10"></textarea>
                        <button>Send</button>
                    </div>
                </div>
                <div className="item">
                    <div className="box">
                        <div className="box-items">
                            <div className="box-header">
                                <img src={'/images/square-fill-play-button.png'} alt="" />
                                <span className="desc">Course Navigation Pane</span>
                            </div>
                            {sectionData.map(section => (
                                <ViewCourseSection
                                    key={section.id}
                                    section={section}
                                    onSelectSection={handleSelectSection}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* {isLoading && <div className="loading">Loading...</div>} */}
        </div>
    )
}

export default ViewCourse