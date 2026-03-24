import { useContext, useEffect } from "react";
import "./App.css";
import NavBar from "./Pages/NavBar.jsx";
import Router from "./router/Router.jsx";
import { StateContext } from "./store/StateContext.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Firebase.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [, dispatch] = useContext(StateContext);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) =>
			dispatch({ type: "SET_USER", user: user || null }),
		);

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<div className='App'>
			<ToastContainer position='top-right' autoClose={3000} />
			<NavBar />
			<Router />
		</div>
	);
}

export default App;
