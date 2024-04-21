import "./checkoutSuccess.scss"

const CheckoutSuccess = () => {
  return (
    <div className="card">
      <div className="checkmark">✓</div>
      <h1>Payment Successful!</h1>
      <p>We received your payment. <br /> Your purchased course are available <a href="/myCourses">here</a>!</p>
    </div>

  );
};

export default CheckoutSuccess;