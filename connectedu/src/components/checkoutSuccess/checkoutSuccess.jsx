import { useLocation } from "react-router-dom";
import styled from "styled-components";
import newRequest from "../../utils/newRequest";
import { useState } from "react";

const CheckoutSuccess = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmOrder = async () => {
    try {
      console.log("Sending request to confirm order with payment_intent:", payment_intent);
      await newRequest.put("/orders", { payment_intent });
      setIsConfirmed(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewCourses = () => {
    handleConfirmOrder();
    window.location.href = "/myCourses";
  };

  return (
    <Container>
      <MessageBox>
        <h2>Payment Successful!</h2>
        <p>Your purchased courses are now available.</p>
        <Button onClick={handleViewCourses}>View My Courses</Button>
      </MessageBox>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
    min-height: 50vh;
    max-width: none;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fcffe7;
    h2 {
        margin-bottom: 0.5rem;
        color: #388e3c;
    }
`;

const MessageBox = styled.div`
    min-height: 10vh;
    min-width: none;
    background-color: #2b3467;
    color: #fcffe7;
    padding: 20px;
    border-radius: 13px;
    text-align: center;
    h2 {
        margin-bottom: 0.5rem;
        color: #52b963;
    }
`;

const Button = styled.button`
    display: inline-block;
    margin-top: 2rem;
    padding: 7px 24px;
    color: #fcffe7;
    background-color: inherit;
    border: none;
    border-radius: 100px;
    box-shadow: 0 0 0 2px #54ac68;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    text-decoration: none;
    &:hover {
        background-color: #52b963;
    }
`;
