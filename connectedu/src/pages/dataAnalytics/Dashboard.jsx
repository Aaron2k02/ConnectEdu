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
    member: '👥', 
    class: '🎓',
    instructor: '🧑‍🏫',
    pending: '⏳'
  };

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-title">My Dashboard</h1> */}
      <h1>Hi, <span> UserName </span> Welcome To Your Dashboard </h1>
      <div className="dashboard-stats">
        <StatCard icon={icons.member} label="Total Member" count={16} />
        <StatCard icon={icons.class} label="Approved Class" count={6} />
        <StatCard icon={icons.instructor} label="Instructors" count={1} />
        <StatCard icon={icons.pending} label="Pending Class" count={0} />
      </div>
      <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
    </div>
  );
};

export default Dashboard;
