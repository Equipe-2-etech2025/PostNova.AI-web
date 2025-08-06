import React, { useEffect, useRef, useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Button from "@shared/Button";

const phrases = [
	"une campagne de lancement d’une app mobile",
	"une campagne pour booster tes ventes",
	"une campagne de buzz sur les réseaux",
	"une pub pour ton produit",
];

const prefix = "Demander à PostNova de générer ";

const InputPrompt = ({ containerStyle, inputStyle }) => {
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const [placeholder, setPlaceholder] = useState(prefix);
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const phrase = phrases[currentPhraseIndex];
		let typingSpeed = isDeleting ? 30 : 50;

		const timeout = setTimeout(() => {
			const nextIndex = isDeleting ? charIndex - 1 : charIndex + 1;
			const updatedText = prefix + phrase.substring(0, nextIndex);

			setPlaceholder(updatedText);
			setCharIndex(nextIndex);

			// Pause quand la phrase est entièrement écrite
			if (!isDeleting && nextIndex === phrase.length) {
				setTimeout(() => setIsDeleting(true), 800); // pause plus courte avant suppression
			}

			// Passage à la phrase suivante
			if (isDeleting && nextIndex === 0) {
				setIsDeleting(false);
				setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
			}
		}, typingSpeed);

		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, currentPhraseIndex]);

	useEffect(() => {
		const containerCurrentRef = containerRef.current;
		const inputCurrentRef = inputRef.current;

		const handleFocus = () => {
			containerCurrentRef?.classList.add("ring-1", "ring-[var(--color-lightgray)]");
		};
		const handleBlur = () => {
			containerCurrentRef?.classList.remove("ring-1", "ring-[var(--color-lightgray)]");
		};

		inputRef.current?.addEventListener("focus", handleFocus);
		inputRef.current?.addEventListener("blur", handleBlur);

		return () => {
			inputRef.current?.removeEventListener("focus", handleFocus);
			inputRef.current?.removeEventListener("blur", handleBlur);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`bg-blue-50/10 border border-[var(--color-gray)] rounded-3xl shadow-lg px-5 py-4 backdrop-blur-2xl ${containerStyle}`}
		>
			<textarea
				ref={inputRef}
				placeholder={placeholder}
				className={`w-full p-2 text-black dark:text-white focus:outline-none resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 ${inputStyle}`}
				cols={1}
			></textarea>
			<div className="flex items-center justify-between my-1">
				<div className="flex items-center gap-2">
					<button className="text-gray-500 hover:text-gray-700 transition duration-200">
						<i className="ri-image-line"></i>
					</button>
					<button className="text-gray-500 hover:text-gray-700 transition duration-200">
						<i className="ri-link-m"></i>
					</button>
				</div>
				<Button circle>
					<BsArrowUpCircle className="text-[var(--color-lightgray)]" size={24} />
				</Button>
			</div>
		</div>
	);
};

export { InputPrompt };
