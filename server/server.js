require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "https://imbh.vercel.app",
}));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, { price: 'price_1NsljtLiExIPDGaHSVIHYERx'}],
    [2, { price: 'price_1NslkULiExIPDGaHo4UxDBgA'}],
    [3, { price: 'price_1NslisLiExIPDGaHh2DuQLZw'}],
    [4, { price: 'price_1NsljLLiExIPDGaH2EXThatB'}],
    [5, { price: 'price_1Nsli6LiExIPDGaHHy5Bf2Bl'}],
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
            cancel_url: `${process.env.CLIENT_URL}`,
        })
        res.json({ url: session.url });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000)