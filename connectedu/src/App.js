import React from 'react';
// navigation of pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Course from './Components/Pages/Course';
import Dashboard from './Components/Pages/Dashboard';
import Invoices from './Components/Pages/Invoices';
import Notification from './Components/Pages/Notification';
import ProfilePage from './Components/Pages/ProfilePage';

import Sidebar from './Components/Navigation/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/course" element={<Course />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profilePage" element={<ProfilePage />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>

  );
}

export default App;
