// use material ui button
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../slices/api"

const PaymentButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
    },
    textTransform: 'none'
}));

const PayButton = ({ courseData }) => {

    //const user = useSelector((state) => state.auth)

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleCheckout = () => {
        //console.log(cartItems);
        axios.post(`${url}/stripe/create-checkout-session`, {
            courseData,
            userId: currentUser._id
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        })
        .catch((err) => console.log(err.message));
    };

    return (
        <Stack>
            <PaymentButton onClick={() => handleCheckout()}>Enroll Course</PaymentButton>
        </Stack>
    );
}

export default PayButton;