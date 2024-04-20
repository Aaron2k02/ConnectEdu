import React from 'react';
import './ProgressBar.scss'; // Import your CSS file for styling

const ProgressBar = ({ value, max }) => {
  const percentage = (30 / 60) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-value">{`${percentage.toFixed(2)}%`}</div>
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
