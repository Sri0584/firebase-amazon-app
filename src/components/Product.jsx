import React, { useContext } from "react";
import "./product.css";
import { StateContext } from "../store/StateContext";
import { toast } from "react-toastify";

function Product({ id, title, image, price, rating }) {
	const [, dispatch] = useContext(StateContext);

	const addToBasket = () => {
		// dispatch the item into the data layer
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
		toast.success("Item added to cart successfully!");
	};
	return (
		<div className='product'>
			<div className='product__info'>
				<p>{title}</p>
				<p className='product_price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='product__rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p key={i}>🌟</p>
						))}
				</div>
			</div>
			<img src={image} alt='product 1' />
			<button style={{ cursor: "pointer" }} onClick={addToBasket}>
				Add to Basket
			</button>
		</div>
	);
}

export default Product;
