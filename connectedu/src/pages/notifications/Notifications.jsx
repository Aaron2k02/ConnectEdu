import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Notifications.scss";
import { useState } from 'react'
import QuestionAnswerPopupForm from "../../components/questionAnswerPopupForm/QuestionAnswerPopupForm";

const Notifications = () => {

  // Function to check if the user has answered the question for a notification
  const hasAnswered = (notificationId) => {
    // logic created to determine if the user has answered the question
    // we can check if there is an existing answer for the notificationId
    return false; // Placeholder logic, replace with actual implementation in the code backend
  };

  const navigate = useNavigate();

  function toTransactionHistory(e) {
    e.preventDefault();
    navigate('/myPurchase');
  }

  const navigateToCourse = () => {
    navigate('/course/123'); // Replace '123' with the appropriate course ID
  }

  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  };

  const [link, setLink] = useState(false);

  function navigateLink() {
    setLink(true); // Set link to true to trigger the navigation
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
                  {/* Render different actions based on notification type */}
                  {notification.type === "Question" && (
                    <>
                      <button onClick={togglePop}>
                        {hasAnswered(notification.id) ? "Edit" : "Answer"}
                      </button>
                      {seen && <QuestionAnswerPopupForm toggle={togglePop} />}
                    </>
                  )}
                  {notification.type === "Rating" && (
                    <>
                      <button onClick={navigateToCourse}>View Rating</button>
                    </>
                  )}
                  {notification.type === "Transaction" && (
                    <button onClick={toTransactionHistory}>View Transaction</button>
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
