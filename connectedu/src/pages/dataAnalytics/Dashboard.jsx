import React from 'react';
import './Dashboard.scss';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getCurrentUser';

const StatCard = ({ icon, label, count }) => (
  <div className="stat-card">
    <div className="icon">{icon}</div>
    <div className="text-content">
      <div className="label">{label}</div>
      <div className="count">{count}</div>
    </div>
  </div>
);

const currentUser = getCurrentUser();

const fetchUserCounts = async () => {
  const response = await newRequest.get('/users');
  return response.data;
};

const fetchCourseCounts = async () => {
  const response = await newRequest.get('/courses/counts');
  return response.data;
};

const Dashboard = () => {
  const {
    data: userCounts,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ['userCounts'],
    queryFn: fetchUserCounts,
  });

  const {
    data: courseCounts,
    error: courseError,
    isLoading: courseLoading,
  } = useQuery({
    queryKey: ['courseCounts'],
    queryFn: fetchCourseCounts,
  });

  if (userLoading || courseLoading) return <div>Loading...</div>;
  if (userError || courseError) return <div>Error loading data</div>;

  const icons = {
    user: '👥',
    courses: '🎓',
    educators: '🧑‍🏫',
    pending: '⏳',
    application: '🎒',
  };

  return (
    <div className="dashboard-container">
      <h1>Hi, <span>{currentUser.username}</span> Welcome To Your Dashboard</h1>
      <div className="dashboard-stats">
        <StatCard icon={icons.user} label="Total Users" count={userCounts.totalUsers} />
        <StatCard icon={icons.courses} label="Approved Courses" count={courseCounts.approvedCourses} />
        <StatCard icon={icons.educators} label="Educators" count={userCounts.educators} />
        <StatCard icon={icons.pending} label="Pending Courses" count={courseCounts.pendingCourses} />
        <StatCard icon={icons.application} label="Pending Applications" count={userCounts.pendingApplications} />
      </div>
      <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
    </div>
  );
};

export default Dashboard;
