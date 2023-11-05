require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "https://imbehindmyhead.com",
}));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, { name:'rosace puffer',price: 'price_1NuWNwK8Jr4dUR3ty3C5rHR7',prod:'prod_OhwGIjmOeFpH4L'}],
    [2, { name:'jupi longsleeve black',price: 'price_1NuWYlK8Jr4dUR3tXDfNzSYl',prod:'prod_OhwRDa8k4pCw8T'}],
    [3, { name:'shadow hoodie black',price: 'price_1NuWB7K8Jr4dUR3tBGPL2Q3v',prod:'prod_Ohw3TcfkOT0IYx'}],
    [4, { name:'shadow hoodie copper',price: 'price_1NuWFwK8Jr4dUR3t4Ixg5sfy',prod:'prod_Ohw8LXOV0d5myL'}],
    [5, { name:'shadow dress black',price: 'price_1NxdRLK8Jr4dUR3tAGQQESYI',prod:'prod_Ol9kzg4xyhDx7q'}],
    [6, { name:'shadow dress red',price: 'price_1NxdV6K8Jr4dUR3tW8h9DDUa',prod:'prod_Ol9oXpWonESEu8'}],
    [7, { name:'jupi anorak black',price: 'price_1O5AtgK8Jr4dUR3t1emjOlGD',prod:'prod_OswnnKWEVPOqUR'}],
    [8, { name:'jupi pant milano',price: 'price_1NuWV5K8Jr4dUR3tVNE93Wuk',prod:'prod_OhwNyEn1xlGQAA'}],
    [9, { name:'jupi pant micro',price: 'price_1NuX6NK8Jr4dUR3tgrqlABOr',prod:'prod_Ohx0BBXGs1oktz'}],
    [10, { name:'shadow durag black',price: 'price_1NuWaeK8Jr4dUR3tEdbe0l5E',prod:'prod_OhwTK4ORtssepc'}],
    [11, { name:'shadow durag copper',price: 'price_1NuWbXK8Jr4dUR3t2A8f8Oyh',prod:'prod_OhwUlLFF8fpLzL'}],
    [12, { name:'scar longsleeve dust',price: 'price_1NuWJyK8Jr4dUR3tKVkwaFbO',prod:'prod_OhwCcyTTjY85DL'}],
    [13, { name:'scar longsleeve blood',price: 'price_1NuWKvK8Jr4dUR3tdP6hK4fp',prod:'prod_OhwDC1vHcX7JQB'}],
]);

app.get("/", (req, res) => {
    async function getProductMetadata(productId) {
      try {
        const product = await stripe.products.retrieve(productId);
        const metadata = product.metadata;
        return metadata;
      } catch (error) {
        console.error('Error retrieving product metadata:', error);
        throw error;
      }
    }
    const stocks = [];
    const itemsArray = [...storeItems];
    Promise.all(itemsArray.map(([key, item]) => getProductMetadata(item.prod)))
      .then(metadataArray => {
        metadataArray.forEach((metadata, index) => {
          const item = itemsArray[index][1];
          const stock = metadata.Stock || 'N/A';
          stocks.push({ index: index+1, name: item.name, stock });
        });
  
        console.log('Stocks:', stocks);
        res.json({ stocks });
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      });
  });

app.post("/create-checkout-session", async (req, res) => {
    const items = [];
    const sizes = [];
    req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        const lineItem = {
            price: storeItem.price,
            quantity: item.quantity,
        };
        items.push(lineItem);
        if (item.size !== "null") {
          sizes.push(item.size.toString());
        }
    });
    const fs = require('fs');
    const filePath = 'countries.txt';
    const countries = []
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        const codes = data.split('\n').map(countryCode => countryCode.trim());
        countries.push(...codes);
    });
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card","paypal"],
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: "all",
            },
            shipping_address_collection: {allowed_countries: countries
            },
            line_items: items,
            metadata: {
              Size: sizes.toString()
            },
            phone_number_collection: {
                enabled: true,
              },
              custom_fields: [
                {
                  "key": "client_height_info",
                  "label": {
                    "custom": "Enter your height in cm (e.g., 175 cm).",
                    "type":"custom"
                  },
                  "type": "numeric"
                },{
                  "key": "client_weight_info",
                  "label": {
                    "custom": "Enter your weight in kg (e.g., 70 kg)",
                    "type":"custom"
                  },
                  "type": "numeric"
                }
              ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}`,
            shipping_options: [
                {
                  shipping_rate: 'shr_1O9Fh0K8Jr4dUR3tM1dp866E',
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