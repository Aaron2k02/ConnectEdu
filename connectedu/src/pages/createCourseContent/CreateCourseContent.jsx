import React, { useReducer, useEffect } from 'react';
import "./CreateCourseContent.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { courseReducer, INITIAL_STATE } from '../../reducers/courseReducer';

const CreateCourseContent = () => {
    const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
    const location = useLocation();
    const { courseState, files, isCreateCourse } = location.state || {};
    const navigate = useNavigate();

    // Initialize sections if courseState is provided
    useEffect(() => {
        if (courseState) {
            dispatch({ type: 'SET_STATE', payload: courseState });
        }
    }, [courseState]);

    const handleInputChange = (e, index, field) => {
        const { value } = e.target;
        const updatedSections = state.sections.map((section, i) =>
            i === index ? { ...section, [field]: value } : section
        );
        dispatch({ type: "ADD_COURSE_CONTENT", payload: updatedSections });
    };

    const handleInputAdd = () => {
        const newSection = { sectionTitle: '', videoTitle: '', videoUrl: '', videoDescription: '', videoDuration: '' };
        dispatch({ type: "ADD_SECTION", payload: newSection });
    };

    const handleInputRemove = (index) => {
        dispatch({ type: "REMOVE_SECTION", payload: index });
    };

    const routeNext = () => {
        navigate('/create-course-preview', { state: { courseState: state, files, isCreateCourse } });
    };

    const routeBack = () => {
        if (isCreateCourse){
            navigate('/createCourse', { state: { courseState: state, files } });
        } else {
            navigate(`/updateCourse/${courseState._id}`, { state: { courseState: state, files, isCreateCourse } });
        }
    };

    return (
        <div className='createCourseContent'>
            <div className="container">
                {isCreateCourse ?
                    (<h1>Create Your Course Content</h1>)
                    :
                    (<h1>Update Your Course Content</h1>)
                }
                <div className="sections">
                    <div className="left">
                        <form id="courseSections" className="courseSections" autoComplete="off">
                            <div className="form-field">
                                {state.sections.length > 0 ? (
                                    state.sections.map((sectionItem, index) => (
                                        <div className="sectionItem" key={index}>
                                            <div className="input-header">
                                                <h3>Section {index + 1}</h3>
                                                {state.sections.length !== 1 && (
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
                                                {state.sections.length - 1 === index && state.sections.length < 4 && (
                                                    <button
                                                        type='button'
                                                        onClick={handleInputAdd}
                                                        className='add-btn'
                                                    >
                                                        <span>Add Another Section</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="second-division">
                                        <button
                                            type='button'
                                            onClick={handleInputAdd}
                                            className='start-button'
                                        >
                                            <span>No sections available. Click to start adding a section.</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                        <div className="createCourseNav">
                            <button onClick={routeBack}>Back</button>
                            <button onClick={routeNext}>Next</button>
                        </div>
                    </div>
                    <div className="right">
                        <div className="items">
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3>Course Information</h3>
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
