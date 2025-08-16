import React from "react";
import { BsMagic } from "react-icons/bs";


const InputPrompt = ({
	placeholder,
	containerStyle,
	inputStyle,
	value,
	btnText = "Générer",
	btnDisabled = false,
	btnIcon = <BsMagic size={16} />,
	onChange,
	btnPosition = "left",
	onSubmit,
	optionValue = "Option",
	handleOption,
	optionComponent,
	...props
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(e);
		}
	};

	const handleChange = (e) => {
		if (onChange) {
			onChange(e);
		}
	};

	const onKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<form
			className={`relative bg-blue-50/10 border border-gray-500/10 rounded-3xl shadow-lg px-5 py-4 backdrop-blur-2xl ${containerStyle}`}
			onSubmit={handleSubmit}
		>
			<textarea
				placeholder={placeholder || "Écrivez votre prompt ici..."}
				className={`w-full p-2 focus:outline-none resize-none placeholder:text-gray-500/75 ${inputStyle}`}
				cols={1}
				value={value}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				{...props}
			></textarea>

			<div className="flex items-center justify-between my-1">
				{optionComponent && <div className="mt-2">{optionComponent}</div>}

				<div
					className={`flex ${btnPosition === "right" ? "justify-end" : "justify-start"} w-full`}
				>
					<button
						type="submit"
						disabled={btnDisabled}
						className={`
                            flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium
                            transition-all duration-300 transform
                            ${
																													btnDisabled
																														? "creating-animation btn-gradient opacity-90"
																														: "btn-gradient hover:scale-105"
																												}
                            ${btnPosition === "right" ? "ml-auto" : ""}
                        `}
					>
						<span>{btnText}</span>
						{btnIcon && (
							<span
								className={`transition-transform ${btnDisabled ? "animate-pulse" : ""}`}
							>
								{btnIcon}
							</span>
						)}
					</button>
				</div>
			</div>
		</form>
	);
};

export default InputPrompt;
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

const TextareaForm = ({
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

	return <textarea className={fullClass} {...props} />;
};

export { InputPrompt, InputForm, TextareaForm };
