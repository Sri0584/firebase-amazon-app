import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StateProvider from "./store/StateProvider.jsx";
import reducer, { initialState } from "./hooks/reducer.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter
			future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
		>
			<StateProvider reducer={reducer} initialState={initialState}>
				<App />
			</StateProvider>
		</BrowserRouter>
	</StrictMode>,
);
