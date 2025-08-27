import React from "react";
import { BsMagic } from "react-icons/bs";

const InputPrompt = ({
  placeholder,
  containerStyle = "",
  inputStyle = "",
  btnStyle = "",
  value,
  size = "md",
  btnText = "Générer",
  btnDisabled = false,
  btnIcon = <BsMagic size={16} />,
  onChange,
  btnPosition = "left",
  onSubmit,
  optionComponent,

  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const handleChange = (e) => {
    onChange?.(e);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        relative bg-gray-300/15 border-gray-300 dark:bg-gray-700/15 border dark:border-gray-400/15 rounded-2xl shadow-lg
        px-6 py-5 transition-all duration-300
        focus-within:border-purple-500 focus-within:shadow-[0_0_10px_rgba(168,85,247,0.6)]
        w-full mx-auto
        ${containerStyle}  {/* ICI: Application du style personnalisé */}
      `}
    >
      <textarea
        placeholder={placeholder || "Écrivez votre prompt ici..."}
        className={`
          w-full min-h-[90px] md:min-h-[100px] lg:min-h-[150px]
          resize-none focus:outline-none
          text-gray-900 placeholder:text-gray-400
          dark:text-white
          text-base md:text-lg lg:text-xl
          bg-transparent border-none
          ${inputStyle}  {/* ICI: Application du style personnalisé */}
        `}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        {...props}
      />

      <div className="flex items-center justify-between mt-3">
        {optionComponent && <div>{optionComponent}</div>}

        <div className={`flex ${btnPosition === "right" ? "ml-auto" : ""}`}>
          <button
            type="submit"
            disabled={btnDisabled}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
              text-white bg-gradient-to-r from-purple-500 to-pink-500
              hover:from-purple-600 hover:to-pink-600
              transition-all duration-300 transform 
              hover:scale-105
              active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              relative overflow-hidden
              ${btnStyle}  {/* ICI: Application du style personnalisé */}
            `}
            onClick={(e) => {
              const button = e.currentTarget;
              const circle = document.createElement("span");
              const diameter = Math.max(button.clientWidth, button.clientHeight);
              const radius = diameter / 2;
              
              circle.style.width = circle.style.height = `${diameter}px`;
              circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
              circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
              circle.classList.add("ripple");
              
              const ripple = button.getElementsByClassName("ripple")[0];
              if (ripple) ripple.remove();
              
              button.appendChild(circle);
            }}
          >
            {/* Effet de pulsation pendant le loading */}
            {btnDisabled && (
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl" />
            )}
            
            {btnIcon && (
              <span className={`transition-transform ${btnDisabled ? "animate-bounce" : "group-hover:animate-bounce"}`}>
                {btnIcon}
              </span>
            )}
            
            <span className="relative z-10">{btnText}</span>
            
            {/* Effet de brillance au survol */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-white/10 skew-x-45" />
          </button>
        </div>
      </div>

      {/* Styles pour l'effet ripple */}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          transform: scale(0);
          animation: ripple 0.6s linear;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
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
