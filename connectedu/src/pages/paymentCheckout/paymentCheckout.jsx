import React from "react"
import "./paymentCheckout.scss"

//components
import PayButton from "../../components/PayButton/PayButton"

// Create dummy data for the cartItems
const cartItems = [
    {id:1, name:"Product 1",price: 10},
]

// Define the cart object
const cart = {cartItems};

const paymentCheckout = () => {
    return (
        <div className="paymentCheckout">
            <div className="container">
                <PayButton cartItems ={cart.cartItems} />
            </div>
        </div>
    )
}

export default paymentCheckout;