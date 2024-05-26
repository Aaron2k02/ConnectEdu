import React, { useState } from 'react';
import './ManageClass.scss';
import FeedbackPopup from '../../components/feedbackPopup/FeedbackPopup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';

const ManageClass = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const togglePop = (course) => {
    setSelectedCourse(course);
    setPopupVisible(!popupVisible);
  };

  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: () => newRequest.get(`/courses/all`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: ({ courseId, approval }) => newRequest.put(`/courses/approval`, { courseId, Approval: approval }),
    onSuccess: () => {
      // Refetch the data to update the UI with the latest changes
      queryClient.invalidateQueries(['classes']);
    }
  });

  const handleCourseApproval = async (approval, classId) => {
    try {
      mutation.mutate({ courseId: classId, approval });
    } catch (err) {
      console.error(err);
    }
  };

  const viewCourse = (courseId) => {
    let path = `/viewCourse/${courseId}`;
    navigate(path);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div className='manageClass'>
      <div className="container">
        {popupVisible && (
          <FeedbackPopup
            course={selectedCourse}
            isAdmin={currentUser.roleId === 0}
            toggle={togglePop}
          />
        )}
        <div className="title">
          <h1> Manage Courses</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>Status</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classInfo, index) => (
              <tr key={index}>
                <td>
                  <img src={classInfo.thumbnailUrl[0] || "/images/ConnectEduLogo-bg.png"} alt="Class" />
                </td>
                <td>{classInfo.title}</td>
                <td>{classInfo.educatorId.username}</td>
                <td>
                  <span className={classInfo.isApproved ? "Approved" : "Pending"}>
                    {classInfo.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td>
                  <button className='view' onClick={() => viewCourse(classInfo._id)} >View</button>
                  {classInfo.isApproved ?
                    <button className='deny' onClick={() => handleCourseApproval(false, classInfo._id)}>Deny</button>
                    :
                    <button className='approve' onClick={() => handleCourseApproval(true, classInfo._id)}>Approve</button>
                  }
                  <button className='feedback' onClick={() => togglePop(classInfo)}>Feedback</button>
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
