const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {

    const line_items = req.body.courseData.map(course => {
    return {
        price_data: {
            currency: 'myr',
            product_data: {
                name: course.title,
                images: [course.thumbnailUrl[0]],
                description: course.description,
                metadata:{
                    id: course._id
                }
            },
            unit_amount: course.price * 100,
        }, 
        quantity: 1,
    };
});

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        invoice_creation:{
            enabled: true,
        },
        // success_url: 'http://localhost:4242/success',
        // cancel_url: 'http://localhost:4242/cancel',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/course/123`,
    });

    res.send({url: session.url});
});

router.get('/test', (req, res) => {
    res.send("it works");
})

module.exports = router;