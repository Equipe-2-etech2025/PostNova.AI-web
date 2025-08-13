import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsX } from "react-icons/bs";
import Button from "@shared/Button";

const Modal = ({
	isOpen,
	onClose,
	children,
	size = "md", // sm, md, lg, xl, auto, full
	className = "",
	overlayClassName = "",
	showClose = true,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [animateOpen, setAnimateOpen] = useState(false);

	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		auto: "w-auto",
		fit: "min-w-full",
		full: "min-w-full h-screen",
	};

	const modalHeight = {
		sm: "max-h-sm",
		md: "max-h-md",
		lg: "max-h-2xl",
		xl: "max-h-4xl",
		auto: "h-auto",
		fit: "h-[calc(100vh/1.25)]",
		full: "h-full",
	}

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
			setTimeout(() => setAnimateOpen(true), 50);
		} else {
			setAnimateOpen(false);
			setTimeout(() => setIsVisible(false), 200);
		}

		document.body.style.overflow = isOpen ? "hidden" : "";

		const handleEsc = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEsc);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen, onClose]);

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	if (!isVisible) return null;

	return createPortal(
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center ${size == "full" ? "p-0" : "p-16"} my-auto
				${animateOpen ? "bg-black/50 dark:bg-black/5 backdrop-blur-xs" : "bg-transparent backdrop-blur-none"} 
				transition-all duration-300 ease-out ${overlayClassName}`}
			onClick={handleOverlayClick}
		>
			<div
				className={`relative bg-white dark:bg-[#111] rounded-2xl shadow-xl overflow-clip ${sizeClasses[size]}
					transition-all duration-200 transform
					${animateOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"} 
					${className}`}
			>
				{showClose && (
					<Button
						variant="ghost"
						className="absolute top-3 right-1 text-gray-500 hover:text-gray-700 dark:hover:text-white text-2xl"
						onClick={onClose}
						type="button"
					>
						<BsX
							size={32}
							className="border border-gray-500 hover:border-gray-700 rounded-full p-1"
						/>
					</Button>
				)}
				<div className={`${modalHeight[size]} p-2 mt-6 m-auto`}>
					{children}
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
