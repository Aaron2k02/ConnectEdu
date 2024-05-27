import React, { useReducer, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "./createCourse.scss";
import { courseReducer, INITIAL_STATE } from '../../reducers/courseReducer';

const CreateCourse = () => {
  const [state, dispatch] = useReducer(courseReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateCourse, SetIsCreateCourse] = useState(true);
  const { courseState, files: prevFiles = [] } = location.state || {};

  const [files, setFiles] = useState(Array.from(prevFiles));

  useEffect(() => {
    if (courseState) {
      dispatch({ type: 'SET_STATE', payload: courseState });
    }
    if (prevFiles.length > 0) {
      setFiles(Array.from(prevFiles));
    }
  }, [courseState, prevFiles]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/create-course-content', { state: { courseState: state, files, isCreateCourse} });
  };

  const handleCancel = () => {
    navigate('/manageCourses');
  };

  return (
    <div className='createCourse'>
      <div className="container">
        <h1>Create new Course</h1>
        <form onSubmit={handleSubmit} className="sections">
          <div className="left">
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="courseThumbnail">Course Thumbnail</label>
                <input type="file" id="courseThumbnail" multiple onChange={handleFileChange} />
                <div className="thumbnails">
                  {files.length > 0 && files.map((file, index) => (
                    <div key={index} className="thumbnail">
                      <img src={URL.createObjectURL(file)} alt={`Thumbnail ${index}`} />
                      <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                    </div>
                  ))}
                </div>
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

            <div className="createCourseNav">
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
                <h3>Course Preview</h3>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
