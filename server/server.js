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
    [1, { price: 'price_1NuWNwK8Jr4dUR3ty3C5rHR7'}],
    [2, { price: 'price_1NuWYlK8Jr4dUR3tXDfNzSYl'}],
    [3, { price: 'price_1NuWB7K8Jr4dUR3tBGPL2Q3v'}],
    [4, { price: 'price_1NuWFwK8Jr4dUR3t4Ixg5sfy'}],
    [5, { price: 'price_1NxdRLK8Jr4dUR3tAGQQESYI'}],
    [6, { price: 'price_1NxdV6K8Jr4dUR3tW8h9DDUa'}],
    [7, { price: ''}],
    [8, { price: 'price_1NuX6NK8Jr4dUR3tgrqlABOr'}],
    [9, { price: 'price_1NuX6NK8Jr4dUR3tgrqlABOr'}],
    [10, { price: 'price_1NuWaeK8Jr4dUR3tEdbe0l5E'}],
    [11, { price: 'price_1NuWbXK8Jr4dUR3t2A8f8Oyh'}],
    [12, { price: 'price_1NuWKvK8Jr4dUR3tdP6hK4fp'}],
    [13, { price: 'price_1NuWJyK8Jr4dUR3tKVkwaFbO'}],
    [14, { price: 'price_1NxcyLK8Jr4dUR3t5ucg5mTi'}],
    [15, { price: 'price_1NxcxhK8Jr4dUR3tdSYlHKDg'}],
    [16, { price: ''}],
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
            shipping_options: [
                {
                  shipping_rate: 'shr_1NxceHK8Jr4dUR3tdfKyF7cI',
                },
            ],
        })
        res.json({ url: session.url });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000)