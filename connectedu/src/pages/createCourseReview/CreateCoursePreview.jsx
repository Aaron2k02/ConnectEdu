import React, { useReducer, useState, useEffect } from 'react';
import "./CreateCoursePreview.scss";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationPopup from '../../components/confirmationPopup/ConfirmationPopup';
import { courseReducer, INITIAL_STATE } from '../../reducers/courseReducer';
import upload from '../../utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import CourseSection from '../../components/courseSection/courseSection';
import SlideShow from '../../components/slideshow/SlideShow';

const CreateCoursePreview = () => {
    const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
    const [seen, setSeen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false); // State for error popup
    const location = useLocation();
    const { courseState = state, files = [] } = location.state || {};
    const navigate = useNavigate();
    const topicsArray = courseState.topics.map(topic => topic.coverage);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (courseState) {
            dispatch({ type: 'SET_STATE', payload: courseState });
        }
    }, [courseState]);

    const handleUpload = async (files) => {
        setUploading(true);
        try {
            const thumbnails = await Promise.all(
                [...files].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            );
            dispatch({
                type: "ADD_IMAGES",
                payload: { thumbnailUrl: [...thumbnails] }
            });
            setUploadComplete(true); // Set upload complete
        } catch (err) {
            console.log(err);
        }
        setUploading(false);
    };

    useEffect(() => {
        if (uploadComplete) {
            setTimeout(() => {
                const sectionsData = courseState.sections.map(section => ({
                    title: section.sectionTitle,
                    videoTitle: section.videoTitle,
                    url: section.videoUrl,
                    description: section.videoDescription,
                    durationMinutes: section.videoDuration
                }));

                const courseData = {
                    title: courseState.title,
                    shortTitle: courseState.shortTitle,
                    category: courseState.category,
                    price: courseState.price,
                    description: courseState.description,
                    thumbnailUrl: state.thumbnailUrl,
                    topics: topicsArray,
                    courseDuration: courseState.courseDuration,
                    sections: sectionsData
                };
                // Check if all required fields are present
                if (checkRequiredFields(courseData)) {
                    mutation.mutate(courseData); // Execute the mutation
                } else {
                    setErrorPopup(true); // Show error popup if required fields are missing
                }
            }, 2000); // Wait for 2 seconds before proceeding
        }
    }, [uploadComplete]);

    const checkRequiredFields = (courseData) => {
        // Check if all required fields are present
        return (
            courseData.title &&
            courseData.shortTitle &&
            courseData.category &&
            courseData.price &&
            courseData.description &&
            courseData.courseDuration &&
            courseData.sections.length > 0 &&
            courseData.topics.length > 0
        );
    };

    const mutation = useMutation({
        mutationFn: (course) => newRequest.post('/courses', course),
        onSuccess: () => {
            queryClient.invalidateQueries(["myCourses"]);
            navigate('/myCourses');
        },
        onError: (error) => {
            console.error("Error creating course:", error.response?.data || error.message);
        }
    });

    const togglePop = async () => {
        console.log(errorPopup)
        setSeen(false);
        if (!uploading) {
            await handleUpload(files);
        } else {
            console.log("Currently uploading files, please wait.");
        }
    };

    const routeBack = () => {
        navigate('/create-course-content', { state: { courseState: state, files } });
    };

    const fileUrls = files.map(file => URL.createObjectURL(file));

    return (
        <div className='createCourseContent'>
            <div className="container">
                <h1> Review Course Content</h1>
                <div className="sections">
                    <div className="left">
                        {files.length === 0 ? (
                            <div className="courseImage">
                                <img src={"/images/ConnectEduLogo-bg.png"} alt="ConnectEdu Logo" />
                            </div>
                        ) : (
                            <SlideShow data={fileUrls} className='slider' />
                        )}
                        <h3>{courseState.title}</h3>
                        <div className="stars">
                            <img src="/images/star.png" alt="Star" />
                            <img src="/images/star.png" alt="Star" />
                            <img src="/images/star.png" alt="Star" />
                            <img src="/images/star.png" alt="Star" />
                            <img src="/images/star.png" alt="Star" />
                            <span> 5 </span>
                        </div>
                        <div className="details">
                            <div className="item">
                                <img src="/images/clock.png" alt="Clock" />
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
                            {courseState.topics && courseState.topics.map((topic, index) => (
                                <div className="item" key={index}>
                                    <img src="/images/greencheck.png" alt="Check" />
                                    <p>{topic.coverage}</p>
                                </div>
                            ))}
                        </div>
                        <div className="courseDescription">
                            <h2>Course Description</h2>
                            <p>{courseState.description}</p>
                        </div>
                        <CourseSection sectionState={courseState.sections} />
                        <div className="createCourseNav">
                            <button onClick={routeBack}> Back </button>
                            <button onClick={togglePop}> {uploading ? "Publishing..." : "Publish"} </button>
                        </div>
                    </div>
                    <div className="right">
                        <div className="items">
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="Check mark" />
                                <h3>Course Information </h3>
                            </div>
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="Check mark" />
                                <h3>Course Content</h3>
                            </div>
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="Check mark" />
                                <h3>Course Preview</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {seen ? <ConfirmationPopup toggle={togglePop} /> : null}
            {errorPopup && (
                <ConfirmationPopup toggle={togglePop} />
            )}
        </div>
    );
};

export default CreateCoursePreview;
