import React, { useState, useEffect } from "react";

const FormErrorMessage = ({ message, setError }) => {
	const [isVisibleMessage, setIsVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsVisible(false);
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [setError]);

	return (
		<div
			className={`fixed bottom-8 right-8 z-10 w-fit transition-all duration-500 ${
				isVisibleMessage ? "opacity-100 right-8" : "opacity-0 right-[500px]"
			}`}
		>
			<div className="bg-red-900 text-white px-7 py-3 font-semibold rounded-md shadow-md">
				{message}
			</div>
		</div>
	);
};

export default FormErrorMessage;
