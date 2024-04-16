import React from "react";
import { Link } from "react-router-dom";
import "./Notifications.scss";

const Notifications = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isEducator: true,
  };

  const notification = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  return (
    <div className="notifications">
      <div className="container">
        <div className="title">
          <h1>Notifications</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser.isEducator ? "Educator" : "Student"}</th>
            <th>Last notification</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="unread">
            <td>Charley Sharp</td>
            <td>
              <Link to="/notification/123" className="link">
                {notification.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr className="unread">
            <td>John Doe</td>
            <td>
              <Link to="/notification/123" className="link">
                {notification.substring(0, 100)}...
              </Link>
            </td>
            <td>2 hours ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr className="read">
            <td>Elinor Good</td>
            <td>
              <Link to="/notification/123" className="link">
                {notification.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
          </tr>
          <tr className="read">
            <td>Garner David </td>
            <td>
              <Link to="/notification/123" className="link">
                {notification.substring(0, 100)}...
              </Link>
            </td>
            <td>2 days ago</td>
          </tr>
          <tr className="read">
            <td>Troy Oliver</td>
            <td>
              <Link to="/notification/123" className="link">
                {notification.substring(0, 100)}
              </Link>
            </td>
            <td>1 week ago</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Notifications;