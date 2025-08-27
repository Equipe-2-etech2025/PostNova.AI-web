import React from "react";

const CardChoice = ({ 
  children, 
  shadow = "none", 
  hoverAnimation = false,
  className = "",
  onClick 
}) => {
  const shadowClass = shadow ? `shadow-${shadow}` : ``;
  const animationClass = hoverAnimation 
    ? "transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg" 
    : "";

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-700/15 border border-gray-200 dark:border-gray-800 rounded-xl text-start p-6 ${shadowClass} ${animationClass} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { CardChoice };