require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = process.env.CLIENT_URL || "http://localhost:5174";

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("📦 Données reçues du frontend :", items);

    if (!items?.length) {
      console.log("⚠️ Erreur : panier vide reçu !");
      return res.status(400).json({ error: "Cart empty" });
    }

    const line_items = items.map((it) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: it.name,
        },
        unit_amount: Math.round(it.price * 100),
      },
      quantity: it.quantity,
    }));

    console.log("🧾 Line items générés :", JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${YOUR_DOMAIN}/?checkout=success`,
      cancel_url: `${YOUR_DOMAIN}/?checkout=cancel`,
    });

    console.log("Session Stripe créée :", session.id);
    res.json({ url: session.url });
  } catch (err) {
    console.error(" Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Stripe server running on port ${PORT}`));
