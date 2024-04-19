const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {

const line_items = req.body.cartItems.map(item => {
    return {
        price_data: {
            currency: 'myr',
            product_data: {
                name: item.name,
                images:[item.image],
                description: item.desc,
                metadata:{
                    id:item.id
                }
            },
            unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
    };
});

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        // success_url: 'http://localhost:4242/success',
        // cancel_url: 'http://localhost:4242/cancel',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/course/123`,
    });

    res.send({url: session.url});
});

module.exports = router;