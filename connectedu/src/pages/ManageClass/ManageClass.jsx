import React from 'react';
import './ManageClass.scss';
import { Link } from 'react-router-dom';

const ManageClass = () => {
  
  // Sample class data 
  const classes = [
    { courseName: "Intro to Programming", instructorName: "John Doe", status: "Pending" },
    { courseName: "Advanced Mathematics", instructorName: "Jane Smith", status: "Approved" },
    { courseName: "History of Art", instructorName: "Emily Johnson", status: "Pending" }
  ];

  const getStatusClassName = (status) => {
    return status === "Approved" ? "approved" : status === "Pending" ? "pending" : "";
  };

  return (
    <div className='manageClass'>
      <div className="container">
        <div className="title">
          <h1> Manage Courses</h1>
          <Link to='/add-class'>
            <button> Create New Course </button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classInfo, index) => (
              <tr key={index}>
                <td>
                  <img src="" alt="Class" />
                </td>
                <td>{classInfo.courseName}</td>
                <td>{classInfo.instructorName}</td>
                <td>
                  <button className={`status ${getStatusClassName(classInfo.status)}`}>
                    {classInfo.status}
                  </button>
                </td>
                <td>
                  <button className='approve'>Approve</button>
                  <button className='deny'>Deny</button>
                  <button className='feedback'>Feedback</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageClass;
