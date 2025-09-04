import React from "react";

const CardImage = ({ children, shadow = "none", className = "" }) => {
  const shadowClass = () => {
	switch (shadow) {
	  case "sm":
		return "shadow-sm";
	  case "md":
		return "shadow-md";
	  case "lg":
		return "shadow-lg";
	  case "xl":
		return "shadow-xl";
	  case "2xl":
		return "shadow-2xl";
	  case "none":
	  default:
		return "";
	}
  };

  return (
	<div
	  className={`bg-gray-50 dark:bg-gray-700/15 border border-gray-200 dark:border-gray-800 rounded-3xl text-start ${shadowClass()} ${className}`}
	>
	  {children}
	</div>
  );
};

export { CardImage };