import React from 'react'
import { useState } from "react";
import "./UserForm.scss";
import { useNavigate } from "react-router-dom";

const UserForm = () => {

    let navigate = useNavigate();

    const routeConfirm = () => {
        let path = '/ManageUser';
        navigate(path);
    }

    const routeBack = () => {
        let path = '/ManageUser';
        navigate(path);
    }

    const [activeRole, setActiveRole] = useState(""); // State to track active role

    const handleClick = (role) => {
        setActiveRole(role); // Set active role when button is clicked
    };

    return (
        <div className='userForm'>
            <div className="container">
                <h1>Update User Info</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="userName">Name</label>
                        <input type="text" id="userName" placeholder="e.g user name" autoComplete="off" />
                        <label htmlFor="specialization">Specialization</label>
                        <select name="specialization" id="specialization" autoComplete="off">
                            <option value="UI UX Design">UI UX Design</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                        </select>
                    </div>
                    <div className="right">
                        <label htmlFor="userEmail">Email</label>
                        <input type="text" id="userEmail" placeholder="e.g cheron@gmail.com" autoComplete="off" />
                        <label htmlFor="userPhotoUrl">Photo URL</label>
                        <input type="text" id="userPhotoUrl" autoComplete="off" />
                    </div>
                </div>
                <div className="bottom">
                    <label htmlFor="userPhotoUrl">Please select a Role</label>
                    <div className="userRole">
                        <button
                            className={activeRole === "User" ? "active" : ""}
                            onClick={() => handleClick("User")}
                        >
                            User
                        </button>
                        <button
                            className={activeRole === "Educator" ? "active" : ""}
                            onClick={() => handleClick("Educator")}
                        >
                            Educator
                        </button>
                        <button
                            className={activeRole === "Admin" ? "active" : ""}
                            onClick={() => handleClick("Admin")}
                        >
                            Admin
                        </button>
                    </div>
                    <div className="userFormNav">
                        <button className='cancel-btn' onClick={routeBack}> Cancel </button>
                        <button className='confirm-btn' onClick={routeConfirm}> Confirm </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm