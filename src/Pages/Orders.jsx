import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NumericFormat } from "react-number-format";
import { db } from "../firebase/Firebase";
import { StateContext } from "../store/StateContext";
import "./Orders.css";

const Orders = () => {
	const [{ user }] = useContext(StateContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}

		const fetchOrders = async () => {
			try {
				const ordersRef = collection(db, "users", user.uid, "orders");
				const q = query(ordersRef, orderBy("date", "desc"));
				const snapshot = await getDocs(q);
				setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [navigate, user]);

	if (loading) {
		return (
			<div className='orders__loading'>
				<p>Loading your orders...</p>
			</div>
		);
	}

	return (
		<div className='orders'>
			<div className='orders__container'>
				<h1>Your Orders</h1>

				{orders.length === 0 ?
					<div className='orders__empty'>
						<p>You have no orders yet.</p>
						<button onClick={() => navigate("/")}>Start Shopping</button>
					</div>
				:	orders.map((order) => (
						<div key={order.id} className='orders__order'>
							{/* Order Header */}
							<div className='orders__order__header'>
								<div className='orders__order__header__block'>
									<span>Order Placed</span>
									<strong>
										{new Date(order.date).toLocaleDateString("en-US", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</strong>
								</div>
								<div className='orders__order__header__block'>
									<span>Total</span>
									<NumericFormat
										value={order.total}
										displayType='text'
										thousandSeparator={true}
										prefix='$'
										decimalScale={2}
										renderText={(value) => <strong>{value}</strong>}
									/>
								</div>
								<div className='orders__order__header__block'>
									<span>Estimated Delivery</span>
									<strong>
										{order.deliveryRange?.start} — {order.deliveryRange?.end}
									</strong>
								</div>
								<div className='orders__order__header__block orders__id'>
									<span>Order ID</span>
									<strong>{order.id}</strong>
								</div>
							</div>

							{/* Order Items */}
							<div className='orders__order__items'>
								{order.items?.map((item, index) => (
									<div key={index} className='orders__order__item'>
										<img src={item.image} alt={item.title} />
										<div className='orders__order__item__details'>
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
					))
				}
			</div>
		</div>
	);
};

export default Orders;
