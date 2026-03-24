export const getDeliveryRange = () => {
	const start = new Date();
	const end = new Date();
	start.setDate(start.getDate() + 3);
	end.setDate(end.getDate() + 5);

	const options = { weekday: "long", month: "long", day: "numeric" };
	return {
		start: start.toLocaleDateString("en-US", options),
		end: end.toLocaleDateString("en-US", options),
	};
};

export const generateOrderId = () => {
	return `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};
