import React, { useState, useEffect } from "react";

const SimpleTypewriter = ({
	text = "Une idée, une campagne",
	typingSpeed = 100,
	deleteSpeed = 50,
	pauseTime = 2000,
	loop = true,
	className = "",
}) => {
	const [displayedText, setDisplayedText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500);
		return () => clearInterval(cursorInterval);
	}, []);

	useEffect(() => {
		let timeout;

		if (!isDeleting && displayedText.length < text.length) {
			// Écriture
			timeout = setTimeout(() => {
				setDisplayedText(
					text.slice(
						0,
						displayedText.length +
							1
					)
				);
			}, typingSpeed);
		} else if (
			!isDeleting &&
			displayedText.length === text.length
		) {
			// Pause avant suppression
			if (loop) {
				timeout = setTimeout(() => {
					setIsDeleting(true);
				}, pauseTime);
			}
		} else if (isDeleting && displayedText.length > 0) {
			// Suppression
			timeout = setTimeout(() => {
				setDisplayedText(
					text.slice(
						0,
						displayedText.length -
							1
					)
				);
			}, deleteSpeed);
		} else if (isDeleting && displayedText.length === 0) {
			// Redémarrage
			setIsDeleting(false);
		}

		return () => clearTimeout(timeout);
	}, [
		displayedText,
		isDeleting,
		text,
		typingSpeed,
		deleteSpeed,
		pauseTime,
		loop,
	]);

	const formatText = (text) => {
		// Diviser le texte en segments avec leurs couleurs
		const segments = [
			{ text: "Une ", color: "text-white" },
			{
				text: "idée",
				color: "text-[#4335C4]",
				glow: true,
			},
			{ text: ", ", color: "text-white" },
			{
				text: "une ",
				color: "text-white",
				breakLine: true,
			},
			{
				text: "campagne",
				color: "text-[#4335C4]",
				glow: true,
			},
		];

		let charCount = 0;
		const result = [];

		segments.forEach((segment, segmentIndex) => {
			const segmentStart = charCount;
			const segmentEnd =
				charCount + segment.text.length;

			// Calculer combien de caractères de ce segment sont visibles
			const visibleLength = Math.max(
				0,
				Math.min(
					segment.text.length,
					displayedText.length -
						segmentStart
				)
			);
			const visibleText = segment.text.slice(
				0,
				visibleLength
			);

			charCount += segment.text.length;

			if (visibleText.length > 0) {
				// Ajouter un retour à la ligne si nécessaire
				if (
					segment.breakLine &&
					result.length > 0
				) {
					result.push(
						<br
							key={`br-${segmentIndex}`}
						/>
					);
				}

				result.push(
					<span
						key={segmentIndex}
						className={`${segment.color} ${segment.glow ? "text-glow-enhanced" : ""} transition-all duration-200`}
						style={{
							textShadow: segment.glow
								? "0 0 10px currentColor, 0 0 20px currentColor"
								: "none",
						}}
					>
						{visibleText}
					</span>
				);
			}
		});

		return result;
	};

	return (
		<div className={className}>
			<h2 className="text-white text-xl md:text-4xl font-semibold leading-relaxed text-center">
				{formatText(displayedText)}
				<span
					className={`inline-block w-0.5 h-6 md:h-10 ml-1 transition-all duration-200`}
					style={{
						backgroundColor:
							isDeleting
								? "#4335C4"
								: "#4335C4",
						opacity: showCursor
							? 1
							: 0,
						boxShadow: showCursor
							? `0 0 10px ${isDeleting ? "#4335C4" : "#4335C4"}`
							: "none",
					}}
				/>
			</h2>
		</div>
	);
};

export default SimpleTypewriter;
