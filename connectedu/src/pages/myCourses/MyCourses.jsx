import React from 'react'
import './MyCourses.scss'
import { useNavigate } from 'react-router-dom';

const MyCourse = () => {

  const CourseTitle = 'This is the course title for the connectEdu';

  let navigate = useNavigate();

  const viewCourse = () => {
    let path = '/viewCourse';
    navigate(path);
  }

  return (
    <div className='myCourses'>
      <div className="container">
        <div className="title">
          <h1> My Learning </h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td className='courseTitle'>
              {CourseTitle.length > 30 ? CourseTitle.substring(0, 100) + '...' : CourseTitle}
            </td>
            <td> 50 </td>
            <td>
              <button className='continue' onClick={viewCourse}>Continue Learning</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td> 
              {CourseTitle.length > 30 ? CourseTitle.substring(0, 100) + '...' : CourseTitle}
            </td>
            <td> 50 </td>
            <td>
              <button className='continue' onClick={viewCourse}>Continue Learning</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td>
              {CourseTitle.length > 30 ? CourseTitle.substring(0, 100) + '...' : CourseTitle}
            </td>
            <td> 50 </td>
            <td>
              <button className='continue' onClick={viewCourse}>Continue Learning</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default MyCourse