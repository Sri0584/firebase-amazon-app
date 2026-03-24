import React, { useContext, useEffect } from "react";
import "./ThankYou.css";
import { NumericFormat } from "react-number-format";
import { StateContext } from "../store/StateContext";
import { generateOrderId, getDeliveryRange } from "../utils/Functions";
import { Link, useLocation } from "react-router-dom";

const ThankYou = () => {
	const [, dispatch] = useContext(StateContext);
	const location = useLocation();
	const delivery = getDeliveryRange();
	const orderId = generateOrderId();
	const { orderItems = [], orderTotal = 0 } = location.state || {};

	// Snapshot basket on mount, then clear it
	useEffect(() => {
		dispatch({ type: "EMPTY_BASKET" });
	}, [dispatch]);

	return (
		<div className='thankyou'>
			<div className='thankyou__container'>
				{/* Header */}
				<div className='thankyou__header'>
					<div className='thankyou__checkmark'>✓</div>
					<h1>Order Placed, Thank You!</h1>
					<p>Confirmation will be sent to your email.</p>
				</div>

				{/* Order Info */}
				<div className='thankyou__info'>
					<div className='thankyou__info__block'>
						<span>Order ID</span>
						<strong>{orderId}</strong>
					</div>
					<div className='thankyou__info__block'>
						<span>Estimated Delivery</span>
						<strong>
							{delivery.start} — {delivery.end}
						</strong>
					</div>
					<div className='thankyou__info__block'>
						<span>Order Total</span>
						<NumericFormat
							value={orderTotal}
							displayType='text'
							thousandSeparator={true}
							prefix='$'
							decimalScale={2}
							renderText={(value) => <strong>{value}</strong>}
						/>
					</div>
				</div>

				{/* Order Summary */}
				<div className='thankyou__summary'>
					<h3>Order Summary</h3>
					{orderItems?.length > 0 ?
						orderItems.map((item, index) => (
							<div key={index} className='thankyou__item'>
								<img src={item.image} alt={item.title} />
								<div className='thankyou__item__details'>
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
						))
					:	<p className='thankyou__empty'>No items in this order.</p>}
				</div>

				{/* CTA */}
				<div className='thankyou__actions'>
					<Link to='/'>
						<button className='thankyou__button'>Continue Shopping</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ThankYou;
