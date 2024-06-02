import React, { useReducer, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateCourseInfo.scss';
import { courseReducer, INITIAL_STATE } from '../../reducers/courseReducer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const UpdateCourseInfo = () => {
    const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
    const { courseId } = useParams();
    const [files, setFiles] = useState([]);
    const [removedThumbnails, setRemovedThumbnails] = useState([]);
    const navigate = useNavigate();
    const [isCreateCourse, SetIsCreateCourse] = useState(false);
    const queryClient = useQueryClient();

    const { data: courseData, isLoading, error } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => newRequest.get(`/courses/single/${courseId}`).then((res) => res.data),
    });

    useEffect(() => {
        let timeout;

        if (courseData) {
            const sectionsData = courseData.sections.map(section => ({
                sectionTitle: section.title,
                videoTitle: section.videoTitle,
                videoUrl: section.url,
                videoDescription: section.description,
                videoDuration: section.durationMinutes
            }));

            const transformedData = {
                ...courseData.course,
                sections: sectionsData,
                topics: courseData.course.topics.map(topic => ({ coverage: topic })), // Transform topics array
                thumbnailUrl: courseData.course.thumbnailUrl || []
            };

            timeout = setTimeout(() => {
                dispatch({ type: 'SET_STATE', payload: transformedData });
                setFiles([]); // Clear files, we will handle thumbnails separately
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [courseData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name, value },
        });
    };

    const handleCoverageChange = (e, index) => {
        dispatch({
            type: "CHANGE_TOPIC",
            payload: { index, value: e.target.value },
        });
    };

    const handleCoverageAdd = () => {
        dispatch({ type: "ADD_TOPIC" });
    };

    const handleCoverageRemove = (index) => {
        dispatch({
            type: "REMOVE_TOPIC",
            payload: index,
        });
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleRemoveExistingThumbnail = (index) => {
        const updatedThumbnails = [...state.thumbnailUrl];
        const removedThumbnail = updatedThumbnails.splice(index, 1);
        setRemovedThumbnails((prev) => [...prev, ...removedThumbnail]);

        dispatch({
            type: "SET_THUMBNAIL_URL",
            payload: updatedThumbnails,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass removedThumbnails along with the other state
        navigate('/create-course-content', { state: { courseState: state, files, removedThumbnails, isCreateCourse } });
    };

    const handleCancel = () => {
        console.log(state.topics);
    };

    const topics = [...state.topics];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong!</div>;

    return (
        <div className='updateCourseInfo'>
            <div className="container">
                <h1>Update Course</h1>
                <form onSubmit={handleSubmit} className="sections">
                    <div className="left">
                        <div className="images">
                            <div className="imagesInputs">
                                <label htmlFor="courseThumbnail">Upload New Thumbnail</label>
                                <input type="file" id="courseThumbnail" multiple onChange={handleFileChange} />
                            </div>
                            <div className="thumbnails">
                                {files.length > 0 && files.map((file, index) => (
                                    <div key={index} className="thumbnail">
                                        <img src={URL.createObjectURL(file)} alt={`Thumbnail ${index}`} />
                                        <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            <div className="existingImages">
                                {state.thumbnailUrl && state.thumbnailUrl.map((url, index) => (
                                    <div key={index} className="thumbnail">
                                        <img src={url} alt={`Thumbnail ${index}`} />
                                        <button type="button" onClick={() => handleRemoveExistingThumbnail(index)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label htmlFor="courseTitle">Title</label>
                        <input type="text" id="courseTitle" name="title" value={state.title} onChange={handleInputChange} placeholder="e.g. I will teach something I am really experienced at" />

                        <label htmlFor="shortTitle">Short Title</label>
                        <input type="text" id="shortTitle" name="shortTitle" value={state.shortTitle} onChange={handleInputChange} placeholder="e.g. Quick React Course" />

                        <label htmlFor="categories">Category</label>
                        <select name="category" id="categories" value={state.category} onChange={handleInputChange}>
                            <option value="UI UX Design">UI UX Design</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                        </select>

                        <label htmlFor="courseDuration">Total Course Duration (e.g. 10 hours)</label>
                        <input type="number" id="courseDuration" name="courseDuration" min={1} value={state.courseDuration} onChange={handleInputChange} />

                        <label htmlFor="coursePrice">Course Price</label>
                        <input type="number" id="coursePrice" name="price" min={1} value={state.price} onChange={handleInputChange} />

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="description"
                            cols="30"
                            rows="16"
                            value={state.description}
                            onChange={handleInputChange}
                            placeholder='Brief Description to introduce your course'
                        ></textarea>

                        <div className="courseCoverage">
                            <div className="form-field">
                                <h3>What will be the topic of this course</h3>
                                {state.topics.map((topic, index) => (
                                    <div className="coverages" key={index}>
                                        <div className="first-section">
                                            <input
                                                type="text"
                                                value={topic.coverage}
                                                onChange={(e) => handleCoverageChange(e, index)}
                                                placeholder='e.g. Learning React'
                                            />
                                            {state.topics.length > 1 && (
                                                <button
                                                    type='button'
                                                    onClick={() => handleCoverageRemove(index)}
                                                    className='remove-btn'
                                                >
                                                    <span>Remove</span>
                                                </button>
                                            )}
                                        </div>
                                        <div className="second-division">
                                            {state.topics.length - 1 === index && state.topics.length < 4 && (
                                                <button
                                                    type='button'
                                                    onClick={handleCoverageAdd}
                                                    className='add-btn'
                                                >
                                                    <span>Add Topic</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="UpdateCourseInfoNav">
                            <button type="button" className='cancel-btn' onClick={handleCancel}> Cancel </button>
                            <button type="submit"> Next </button>
                        </div>
                    </div>
                    <div className="right">
                        <div className="items">
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3>Course Information</h3>
                            </div>
                            <div className="item">
                                <img src={'/images/empty-check-mark.png'} alt="" />
                                <h3>Course Content</h3>
                            </div>
                            <div className="item">
                                <img src={'/images/empty-check-mark.png'} alt="" />
                                <h3>Course Price</h3>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCourseInfo;
