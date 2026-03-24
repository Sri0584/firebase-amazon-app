import React, { useContext } from "react";
import "./Subtotal.css";
import { getBasketTotal } from "../hooks/reducer";
import { NumericFormat } from "react-number-format";
import { StateContext } from "../store/StateContext";
import { useNavigate } from "react-router-dom";

function Subtotal() {
	const [{ basket }] = useContext(StateContext);
	const navigate = useNavigate();

	const handleHomePage = () => navigate("/");
	const handlePayment = () => navigate("/payment");

	return (
		<div className='subtotal'>
			<NumericFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items): <strong>{value}</strong>
						</p>
						<small className='subtotal__gift'>
							<input type='checkbox' /> This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType='text'
				thousandSeparator={true}
				prefix='$'
			/>

			<button onClick={handlePayment}>Proceed to Checkout</button>
			<button onClick={handleHomePage}>Keep Shopping</button>
		</div>
	);
}
export default Subtotal;
