import React from "react";
import { Card } from "@shared/Card";

const Indicator = ({ title, number, information, icon, isLoading = true }) => {
	return (
		<Card styles={"shadow-lg"}>
			<div className="flex items-center justify-between gap-2">
				<div className="w-full flex flex-col gap-1">
					<span className="text-sm lg:text-base text-gray-500">{title}</span>
					<span
						className={`text-2xl font-bold ${isLoading && "bg-gray-500/10 rounded-lg text-transparent animate-pulse"} bg-gray-500/0 mr-auto transition-all duration-200`}
					>
						{number || "0.0"}
					</span>
					<span
						className={`${isLoading ? "w-auto bg-gray-500/10 rounded-lg text-transparent animate-pulse" : "w-full"} text-sm lg:text-base bg-gray-500/0 mr-auto transition-opacity duration-500`}
					>
						{information || "information"}
					</span>
				</div>
				{icon &&
					React.cloneElement(icon, {
						className: "w-12 h-12",
					})}
			</div>
		</Card>
	);
};

export default Indicator;
