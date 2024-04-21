import styled from "styled-components";

const CheckoutSuccess = () => {
  return (
    <Container>
      <h2>Payment Successful</h2>
      <p>Your purchased course available <a href="/myCourses">here</a> !</p>
    </Container>
  );
};
export default CheckoutSuccess;

const Container = styled.div`
  min-height: 50vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #388e3c;
  }
`;