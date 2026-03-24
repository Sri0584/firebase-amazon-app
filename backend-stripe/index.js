import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/payments/create", async (req, res) => {
	const total = parseInt(req.query.total);
	if (!total || total < 1) {
		res.status(400).json({ error: "Invalid total amount!" });
	}
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
		});
		res.status(201).json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
app.listen(4242, () => console.log("Server running on port 4242"));
