import React, { useReducer } from "react";

import PropTypes from "prop-types";
import { StateContext } from "./StateContext";

const StateProvider = ({ reducer, initialState, children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	// The useReducer Hook returns the current state and a dispatchmethod.
	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};

StateProvider.propTypes = {
	reducer: PropTypes.func.isRequired,
	initialState: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default StateProvider;
