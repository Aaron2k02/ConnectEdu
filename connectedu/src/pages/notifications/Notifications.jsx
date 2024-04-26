import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.scss";
import QuestionAnswerPopupForm from "../../components/questionAnswerPopupForm/QuestionAnswerPopupForm";

const Notifications = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupNotificationId, setPopupNotificationId] = useState(null);

  function toTransactionHistory(e) {
    e.preventDefault();
    navigate('/myPurchase');
  }

  const navigateToCourse = () => {
    navigate('/course/123'); // Replace '123' with the appropriate course ID
  }

  const togglePop = (notificationId) => {
    setPopupNotificationId(notificationId);
    setPopupVisible(!popupVisible);
  };

  const hasAnswered = (notificationId) => {
    // Placeholder logic, replace with actual implementation in the code backend
    return false;
  };

  const notifications = [
    {
      id: 1,
      type: "Question",
      sender: "Alice",
      content: "Can you provide more details about Module 2?",
      date: "2 hours ago",
    },
    {
      id: 2,
      type: "Rating",
      sender: "Bob",
      content: "You received a 5-star rating for 'Introduction to React'!",
      date: "1 day ago",
    },
    {
      id: 3,
      type: "Transaction",
      sender: "System",
      content: "You earned $50 from a course sale.",
      date: "3 days ago",
    },
    {
      id: 4,
      type: "Question",
      sender: "Charlie",
      content: "What is the deadline for the assignment?",
      date: "4 days ago",
    },
    {
      id: 5,
      type: "Rating",
      sender: "Dave",
      content: "You received a 4-star rating for 'Advanced JavaScript'!",
      date: "5 days ago",
    },
  ];

  return (
    <div className="notifications">
      <div className="container">
        <div className="title">
          <h1>Notifications</h1>
        </div>
        {popupVisible && (
          <QuestionAnswerPopupForm
            toggle={() => togglePop(popupNotificationId)}
          />
        )}
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Sender</th>
              <th>Content</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.type}</td>
                <td>{notification.sender}</td>
                <td>{notification.content}</td>
                <td>{notification.date}</td>
                <td>
                  {notification.type === "Question" && (
                    <button onClick={() => togglePop(notification.id)}>
                      {hasAnswered(notification.id) ? "Edit" : "Answer"}
                    </button>
                  )}
                  {notification.type === "Rating" && (
                    <button onClick={navigateToCourse}>View Rating</button>
                  )}
                  {notification.type === "Transaction" && (
                    <button onClick={toTransactionHistory}>
                      View Transaction
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
