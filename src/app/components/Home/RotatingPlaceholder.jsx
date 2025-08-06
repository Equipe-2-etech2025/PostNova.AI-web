import { useEffect, useState } from "react";

const RotatingPlaceholder = ({ phrases = [], speed = 2000 }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % phrases.length);
		}, speed);

		return () => clearInterval(interval);
	}, [phrases, speed]);

	return phrases[index];
};

export default RotatingPlaceholder;
