import React, { useState } from "react";
import { InputPrompt } from "@shared/Input";

const New = () => {
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Campaign description submitted:", description);
	};

	return (
		<div className="min-h-screen">
			<div className="container flex flex-col items-center justify-center min-h-[80vh] mx-auto">
				<h1 className="text-5xl font-bold mt-12 mb-2 text-center">
					Créer une campagne
				</h1>
				<p className="mb-8 text-gray-400 text-center">
					Commencez par décrire votre campagne. Nous vous aiderons à la planifier et
					à la lancer efficacement.
				</p>
				<div className="w-full flex flex-col gap-6 max-w-3xl">
					<InputPrompt
						placeholder="Décrivez votre campagne"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default New;
