import React, { useEffect, useState } from "react";

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
		const baseStyles = `${getPositionStyles()} z-50 px-6 py-4 rounded-lg shadow-2xl border backdrop-blur-sm transition-all duration-500 ease-in-out max-w-md min-w-80`;

		switch (type) {
			case "success":
				return `${baseStyles} bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/50 shadow-green-500/25`;
			case "error":
				return `${baseStyles} bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border-red-500/50 shadow-red-500/25`;
			case "warning":
				return `${baseStyles} bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/50 shadow-yellow-500/25`;
			case "info":
				return `${baseStyles} bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/50 shadow-blue-500/25`;
			default:
				return `${baseStyles} bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border-gray-500/50`;
		}
	};

	const getIcon = () => {
		const iconProps = "w-5 h-5 mr-3 flex-shrink-0";

		switch (type) {
			case "success":
				return (
					<svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "error":
				return (
					<svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "warning":
				return (
					<svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "info":
				return (
					<svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return (
					<svg className={iconProps} fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				);
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
			<div className="flex items-start">
				{getIcon()}
				<div className="flex-1">
					<span className="font-medium text-sm leading-relaxed">{message}</span>
				</div>
				<button
					onClick={handleClose}
					className="ml-4 text-current hover:opacity-70 transition-opacity duration-200 flex-shrink-0"
					aria-label="Fermer la notification"
				>
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
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
