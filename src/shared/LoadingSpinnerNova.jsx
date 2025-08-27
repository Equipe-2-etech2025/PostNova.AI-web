import React from "react";
import { BsMagic } from "react-icons/bs";

const LoadingSpinnerNova = ({
	isLoading,
	iconSize = 16,
	spinnerSize = 16,
	starColors = {
		purple: "bg-purple-300",
		blue: "bg-blue-300",
		cyan: "bg-cyan-300",
		pink: "bg-pink-300",
	},
	showIdleGlow = true,
}) => {
	if (isLoading) {
		return (
			<div
				className="relative mt-3"
				style={{ width: spinnerSize, height: spinnerSize }}
			>
				{/* Étoiles animées */}
				<div className="absolute -top-2 -left-2 w-10 h-10">
					{[
						{ position: "top-0 left-1/2", color: starColors.purple, delay: "" },
						{
							position: "top-1/2 right-0",
							color: starColors.blue,
							delay: "delay-150",
						},
						{
							position: "bottom-0 left-1/2",
							color: starColors.cyan,
							delay: "delay-300",
						},
						{
							position: "top-1/2 left-0",
							color: starColors.pink,
							delay: "delay-500",
						},
					].map((star, index) => (
						<div
							key={index}
							className={`absolute ${star.position} transform -translate-x-1/2 -translate-y-1/2`}
						>
							<div
								className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${star.color.replace("300", "400")} opacity-75 ${star.delay}`}
							></div>
							<div
								className={`relative inline-flex rounded-full h-2 w-2 ${star.color}`}
							></div>
						</div>
					))}
				</div>

				{/* Cercle principal */}
				<div
					className="animate-spin rounded-full border-2 border-white/80 relative"
					style={{ width: spinnerSize, height: spinnerSize }}
				>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-white/40 rounded-full rotate-12"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative">
			<BsMagic size={iconSize} />
			{showIdleGlow && (
				<div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
			)}
		</div>
	);
};

export default LoadingSpinnerNova;
