import React, { useContext, useState } from "react";
import "./navbar.css";
import { Search as SearchIcon } from "@mui/icons-material";
import { ShoppingBasket as ShoppingBasketIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { StateContext } from "../store/StateContext";
import { toast } from "react-toastify";

const NavBar = () => {
	//getting basket value from contextAPI
	const [{ basket, user }, dispatch] = useContext(StateContext);
	console.log(user);
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const handleAuthentication = () => {
		if (user) {
			signOut(auth)
				.then(() => {
					toast.success("Logged out successfully!");
					dispatch({
						type: "EMPTY_BASKET",
					});
					navigate("/");
				})
				.catch((error) => {
					toast.error("Error logging out!", error);
				});
		}
	};
	const handleSearch = () => {
		if (query.trim() !== "") {
			// Implement search functionality here, e.g., navigate to a search results page
			console.log("Searching for:", query);
		}
	};
	const handleOrders = () => {
		navigate("/orders");
	};
	return (
		<div className='navbar'>
			<Link to='/'>
				<img src={import.meta.env.VITE_NAVBAR_IMG} alt='brand-logo' />
			</Link>

			<div className='search'>
				<select name='All' id='all'>
					<option value='all'>All</option>
					<option value='alldepartments'>All Departments</option>
					<option value='alexa'>Alexa</option>
					<option value='furniture'>Furniture</option>
					<option value='kids'>Kids</option>
				</select>
				<input
					type='text'
					className='inputbox'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSearch()}
				/>
				<SearchIcon
					className='searchicon'
					onClick={handleSearch}
					aria-label='Search'
				/>
			</div>

			{user ?
				<div className='navbar__options' onClick={handleAuthentication}>
					<span>Hello, {user.email}</span>
					<span>Sign Out</span>
				</div>
			:	<Link to='/login'>
					<div className='navbar__options'>
						<span>Hello, Guest</span>
						<span>Sign In</span>
					</div>
				</Link>
			}

			<div className='navbar__options' onClick={handleOrders}>
				<span>Returns</span>
				<span>& Orders</span>
			</div>
			<div className='navbar__options'>
				<span>Your</span>
				<span>Prime</span>
			</div>
			<Link to='/checkout'>
				<div className='navbar__options'>
					<ShoppingBasketIcon
						className='basket-icon'
						aria-label='shopping basket'
					/>
					<span id='items'> {basket?.length}</span>
				</div>
			</Link>
		</div>
	);
};

export default NavBar;
