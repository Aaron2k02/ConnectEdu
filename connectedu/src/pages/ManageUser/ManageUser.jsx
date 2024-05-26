import React from 'react';
import './ManageUser.scss';
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const fetchUsers = async () => {
  const response = await newRequest.get('/users');
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await newRequest.delete(`/users/${userId}`);
  return response.data;
};

const ManageUser = () => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: users, error, isLoading } = useQuery({
    queryKey: ['users'], // Changed from 'users' to ['users']
    queryFn: fetchUsers,
  });

  console.log(users);

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']); // Changed from 'users' to ['users']
    },
  });

  const handleDelete = (userId) => {
    mutation.mutate(userId);
  };

  const routeUpdate = (userId) => {
    navigate(`/userForm/${userId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

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
              <th>Applied as Educator</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img src={user.photoUrl || 'default-avatar.png'} alt={user.username} />
                </td>
                <td>{user.username}</td>
                <td>{user.roleId === 1 ? 'Student' : user.roleId === 2 ? 'Educator' : 'Admin'}</td>
                <td>
                  <span className={user.educatorApplication ? 'Applied' : 'NotApplied'}>
                    {user.educatorApplication ? 'Applied' : 'Not Applied'}
                  </span>
                </td>
                <td>
                  <button className='update' onClick={() => routeUpdate(user._id)}> Update </button>
                </td>
                <td>
                  <button className='delete' onClick={() => handleDelete(user._id)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
