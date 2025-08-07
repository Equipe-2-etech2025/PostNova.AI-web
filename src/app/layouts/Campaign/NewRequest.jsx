import React, { useState } from "react";
import { InputPrompt } from "@shared/Input";

const NewRequest = () => {
	const [showOption, setShowOption] = useState(false);

	return (
		<div>
			<h1 className="text-center text-3xl font-bold mb-2">Nouvelle requête</h1>
			<div className="p-6 space-y-4">
				<InputPrompt optionValue="Voir les options" handleOption={() => setShowOption(prev => !prev)} />
				<div className={`${showOption ? "max-h-100" : "max-h-0"} overflow-clip transition-all duration-500`}>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus pariatur maxime, est asperiores nostrum recusandae consequatur rem fugit perspiciatis, accusantium aliquam vitae voluptates temporibus dignissimos ad voluptatibus quis odio voluptas!</p>
				</div>
			</div>
		</div>
	);
};

export default NewRequest;
