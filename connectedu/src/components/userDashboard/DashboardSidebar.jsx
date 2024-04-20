import React, { useState } from "react";
import './DashboardSidebar.scss'
import { Link } from 'react-router-dom';

const DashboardSidebar = ({ activePage }) => {
  const [selected, setSelected] = useState(0);

  const inputs = [
    {
      label:'Dashboard',
      icon:'',
      page:'MainDashboard',
    },
    {
      label:'Learning',
      icon:'',
      page:'MyLearning',
    }
  ];

  return (
    <div className='DashboardSidebar'>
      {inputs.map((input, index) => (
        activePage === input.page ? (
          <div className={selected === index ? "s2 active" : "s2"} key={index} onClick={() => setSelected(index)}>
            <span>{input.label}</span>
          </div>
        ) : (
          <Link
            to={`/dashboard/${input.page}`}
            className='link'
            key={index}
          >
            <div className={selected === index ? "s2 active" : "s2"} onClick={() => setSelected(index)}>
              <span>{input.label}</span>
            </div>
          </Link>
        )
      ))}
    </div>
  );
}

export default DashboardSidebar;
