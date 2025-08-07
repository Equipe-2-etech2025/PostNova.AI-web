import React from "react";
import { BsMagic } from "react-icons/bs";
import Button from "@shared/Button";

const InputPrompt = ({
	placeholder,
	containerStyle,
	inputStyle,
	value,
	onChange,
	onSubmit,
	optionValue = "Option",
	handleOption,
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

	// Handle "Enter" key to Submit
	const onKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<form
			className={`bg-blue-50/10 border border-gray-500/10 rounded-3xl shadow-lg px-5 py-4 backdrop-blur-2xl ${containerStyle}`}
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
			<div className="flex items-end justify-between my-1">
				<div className="flex items-center gap-2">
					{handleOption && (
						<Button
							variant="outline"
							color="tertiary"
							size="none"
							className="text-gray-500 px-2 pt-1.5 pb-1 transition duration-200"
							onClick={handleOption}
						>
							<span className="text-sm font-semibold">{optionValue}</span>
						</Button>
					)}
				</div>
				<Button type="submit" color="primary" className="flex items-center gap-2">
					<span>Créer</span>
					<BsMagic size={16} />
				</Button>
			</div>
		</form>
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
