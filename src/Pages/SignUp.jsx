import { auth } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useContext } from "react";
import { StateContext } from "../store/StateContext";

const SignUp = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [, dispatch] = useContext(StateContext);

	const register = (e) => {
		console.log("register");
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch({ type: "SET_USER", user });
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(`${errorCode}: ${errorMessage}`);
			});
	};
	return (
		<div className='signup'>
			<Link to='/'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
					alt='signup screen'
					className='signup__logo'
				/>
			</Link>
			<div className='signup__container'>
				<h1>Sign-Up</h1>
				<form>
					<h5>Email</h5>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete='username'
					/>
					<h5>Password</h5>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='new-password'
					/>
				</form>

				<button onClick={register} className='signup__registerButton'>
					Create your Amazon Account
				</button>
			</div>
		</div>
	);
};

export default SignUp;
