import React, { useEffect, useState } from 'react'
import './Pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import CheckOutForm from '../checkOutForm/CheckOutForm';

const stripePromise = loadStripe("pk_test_51PItEhAfp1wEuBRFlxNXt63WEYxmpbrAk3ZH1QLckOKXIsMYK2vb1sYr3KknfhycRWcCE3LJTorvpkSFGoEYioVB00ye253E5g");

const Pay = () => {

    const [clientSecret, setClientSecret] = useState("");

    const { courseId } = useParams();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-checkout-session/${courseId}`);
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.log(err);
            }
        };
        makeRequest();
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className='pay'>
            {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        )}
        </div>
    )
}

export default Pay