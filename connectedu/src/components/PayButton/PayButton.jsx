// use material ui button
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../slices/api"

//Dummy user data
const user = {
    _id:"12345",
    username:"dummyuser",
    email:"dummyuser@gmail.com"
};

const PaymentButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
    },
}));

const PayButton = ({ cartItems }) => {

    //const user = useSelector((state) => state.auth)

    const handleCheckout = () => {
        //console.log(cartItems);
        axios.post(`${url}/stripe/create-checkout-session`, {
            cartItems,
            userId: user._id
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        })
        .catch((err) => console.log(err.message));
    };

    return (
        <Stack>
            <PaymentButton size='large' onClick={() => handleCheckout()}>Pay Now</PaymentButton>
        </Stack>
    );
}

export default PayButton;