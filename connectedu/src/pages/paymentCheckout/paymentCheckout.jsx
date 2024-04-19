import React from "react"
import "./paymentCheckout.scss"

//components
import PayButton from "../../components/PayButton/PayButton"

// Create dummy data for the cartItems
const cartItems = [
    {id:1, name:"Mobile App Development",price: 150, cartQuantity: 1, image: "https://i.imgur.com/2xH1X44.png" ,desc: "Enhance your mobile app development skills with this comprehensive course!"},
];

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