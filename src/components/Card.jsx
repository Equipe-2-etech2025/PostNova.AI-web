import React from "react";

const Card = ({ children, styles }) => {
	return (
		<div
			className={`bg-[var(--color-darkgray)] border border-[var(--color-gray)] rounded-3xl text-start backdrop-blur-sm p-6 ${styles}`}
		>
			{children}
		</div>
	);
};

export { Card };
