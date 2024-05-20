import React, { useState } from 'react';
import './ViewCourse.scss';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';

import ViewCourseSection from '../../components/viewCourseSection/ViewCourseSection';

const ViewCourse = () => {
    const { courseId } = useParams();
    const [selectedSection, setSelectedSection] = useState(null);

    const fetchSections = useQuery({
        queryKey: ["fetchSections", courseId],
        queryFn: () => newRequest.get(`/courses/${courseId}/sections`).then((res) => res.data),
    });

    const handleSelectSection = (section) => {
        setSelectedSection(section);
    };

    if (fetchSections.isFetching) return <div>Loading...</div>;
    if (fetchSections.error) return <div>Something went wrong!</div>;

    return (
        <div className='viewCourse'>
            <div className="container">
                <div className="item">
                    {selectedSection && (
                        <iframe
                            width="560"
                            height="315"
                            src={selectedSection.url}
                            title={selectedSection.videoTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
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
                            {fetchSections.data.map(section => (
                                <ViewCourseSection
                                    key={section._id}
                                    section={section}
                                    onSelectSection={handleSelectSection}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCourse;
