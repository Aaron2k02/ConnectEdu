import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Make sure to import NavLink
import { SidebarData } from '../../data/SidebarData';
import { FaBars } from 'react-icons/fa'; // Ensure you have this icon from react-icons

function Sidebar({ children }) { // Assuming isOpen and toggle are passed as props
 
  return (
      <div className="Sidebar">
          <ul className='SidebarList'>
            {SidebarData.map((val, key) => {
              return (
                <li key={key}
                  className='row'
                  id={window.location.pathname === val.link ? 'active' : ''}
                  onClick={() => { window.location.pathname = val.link }}>
                  {" "}
                  <div id='icon'>
                    {val.icon}
                  </div>
                  {" "}
                  <div id='title'>
                    {val.title}
                  </div>
                </li>
              )
            })}
          </ul >
        <main>{children}</main>
      </div>
  );
}

export default Sidebar;