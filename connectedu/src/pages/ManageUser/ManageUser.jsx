import React from 'react';
import './ManageUser.scss';
import { Link } from 'react-router-dom';

const ManageUser = () => {
  
  // Sample data 
  const users = [
    { name: "Alice Johnson", role: "Student" },
    { name: "Bob Smith", role: "Instructor" },
    { name: "Charlie Brown", role: "Admin" }
  ];

  return (
    <div className='manageUser'>
      <div className="container">
        <div className="title">
          <h1> Manage Users</h1>
          <Link to='/add-user'>
            <button> Add New User </button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <img src="" alt="User" />
              </td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button className='update'>Update</button>
              </td>
              <td>
                <button className='delete'>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default ManageUser;

