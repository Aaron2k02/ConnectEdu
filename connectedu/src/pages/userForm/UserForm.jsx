import React, { useState, useEffect } from 'react';
import './UserForm.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const UserForm = ({ isAdmin }) => {
    let navigate = useNavigate();
    const { userId } = useParams();
    const queryClient = useQueryClient();

    const fetchUser = async (userId) => {
        const response = await newRequest.get(`/users/${userId}`);
        return response.data;
    };

    const updateUserRole = async ({ userId, newRoleId }) => {
        const response = await newRequest.put(`/users/updateRole`, { userId, newRoleId });
        return response.data;
    };

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
    });

    const roleMutation = useMutation({
        mutationFn: updateUserRole,
        onSuccess: () => {
            navigate('/ManageUser');
            queryClient.invalidateQueries(['user', userId]);
        },
    });

    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        specialization: '',
    });

    useEffect(() => {
        if (userData) {
            setUser(userData.user);
            setFormData({
                specialization: userData.userProfile.specialization || '',
            });
        }
    }, [userData]);

    const handleRoleChange = (role) => {
        setUser({ ...user, roleId: role });
    };

    const handleSubmit = () => {
        roleMutation.mutate({ userId: user._id, newRoleId: user.roleId });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    return (
        <div className='userForm'>
            <div className="container">
                <h1>Update User Info</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="username">Name</label>
                        <input type="text" id="username" value={user.username} disabled placeholder="e.g user name" autoComplete="off" />
                        <label htmlFor="specialization">Specialization</label>
                        <input type="text" id="specialization" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} placeholder="e.g specialization" autoComplete="off" />
                    </div>
                    <div className="right">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={user.email} disabled placeholder="e.g cheron@gmail.com" autoComplete="off" />
                        <label htmlFor="photoUrl">Photo URL</label>
                        <input type="text" id="photoUrl" value={user.photoUrl || ''} disabled autoComplete="off" />
                    </div>
                </div>
                <div className="bottom">
                    <label>Please select a Role</label>
                    <div className="userRole">
                        <button className={user.roleId === 1 ? "active" : ""} onClick={() => handleRoleChange(1)}> User </button>
                        <button className={user.roleId === 2 ? "active" : ""} onClick={() => handleRoleChange(2)}> Educator </button>
                        <button className={user.roleId === 3 ? "active" : ""} onClick={() => handleRoleChange(3)}> Admin </button>
                    </div>
                    <label htmlFor="educationalBackground">Educational Background</label>
                    <input type="text" id="educationalBackground" value={userData.userProfile.educationalBackground || "No educational background provided"} disabled placeholder="e.g Experience in teaching" autoComplete="off" />
                    <label htmlFor="professionalExperience">Professional Experience</label>
                    <input type="text" id="professionalExperience" value={userData.userProfile.professionalExperience || "No professional experience provided"} disabled placeholder="e.g Experience in educating" autoComplete="off" />
                    <label htmlFor="skillsAndQualifications">Skills and Qualifications</label>
                    <input type="text" id="skillsAndQualifications" value={userData.userProfile.skillsAndQualifications || "No skills and qualifications provided"} disabled placeholder="e.g Experience in educating" autoComplete="off" />
                    <div className="userFormNav">
                        <button className='cancel-btn' onClick={() => navigate('/ManageUser')}> Cancel </button>
                        <button className='confirm-btn' onClick={handleSubmit}> Confirm </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
