import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../firebase/Firebase";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				navigate("/");
				toast.success("User logged in successfully!");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error("Error logging in ", `${errorCode} ${errorMessage}`);
			});
	};

	return (
		<div className='login'>
			<Link to='/'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
					alt='Login screen'
					className='login__logo'
				/>
			</Link>
			<div className='login__container'>
				<h1>Sign-in</h1>
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
						autoComplete='current-password'
					/>
					<button
						type='submit'
						onClick={signIn}
						className='login__signinButton'
					>
						Sign In
					</button>
				</form>
				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>
				<Link to='/signup'>
					<button className='login__registerButton'>
						Create your Amazon Account
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
