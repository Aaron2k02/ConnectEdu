import React, { useReducer, useState, useEffect } from 'react';
import "./CreateCoursePreview.scss";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationPopup from '../../components/confirmationPopup/ConfirmationPopup';
import { courseReducer, INITIAL_STATE } from '../../reducers/courseReducer'; // Ensure INITIAL_STATE is imported
import upload from '../../utils/upload';

const CreateCoursePreview = () => {
    const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
    const [seen, setSeen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [courseThumbnails, setCourseThumbnails] = useState([]);

    const location = useLocation();
    const { courseState = state, sectionState, files } = location.state || {};

    // useEffect(() => {
    //     if (files && files.length > 0) {
    //         handleUpload(files);
    //     }
    //     console.log(sectionState);
    // }, [files]);

    const handleUpload = async (files) => {
        setUploading(true);
        try {
            const thumbnails = await Promise.all(
                [...files].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            );
            setCourseThumbnails(thumbnails);
            dispatch({
                type: "ADD_IMAGES",
                payload: thumbnails
            });
        } catch (err) {
            console.log(err);
        }
        setUploading(false);
    };

    const togglePop = () => {
        setSeen(!seen);
        // if (!uploading) {
        //     handleUpload(files);
        // }
        console.log(...courseState.topics);
        console.log(files);
        console.log(...sectionState.courseContent.sections);
    };

    let navigate = useNavigate();

    const routeBack = () => {
        navigate('/create-course-content', { state: { courseState, sectionState, files } });
        console.log(sectionState);
    };

    const courseTopics = [...courseState.topics];

    const courseContents = [...sectionState.courseContent.sections];

    return (
        <div className='createCourseContent'>
            <div className="container">
                <h1> Review Course Content</h1>
                <div className="sections">
                    <div className="left">
                        <div className="courseImage">
                            <img src={"/images/ConnectEduLogo-bg.png"} alt="" />
                        </div>
                        <h3>{courseState.title}</h3>
                        <div className="stars">
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <span> 5 </span>
                        </div>
                        <div className="details">
                            <div className="item">
                                <img src="/images/clock.png" alt="" />
                                <span>{courseState.courseDuration} Hours</span>
                            </div>
                            <div className="price">
                                <h2>${courseState.price} </h2>
                            </div>
                        </div>
                        <div className="courseDescription">
                            <h2>About this course</h2>
                            <p>{courseState.shortTitle}</p>
                        </div>
                        <div className="features">
                            <h2>What you will learn from this course?</h2>
                            {courseTopics && courseTopics.map((topic, index) => (
                                <div className="item" key={index}>
                                    <img src="/images/greencheck.png" alt="" />
                                    <p>{topic.coverage}</p> {/* Adjust this line as needed */}
                                </div>
                            ))}
                        </div>
                        <div className="courseDescription">
                            <h2>Course Description</h2>
                            <p>{courseState.description}</p>
                        </div>
                        <div className="sections">
                            <h2>Course content</h2>
                            {courseContents && courseContents.map((section, index) => (
                                <div className="section" key={index}>
                                    <h3>{section.sectionTitle}</h3>
                                    <div className="content">
                                        <div className="item">
                                            <span>{section.videoTitle}</span>
                                            <span>{section.videoDescription}</span>
                                            <span>{section.videoDuration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="createCourseNav">
                            <button onClick={routeBack}> Back </button>
                            <button onClick={togglePop}> Publish </button>
                            <button type="button" onClick={() => handleUpload(files)}>
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
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
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3>Course Preview</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {seen ? <ConfirmationPopup toggle={togglePop} /> : null}
        </div>
    );
};

export default CreateCoursePreview;
