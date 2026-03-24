import React from "react";
import "./Home.css";
import Product from "../components/Product";
import ProductGrid from "../components/Product_Grid";
import { products_grid, products_row1, products_row2 } from "../utils/Products";

function Home() {
	const renderComponent = (Component, products) => {
		return (
			<div className='home__row'>
				{products.map((product) => (
					<Component key={product.id} {...product} />
				))}
			</div>
		);
	};

	return (
		<div className='home'>
			<div className='home__container'>
				<img
					className='home__image'
					src={import.meta.env.VITE_HERO_IMAGE_URL}
					alt='Promotional banner'
					width={1500}
					height={600}
				/>

				<div className='home__row'>
					{renderComponent(Product, products_row2)}
				</div>

				<div className='home__row'>
					{renderComponent(Product, products_row1)}
				</div>
				<div className='home__row'>
					{renderComponent(ProductGrid, products_grid)}
				</div>
			</div>
		</div>
	);
}

export default Home;
