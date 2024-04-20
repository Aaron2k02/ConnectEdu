import React from 'react'
import './ManageCourses.scss'
import { useNavigate } from 'react-router-dom';

const ManageCourses = () => {

    const CourseTitle = 'This is the course title for the connectEdu';

    let navigate = useNavigate();

    const createCourse = () => {
        let path = '/createCourse';
        navigate(path);
    }

    return (
        <div className='manageCourses'>
            <div className="container">
                <div className="title">
                    <h1> Manage Courses</h1>
                    <button onClick={createCourse}> Create New Course </button>
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

export default ManageCourses