import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Checkout from "../Pages/Checkout";
import Payment from "../Pages/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ThankYou from "../Pages/ThankYou";
import Orders from "../Pages/Orders";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<SignUp />} />
			<Route path='/checkout' element={<Checkout />} />
			<Route
				path='/payment'
				element={
					<Elements stripe={stripePromise}>
						<Payment />
					</Elements>
				}
			/>
			<Route path='/thankyou' element={<ThankYou />} />
			<Route path='/orders' element={<Orders />} />
		</Routes>
	);
};

export default Router;
