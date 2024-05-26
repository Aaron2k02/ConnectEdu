import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import "./Notifications.scss";
import QuestionAnswerPopupForm from "../../components/questionAnswerPopupForm/QuestionAnswerPopupForm";
import newRequest from "../../utils/newRequest";

const Notifications = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupNotificationId, setPopupNotificationId] = useState(null);
  const [questionData, setQuestionData] = useState(null);

  const { data: questions, isFetching, error } = useQuery({
    queryKey: ['fetchQuestions'],
    queryFn: async () => {
      const res = await newRequest.get('/questionAnswer');
      return res.data;
    },
  });

  const togglePop = async (questionId) => {
    if (!popupVisible) {
      const res = await newRequest.get(`/questionAnswer/${questionId}/answer`);
      setQuestionData(res.data);
    }
    setPopupNotificationId(questionId);
    setPopupVisible(!popupVisible);
  };

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  // Enhance sorting logic
  const sortedQuestions = [...questions].sort((a, b) => {
    const aUpdated = new Date(a.updatedAt).getTime();
    const aAnswerUpdated = a.answerId ? new Date(a.answerId.updatedAt).getTime() : 0;
    const bUpdated = new Date(b.updatedAt).getTime();
    const bAnswerUpdated = b.answerId ? new Date(b.answerId.updatedAt).getTime() : 0;
    return Math.max(bUpdated, bAnswerUpdated) - Math.max(aUpdated, aAnswerUpdated);
  });

  return (
    <div className="notifications">
      <div className="container">
        <div className="title">
          <h1>Notifications</h1>
        </div>
        {popupVisible && (
          <QuestionAnswerPopupForm
            questionId={popupNotificationId}
            questionData={questionData}
            currentUser={currentUser}
            toggle={() => togglePop(popupNotificationId)}
          />
        )}
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Course</th>
              <th>Question</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {sortedQuestions.map((question) => {
              const isAsker = currentUser._id === question.askerId._id;
              const isResponder = currentUser._id === question.answerId?.responderId;
              const buttonLabel = isResponder && new Date(question.updatedAt).getTime() === new Date(question.answerId?.updatedAt).getTime()
                ? "Answer"
                : "Edit";

              const displayDate = new Date(Math.max(new Date(question.updatedAt), new Date(question.answerId?.updatedAt || 0))).toLocaleDateString();

              return (
                <tr key={question._id}>
                  <td>{isAsker ? "My Question" : `Question from ${question.askerId.username}`}</td>
                  <td>{question.courseId.title}</td>
                  <td>{question.content}</td>
                  <td>{displayDate}</td>
                  <td>
                    <button onClick={() => togglePop(question._id)}>
                      {isAsker ? "View" : buttonLabel}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
