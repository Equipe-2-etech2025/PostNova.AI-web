import React from "react";

const Tag = ({ children, color }) => {
	const tagClasses = {
		default: "bg-gray-100 text-gray-800 border border-gray-200",
		green: "bg-green-100 text-green-800 border border-green-200",
		purple: "bg-purple-100 text-purple-800 border border-purple-200",
		red: "bg-red-100 text-red-800 border border-red-200",
		blue: "bg-blue-100 text-blue-800 border border-blue-200",
		yellow: "bg-yellow-100 text-yellow-800 border border-yellow-200",
	};

	return (
		<div
			className={`${tagClasses[color] || tagClasses.default} inline-block text-xs font-semibold rounded-full px-4 pt-1.5 pb-1`}
		>
			{children}
		</div>
	);
};

export default Tag;
