require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, { price: 'price_1Nn1DFLiExIPDGaHviw3OFgj'}],
    [2, { price: 'price_1Novz0LiExIPDGaH437x4Tc7'}],
    [3, { price: 'price_1NpsGcLiExIPDGaH4o2k92Yk'}],
]);

app.get("/", (req, res) => {
    res.json({message: "Hello from server"});
});

app.post("/create-checkout-session", async (req, res) => {
    const items = [];
    req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        const lineItem = {
            price: storeItem.price,
            quantity: item.quantity,
        };
        items.push(lineItem);
    });
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_address_collection: {
                allowed_countries: ["FR", "BE"]
            },
            line_items: items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        })
        res.json({ url: session.url });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000)