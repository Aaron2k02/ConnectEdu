import React from 'react'
import { useState } from "react";
import "./CreateCourse.scss";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {

  const [coverageList, setCoverageList] = useState([{ coverage: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...coverageList];
    list[index][name] = value;
    setCoverageList(list);
  }

  const handleInputAdd = () => {
    setCoverageList([...coverageList, { coverage: "" }]);
  };

  const handleInputRemove = (index) => {
    const list = [...coverageList];
    list.splice(index, 1);
    setCoverageList(list);
  };

  let navigate = useNavigate();

  const routeNext = () => {
    let path = '/create-course-content';
    navigate(path);
  }

  const routeCancel = () => {
    let path = '/myCourse';
    navigate(path);
  }

  return (
    <div className='createCourse'>
      <div className="container">
        <h1>Create new Course</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="courseThumbnail">Course Thumbnail</label>
            <input type="file" id="courseThumbnail" />
            <label htmlFor="courseTitle">Title</label>
            <input type="text" id="courseTitle" placeholder="e.g. I will teach something I am really experienced at" />
            <label htmlFor="categories">Category</label>
            <select name="categories" id="categories">
              <option value="UI UX Design">UI UX Design</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
            <label htmlFor="courseDuration">Total Course Duration (e.g. 10 hours)</label>
            <input type="number" id="courseDuration" min={1} />
            <label htmlFor="coursePrice">Course Price</label>
            <input type="number" id="coursePrice" min={1} />
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              cols="30"
              rows="16"
              placeholder='Brief Description to introduce your course'
            ></textarea>
            <form id="courseCoverageForm" className="courseCoverage" autoComplete="off">
              <div className="form-field">
                <h3>What will the course cover</h3>
                {coverageList.map((coverageItem, index) => (
                  <div className="coverages" key={index}>
                    <div className="first-section">
                      <input
                        type="text"
                        id={`coverage${index}`} // Ensure each input has a unique id
                        value={coverageItem.coverage}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                        placeholder='e.g. Learning React'
                      />
                      {coverageList.length !== 1 && (
                        <button
                          type='button'
                          onClick={() => handleInputRemove(index)}
                          className='remove-btn'
                        >
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                    <div className="second-division">
                      {coverageList.length - 1 === index && coverageList.length < 4 && (
                        <button
                          type='button'
                          onClick={handleInputAdd}
                          className='add-btn'
                        >
                          <span>Add a coverage </span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {/* <div className="testOutput">
                  <h2>Output</h2>
                  {
                    coverageList && 
                    coverageList.map((singleCoverage, index) => (
                      <ul key={index}>
                        {singleCoverage.coverage && <li>{singleCoverage.coverage}</li>}
                      </ul>
                    ))}
                </div> */}
              </div>
            </form>
            <div className="createCourseNav">
              <button className='cancel-btn' onClick={routeCancel}> Cancel </button>
              <button onClick={routeNext}> Next </button>
            </div>
          </div>
          <div className="right">
            <div className="items">
              <div className="item">
                <img src={'/images/fill-check-mark.png'} alt="" />
                <h3 htmlFor="">Course Information </h3>
              </div>
              <div className="item">
                <img src={'/images/empty-check-mark.png'} alt="" />
                <h3 htmlFor="">Course Content</h3>
              </div>
              <div className="item">
                <img src={'/images/empty-check-mark.png'} alt="" />
                <h3 htmlFor="">Course Preview</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse