import React from 'react'
import './mycourse.scss'
import { Link } from 'react-router-dom';

const MyCourse = () => {

  const CourseTitle = 'This is the course title for the connectEdu';
  
  return (
    <div className='myCourse'>
      <div className="container">
        <div className="title">
          <h1> My Courses</h1>
          <Link to='/add'>
            <button> Create New Course </button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td className='courseTitle'>
              {CourseTitle.length > 30 ? CourseTitle.substring(0, 30) + '...' : CourseTitle}
            </td>
            <td> 50 </td>
            <td> 123 </td>
            <td>
              <button className='update'>Update</button>
            </td>
            <td>
              <button className='delete'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td> 
              {CourseTitle.length > 30 ? CourseTitle.substring(0, 30) + '...' : CourseTitle}
            </td>
            <td> 50 </td>
            <td> 123 </td>
            <td>
              <button className='update'>Update</button>
            </td>
            <td>
              <button className='delete'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td>
              {CourseTitle.length > 30 ? CourseTitle.substring(0, 30) + '...' : CourseTitle}
            </td>
            <td> 50 </td>
            <td> 123 </td>
            <td>
              <button className='update'>Update</button>
            </td>
            <td>
              <button className='delete'>Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default MyCourse