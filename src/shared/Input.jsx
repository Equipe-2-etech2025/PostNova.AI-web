import React from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Button from "@shared/Button";

const InputPrompt = ({ placeholder, containerStyle, inputStyle }) => {
	const containerRef = React.useRef(null);
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		const containerCurrentRef = containerRef.current;
		const inputCurrentRef = inputRef.current;
		const handleFocus = () => {
			if (containerCurrentRef && inputCurrentRef) {
				containerCurrentRef.classList.add(
					"ring-1",
					"ring-[var(--color-lightgray)]"
				);
			}
		};
		const handleBlur = () => {
			if (inputCurrentRef && containerCurrentRef) {
				containerCurrentRef.classList.remove(
					"ring-1",
					"ring-[var(--color-lightgray)]"
				);
			}
		};
		if (inputCurrentRef) {
			inputCurrentRef.addEventListener("focus", handleFocus);
			inputCurrentRef.addEventListener("blur", handleBlur);
		}
		return () => {
			if (inputCurrentRef) {
				inputCurrentRef.removeEventListener("focus", handleFocus);
				inputCurrentRef.removeEventListener("blur", handleBlur);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`bg-blue-50/10 border border-[var(--color-gray)] rounded-3xl shadow-lg px-5 py-4 backdrop-blur-2xl ${containerStyle}`}
		>
			<textarea
				ref={inputRef}
				placeholder={placeholder}
				className={`w-full p-2 resize-none focus:outline-none 
              text-gray-900 dark:text-white 
              placeholder:text-gray-400 dark:placeholder:text-gray-500 
              ${inputStyle}`}
				cols={1}
			/>
			<div className="flex items-center justify-between my-1">
				<div className="flex items-center gap-2">
					<button className="text-gray-500 hover:text-gray-700 transition duration-200">
						<i className="ri-image-line"></i>
					</button>
					<button className="text-gray-500 hover:text-gray-700 transition duration-200">
						<i className="ri-link-m"></i>
					</button>
				</div>
				<Button circle>
					<BsArrowUpCircle className="text-[var(--color-lightgray)]" size={24} />
				</Button>
			</div>
		</div>
	);
};

const InputForm = ({
	isPassword = false,
	hasError = false,
	isDisabled = false,
	className = "",
	...props
}) => {
	const base =
		"w-full bg-gray-500/10 px-4 py-3 rounded-lg placeholder:text-gray-500 hover:bg-gray-500/15 focus:outline-none focus:ring-2 focus:ring-purple-700 transition-all duration-200";

	const disabledClass = isDisabled ? "text-gray-500 opacity-75" : "";
	const errorClass = hasError
		? "focus:ring-red-500 border border-red-500 shake"
		: "";

	const fullClass = `${base} ${disabledClass} ${errorClass} ${className}`.trim();

	return (
		<input
			type={isPassword ? "password" : "text"}
			className={fullClass}
			{...props}
		/>
	);
};

export { InputPrompt, InputForm };
