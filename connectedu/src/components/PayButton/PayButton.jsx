// use material ui button
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// import axios from "axios";
// import { useSelector } from "react-redux";
import { url } from "../../slices/api"

const PaymentButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700],
    },
}));

const PayButton = ({ cartItems }) => {
    const handleCheckout = () => {
        console.log(cartItems);
    };

    return (
        // <>
        //     <button className='payButton' onClick={() => handleCheckout()}>Check Out</button>
        // </>
        <Stack>
            <PaymentButton size='large' onClick={() => handleCheckout()}>Pay Now</PaymentButton>
        </Stack>
    );
}

export default PayButton;