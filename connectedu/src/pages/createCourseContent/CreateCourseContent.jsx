import React, { useReducer, useState } from 'react';
import "./CreateCourseContent.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { courseReducer, INITIAL_STATE } from '../../reducers/courseReducer';

const CreateCourseContent = () => {
    const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
    const location = useLocation();
    const { courseState, files } = location.state;

    const [courseSections, setCourseSections] = useState([
        { sectionTitle: '', videoTitle: '', videoUrl: '', videoDescription: '', videoDuration: '' }
    ]);

    // console.log(courseSections);

    const handleInputChange = (e, index, field) => {
        const { value } = e.target;
        const updatedSections = [...courseSections];
        updatedSections[index][field] = value;
        setCourseSections(updatedSections);
    };

    const handleInputAdd = () => {
        setCourseSections([...courseSections, { sectionTitle: '', videoTitle: '', videoUrl: '', videoDescription: '', videoDuration: '' }]);
    };

    const handleInputRemove = (index) => {
        const updatedSections = [...courseSections];
        updatedSections.splice(index, 1);
        setCourseSections(updatedSections);
    };

    let navigate = useNavigate();

    const routeNext = () => {
        dispatch({ type: "ADD_COURSE_CONTENT", payload: { sections: courseSections } });
        // console.log(...courseState.topics);
        navigate('/create-course-preview', { state: { courseState, sectionState: state, files } });
    };

    const routeBack = () => {
        navigate('/createCourse', { state: { courseState, files } });
    };

    return (
        <div className='createCourseContent'>
            <div className="container">
                <h1>Create Course Content</h1>
                <div className="sections">
                    <div className="left">
                        <form id="courseSections" className="courseSections" autoComplete="off">
                            <div className="form-field">

                                <h3>Structure Your Course Content</h3>

                                {courseSections.map((sectionItem, index) => (
                                    <div className="sectionItem" key={index}>

                                        <div className="input-header">
                                            <h3>Section {index + 1}</h3>
                                            {courseSections.length !== 1 && (
                                                <button
                                                    type='button'
                                                    onClick={() => handleInputRemove(index)}
                                                    className='remove-btn'
                                                >
                                                    <span>Remove</span>
                                                </button>
                                            )}
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor={`sectionTitle${index}`}>Section Title</label>
                                            <input
                                                type='text'
                                                id={`sectionTitle${index}`}
                                                value={sectionItem.sectionTitle}
                                                onChange={e => handleInputChange(e, index, 'sectionTitle')}
                                                required
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor={`videoTitle${index}`}>Video Title</label>
                                            <input
                                                type='text'
                                                id={`videoTitle${index}`}
                                                value={sectionItem.videoTitle}
                                                onChange={e => handleInputChange(e, index, 'videoTitle')}
                                                required
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor={`videoUrl${index}`}>Video URL</label>
                                            <input
                                                type='text'
                                                id={`videoUrl${index}`}
                                                value={sectionItem.videoUrl}
                                                onChange={e => handleInputChange(e, index, 'videoUrl')}
                                                required
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor={`videoDescription${index}`}>Video Description</label>
                                            <textarea
                                                id={`videoDescription${index}`}
                                                value={sectionItem.videoDescription}
                                                onChange={e => handleInputChange(e, index, 'videoDescription')}
                                                placeholder='Brief Description to introduce your video'
                                                required
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor={`videoDuration${index}`}>Video Duration (in minutes)</label>
                                            <input
                                                type='number'
                                                id={`videoDuration${index}`}
                                                value={sectionItem.videoDuration}
                                                onChange={e => handleInputChange(e, index, 'videoDuration')}
                                                required
                                            />
                                        </div>

                                        <div className="second-division">
                                            {courseSections.length - 1 === index && courseSections.length < 4 && (
                                                <button
                                                    type='button'
                                                    onClick={handleInputAdd}
                                                    className='add-btn'
                                                >
                                                    <span>Add Another Section </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>
                        <div className="createCourseNav">
                            <button onClick={routeBack}> Back </button>
                            <button onClick={routeNext}> Next </button>
                        </div>
                    </div>
                    <div className="right">
                        <div className="items">
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3>Course Information </h3>
                            </div>
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3>Course Content</h3>
                            </div>
                            <div className="item">
                                <img src={'/images/empty-check-mark.png'} alt="" />
                                <h3>Course Preview</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourseContent;
