import React, { useState } from 'react';
import './ManageCourses.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import FeedbackPopup from '../../components/feedbackPopup/FeedbackPopup';

const ManageCourses = () => {
    let navigate = useNavigate();
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const createCourse = () => {
        let path = '/createCourse';
        navigate(path);
    }

    const togglePop = (course) => {
        setSelectedCourse(course);
        setPopupVisible(!popupVisible);
    };

    const currentUser = getCurrentUser();
    const queryClient = useQueryClient();

    const coursesQuery = useQuery({
        queryKey: ["myCourses"],
        queryFn: () => newRequest.get('/courses/myCourses').then((res) => res.data),
        enabled: !!currentUser._id,
    });

    const mutation = useMutation({
        mutationFn: (id) => newRequest.delete(`/courses/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["myCourses"]);
        }
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    }

    return (
        <div className='manageCourses'>
            {coursesQuery.isFetching ? "Loading..." :
                coursesQuery.error ? "Error loading courses" :
                    <div className="container">
                        {popupVisible && (
                            <FeedbackPopup
                                course={selectedCourse}
                                isAdmin={currentUser.roleId === 0}
                                toggle={togglePop}
                            />
                        )}
                        <div className="title">
                            <h1>Manage Courses</h1>
                            <button onClick={createCourse}>Create New Course</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Sales</th>
                                    <th>Status</th>
                                    <th>Feedback</th>
                                    <th>Update</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesQuery.data && coursesQuery.data.length > 0 ? (
                                    coursesQuery.data.map((course) => (
                                        <tr key={course._id}>
                                            <td>
                                                <img className="image" src={course.thumbnailUrl[0]} alt="" />
                                            </td>
                                            <td className='courseTitle'>
                                                {course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title}
                                            </td>
                                            <td>RM {course.price}</td>
                                            <td>{course.totalSales}</td>
                                            <td>
                                                {course.isApproved ? "Approved" : "Pending"}
                                            </td>
                                            <td>
                                                <button className='feedback' onClick={() => togglePop(course)}>Feedback</button>
                                            </td>
                                            <td>
                                                <button className='update' onClick={() => navigate(`/updateCourse/${course._id}`)}>Update</button>
                                            </td>
                                            <td>
                                                <button className='delete' onClick={() => handleDelete(course._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No courses found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
}

export default ManageCourses;
