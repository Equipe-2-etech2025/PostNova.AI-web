import React from "react";

const Tag = ({
	children,
	color = "default",
	size = "md",
	variant = "filled",
	rounded = true,
	className = "",
	as = "span",
	icon,
	...props
}) => {
	const Component = as;

	// color base
	const colorClasses = {
		default: {
			filled:
				"bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
			outlined:
				"border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
			ghost:
				"text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
		},
		primary: {
			filled:
				"bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
			outlined:
				"border border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-400",
			ghost:
				"text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20",
		},
		success: {
			filled:
				"bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
			outlined:
				"border border-green-300 text-green-700 dark:border-green-500 dark:text-green-400",
			ghost:
				"text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20",
		},
		danger: {
			filled:
				"bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
			outlined:
				"border border-red-300 text-red-700 dark:border-red-500 dark:text-red-400",
			ghost:
				"text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
		},
		warning: {
			filled:
				"bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
			outlined:
				"border border-yellow-300 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400",
			ghost:
				"text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
		},
		info: {
			filled:
				"bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
			outlined:
				"border border-blue-300 text-blue-700 dark:border-blue-500 dark:text-blue-400",
			ghost:
				"text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20",
		},
		// Alias color
		green: {
			filled:
				"bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
			outlined:
				"border border-green-300 text-green-700 dark:border-green-500 dark:text-green-400",
			ghost:
				"text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20",
		},
		red: {
			filled:
				"bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
			outlined:
				"border border-red-300 text-red-700 dark:border-red-500 dark:text-red-400",
			ghost:
				"text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
		},
		blue: {
			filled:
				"bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
			outlined:
				"border border-blue-300 text-blue-700 dark:border-blue-500 dark:text-blue-400",
			ghost:
				"text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20",
		},
		purple: {
			filled:
				"bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
			outlined:
				"border border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-400",
			ghost:
				"text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20",
		},
		yellow: {
			filled:
				"bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
			outlined:
				"border border-yellow-300 text-yellow-700 dark:border-yellow-500 dark:text-yellow-400",
			ghost:
				"text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
		},
		gray: {
			filled:
				"bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
			outlined:
				"border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
			ghost:
				"text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
		},
	};

	const sizeClasses = {
		xs: "text-xs px-2 py-0.5",
		sm: "text-xs px-2.5 py-1",
		md: "text-sm px-3 py-1",
		lg: "text-base px-4 py-1.5",
		xl: "text-lg px-5 py-2",
	};

	const baseClasses =
		"inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";

	const shapeClasses = rounded ? "rounded-full" : "rounded-md";

	const colorClass =
		colorClasses[color]?.[variant] || colorClasses.default[variant];
	const sizeClass = sizeClasses[size] || sizeClasses.md;

	// full class
	const fullClass =
		`${baseClasses} ${shapeClasses} ${colorClass} ${sizeClass} ${className}`.trim();

	return (
		<Component className={fullClass} {...props}>
			{icon && <span className="mr-1 flex-shrink-0">{icon}</span>}
			<span className="truncate">{children}</span>
		</Component>
	);
};

export default Tag;
