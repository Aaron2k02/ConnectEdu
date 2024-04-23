import React from 'react';
import './Dashboard.scss';

const StatCard = ({ icon, label, count }) => {
  return (
    <div className="stat-card">
      <div className="icon">{icon}</div>
      <div className="text-content">
        <div className="label">{label}</div>
        <div className="count">{count}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const icons = {
    user: '👥', 
    courses: '🎓',
    educators: '🧑‍🏫',
    pending: '⏳',
    application: '🎒'
  };

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-title">My Dashboard</h1> */}
      <h1>Hi, <span> UserName </span> Welcome To Your Dashboard </h1>
      <div className="dashboard-stats">
        <StatCard icon={icons.user} label="Total Users" count={16} />
        <StatCard icon={icons.courses} label="Approved Courses" count={6} />
        <StatCard icon={icons.educators} label="Educators" count={1} />
        <StatCard icon={icons.pending} label="Pending Courses" count={0} />
        <StatCard icon={icons.application} label="Pending Applications" count={2} />
      </div>
      <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
    </div>
  );
};

export default Dashboard;
