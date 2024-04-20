import React from 'react'
import "./CreateCourse.scss"

const CreateCourse = () => {
  return (
    <div className='create'>
      <div className="container">
        <h1>Create new Course</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="e.g. I will teach something I am really experienced at" />
            <select name="category" id="category"></select>
          </div>
          <div className="right">

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse