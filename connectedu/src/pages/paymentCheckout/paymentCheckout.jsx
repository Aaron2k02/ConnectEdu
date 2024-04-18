import React from "react"
import "./paymentCheckout.scss"

//components
import PayButton from "../../components/PayButton/PayButton"

const paymentCheckout = () => {
    return (
        <div className="paymentCheckout">
            <div className="container">
                <PayButton />
            </div>
        </div>
    )
}

export default paymentCheckout;