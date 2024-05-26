import React, { useEffect, useState } from "react";
import axios from "axios";
import "./paymentCheckout.scss"
import { url } from "../../slices/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//components
import PayButton from "../../components/PayButton/PayButton"

// // Create dummy data for the cartItems
// const cartItems = [
//     { id: 1, name: "Mobile App Development", price: 150, cartQuantity: 1, image: "https://i.imgur.com/2xH1X44.png", desc: "Enhance your mobile app development skills with this comprehensive course!" },
// ];

// // Define the cart object
// const cart = { cartItems };

// const paymentCheckout = ({ courseData }) => {
//     return (
//         <div className="paymentCheckout">
//             <div className="container">
//                 <PayButton cartItems={courseData} />
//             </div>
//         </div>
//     )
// }

const PaymentCheckout = ({ courseData }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [isCourseBought, setIsCourseBought] = useState(false);

    useEffect(() => {
        // Check if the user has already bought the course
        axios.get(`${url}/user/courses/${currentUser._id}`)
            .then((res) => {
                const boughtCourses = res.data.courses;
                if (boughtCourses.some(course => course._id === courseData._id)) {
                    setIsCourseBought(true);
                    toast.info('You have already bought this course.');
                }
            })
            .catch((err) => console.log(err.message));
    }, [courseData._id, currentUser._id]);

    return (
        <div className="paymentCheckout">
            <div className="container">
                {isCourseBought ? (
                    <p>You have already bought this course.</p>
                ) : (
                    <PayButton courseData={courseData} />
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default PaymentCheckout;