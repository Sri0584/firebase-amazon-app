import React, { useContext, useRef, useState } from "react";
import "./Payment.css";
import { StateContext } from "../store/StateContext";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import axios from "axios";
import { getBasketTotal } from "../hooks/reducer";
import { NumericFormat } from "react-number-format";
import { db } from "../firebase/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDeliveryRange } from "../utils/Functions";

const Payment = () => {
	const [{ basket, user }, dispatch] = useContext(StateContext);
	const [clientSecret, setClientSecret] = useState(null);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [succeeded, setSucceeded] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();
	const isMounted = useRef(false);
	useEffect(() => {
		if (isMounted.current) return;
		isMounted.current = true;
		const getClientSecret = async () => {
			try {
				const response = await axios.post(
					`http://localhost:4242/payments/create?total=${getBasketTotal(basket) * 100}`,
				);
				console.log("clientSecret:", response.data.clientSecret);
				setClientSecret(response.data.clientSecret);
			} catch (error) {
				setError(error.message);
			}
		};
		if (basket.length > 0) {
			getClientSecret();
		}
	}, [basket]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// ✅ Guard against null clientSecret
		if (!clientSecret) {
			setError("Payment not initialized. Please refresh and try again.");
			return;
		}
		setProcessing(true);
		try {
			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});

			// ✅ Check for Stripe-level errors first
			if (result.error) {
				setError(result.error.message);
				setProcessing(false);
				return;
			}

			// ✅ Now safe to access paymentIntent
			if (result.paymentIntent.status === "succeeded") {
				if (!user) {
					setError("You must be logged in to place an order.");
					setProcessing(false);
					return;
				}
				console.log(user);

				const orderRef = doc(collection(db, "users", user.uid, "orders"));

				await setDoc(orderRef, {
					id: orderRef.id,
					date: new Date().toISOString(),
					items: basket,
					total: getBasketTotal(basket),
					deliveryRange: getDeliveryRange(),
				});

				setSucceeded(true);
				setProcessing(false);
				dispatch({ type: "EMPTY_BASKET" });
				navigate("/thankyou", {
					state: {
						orderItems: basket,
						orderTotal: getBasketTotal(basket),
					},
				});
			}
		} catch (error) {
			setError(error.message);
			setProcessing(false);
		}
	};
	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : null);
	};
	return (
		<div className='payment'>
			<div className='payment__container'>
				<h1>
					Checkout (<span>{basket?.length} items</span>)
				</h1>

				{/* Delivery Address */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment__address'>
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>New York, NY</p>
					</div>
				</div>

				{/* Order Review */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment__items'>
						{basket?.map((item, index) => (
							<div key={index} className='payment__item'>
								<img src={item.image} alt={item.title} />
								<div className='payment__item__info'>
									<p>{item.title}</p>
									<NumericFormat
										value={item.price}
										displayType='text'
										thousandSeparator={true}
										prefix='$'
										decimalScale={2}
										renderText={(value) => <strong>{value}</strong>}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Payment Method */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment__details'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className='payment__price__container'>
								<NumericFormat
									renderText={(value) => (
										<h3>
											Order Total: <strong>{value}</strong>
										</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType='text'
									thousandSeparator={true}
									prefix='$'
								/>
								<button
									disabled={processing || disabled || succeeded}
									type='submit'
								>
									{processing ? "Processing…" : "Buy Now"}
								</button>
							</div>
							{error && <div className='payment__error'>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
