import React from 'react';
import './ManageUser.scss';
import { useNavigate } from "react-router-dom";

const ManageUser = () => {

  let navigate = useNavigate();

  const routeUpdate = () => {
    let path = '/userForm';
    navigate(path);
  }

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
          <h1>Manage User</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Role</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src="" alt="" />
                </td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button className='update' onClick={routeUpdate}> Update </button>
                </td>
                <td>
                  <button className='delete'> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser;
