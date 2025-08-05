import React, { useEffect, useState } from "react";
import {
	BsCheckCircleFill,
	BsExclamationCircleFill,
	BsExclamationTriangleFill,
	BsInfoCircleFill,
	BsX,
	BsXOctagonFill,
} from "react-icons/bs";
import Button from "./Button";

const MessageNotification = ({
	message = "",
	type = "info",
	isVisible = false,
	onClose = () => {},
	autoHide = true,
	duration = 5000,
	position = "top-center",
	showProgressBar = true,
	className = "",
}) => {
	const [isShowing, setIsShowing] = useState(false);
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		if (isVisible) {
			setIsShowing(true);
			setProgress(100);

			if (autoHide && duration > 0) {
				// Animation de la barre de progression
				const progressInterval = setInterval(() => {
					setProgress((prev) => {
						const newProgress = prev - 100 / (duration / 100);
						return newProgress <= 0 ? 0 : newProgress;
					});
				}, 100);

				// Auto-hide après la durée spécifiée
				const hideTimeout = setTimeout(() => {
					handleClose();
				}, duration);

				return () => {
					clearInterval(progressInterval);
					clearTimeout(hideTimeout);
				};
			}
		} else {
			setIsShowing(false);
		}
	}, [isVisible, autoHide, duration]);

	const handleClose = () => {
		setIsShowing(false);
		setTimeout(() => {
			onClose();
		}, 300); // Attendre la fin de l'animation
	};

	if (!isVisible && !isShowing) return null;

	const getPositionStyles = () => {
		const positions = {
			"top-center": "fixed top-4 left-1/2 transform -translate-x-1/2",
			"top-left": "fixed top-4 left-4",
			"top-right": "fixed top-4 right-4",
			"bottom-center": "fixed bottom-4 left-1/2 transform -translate-x-1/2",
			"bottom-left": "fixed bottom-4 left-4",
			"bottom-right": "fixed bottom-4 right-4",
			center: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
		};
		return positions[position] || positions["top-center"];
	};

	const getMessageStyles = () => {
		const baseStyles = `${getPositionStyles()} z-50 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-sm transition-all duration-500 ease-in-out max-w-md min-w-80`;

		switch (type) {
			case "success":
				return `${baseStyles} bg-gradient-to-r from-green-700/75 to-emerald-700/75 dark:from-green-500/20 dark:to-emerald-500/20 text-green-50 dark:text-green-300 border-green-500/50 shadow-green-500/25`;
			case "error":
				return `${baseStyles} bg-gradient-to-r from-red-600/75 to-rose-600/75 dark:from-red-500/20 dark:to-rose-500/20 text-red-50 dark:text-red-300 border-red-500/50 shadow-red-500/25`;
			case "warning":
				return `${baseStyles} bg-gradient-to-r from-yellow-600/75 to-orange-500/75 from-yellow-500/20 to-orange-500/20 text-yellow-50 dark:text-yellow-300 border-yellow-500/50 shadow-yellow-500/25`;
			case "info":
				return `${baseStyles} bg-gradient-to-r from-blue-600/75 to-cyan-600/75 dark:from-blue-500/20 dark:to-cyan-500/20 text-blue-50 dark:text-blue-300 border-blue-500/50 shadow-blue-500/25`;
			default:
				return `${baseStyles} bg-gradient-to-r from-gray-600/75 to-slate-600/75 dark:from-gray-500/20 dark:to-slate-500/20 text-gray-50 dark:text-gray-300 border-gray-500/50`;
		}
	};

	const getIcon = () => {
		switch (type) {
			case "success":
				return <BsCheckCircleFill size={18} />;
			case "error":
				return <BsXOctagonFill size={18} />;
			case "warning":
				return <BsExclamationTriangleFill size={18} />;
			case "info":
				return <BsInfoCircleFill size={18} />;
			default:
				return <BsExclamationCircleFill size={18} />;
		}
	};

	return (
		<div
			className={`${getMessageStyles()} ${className} ${
				isShowing
					? "opacity-100 translate-y-0 scale-100"
					: "opacity-0 -translate-y-2 scale-95"
			}`}
			role="alert"
			aria-live="polite"
		>
			<div className="flex items-start gap-2">
				{getIcon()}
				<div className="flex-1 ml-2">
					<p className="font-medium text-sm">{message}</p>
				</div>
				<Button
					variant="ghost"
					size="none"
					className="hover:opacity-70 transition-opacity duration-200 flex-shrink-0"
					onClick={handleClose}
				>
					<BsX size={20} />
				</Button>
			</div>

			{/* Barre de progression pour l'auto-hide */}
			{showProgressBar && autoHide && (
				<div className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg overflow-hidden">
					<div
						className="h-full bg-current opacity-60 transition-all duration-100 ease-linear"
						style={{
							width: `${progress}%`,
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default MessageNotification;
