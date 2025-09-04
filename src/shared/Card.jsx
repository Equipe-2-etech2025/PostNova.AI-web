import React from "react";

const Card = ({ children, shadow = "none" }) => {
	const shadowClass = shadow ? `shadow-${shadow}` : ``;

	return (
		<div
			className={`bg-gray-50 dark:bg-gray-700/15 border border-gray-200 dark:border-gray-800 rounded-3xl text-start p-6 ${shadowClass}`}
		>
			{children}
		</div>
	);
};

export { Card };
