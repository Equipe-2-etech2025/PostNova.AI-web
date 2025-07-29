const Button = ({
	children,
	variant = "solid",
	color = "primary",
	size = "md",
	circle = false,
	className = "",
	disabled = false,
	as,
	...props
}) => {
	const Tag = as || "button";
	const solidColors = {
		primary:
			"bg-purple-600 border border-purple-600 text-white dark:bg-purple-800 dark:border-purple-800",
		secondary: "bg-green-600 border border-green-600 text-white",
		tertiary: "bg-gray-500 border border-gray-500 text-white dark:bg-gray-600",
		danger: "bg-red-600 border border-red-600 text-white dark:bg-red-500",
		neutral: "bg-gray-900 border border-gray-900 text-gray-50 dark:bg-gray-100 dark:border-gray-100 dark:text-gray-900",
	};

	// Outline
	const outlineColors = {
		primary:
			"border border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-400",
		secondary:
			"border border-green-400 text-green-600 dark:border-green-800 dark:text-green-500",
		tertiary:
			"border border-gray-300 text-gray-600 dark:border-gray-500 dark:text-gray-300",
		danger:
			"border border-red-600 text-red-600 dark:border-red-500 dark:text-red-500",
		neutral:
			"border border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100",
	};

	const sizes = {
		sm: "text-sm px-3 py-1.5",
		md: "text-base px-4 py-2",
		lg: "text-lg px-5 py-3",
	};

	const base =
		"inline-flex items-center justify-center font-bold transition duration-150 cursor-pointer";
	const shape = circle ? "rounded-full" : "rounded-xl";
	const sizeClass = sizes[size] || sizes.md;

	let colorClass = "";
	if (variant === "solid") {
		colorClass = solidColors[color] || solidColors.primary;
	} else if (variant === "outline") {
		colorClass = outlineColors[color] || outlineColors.primary;
	} else if (variant === "ghost") {
		colorClass = `bg-transparent text-${color} dark:text-${color}`;
	}

	const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

	const fullClass =
		`${base} ${shape} ${sizeClass} ${colorClass} ${disabledClass} ${className}`.trim();

	return (
		<Tag className={fullClass} disabled={disabled} {...props}>
			{children}
		</Tag>
	);
};

export default Button;
