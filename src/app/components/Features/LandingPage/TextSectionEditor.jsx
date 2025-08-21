import React from "react";
import { Card } from "@shared/Card";
import { InputForm, TextareaForm } from "@shared/Input";

const TextSectionEditor = ({
	section,
	index,
	handleChange,
	getLengthError,
	TEXT_LIMITS,
}) => {
	return (
		<Card>
			<div className="space-y-3">
				<div>
					<label className="block text-sm font-medium mb-1">Couleur de fond :</label>
					<InputForm
						type="color"
						value={section.backgroundColor || "#FFFFFF"}
						onChange={(e) =>
							handleChange(`sections[${index}].backgroundColor`, e.target.value)
						}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Titre :</label>
					<InputForm
						type="text"
						value={section.title}
						onChange={(e) => handleChange(`sections[${index}].title`, e.target.value)}
					/>
					<p
						className={`${getLengthError(section.title, TEXT_LIMITS.title) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
					>
						{section.title.length}/{TEXT_LIMITS.title} caractères{" "}
						{getLengthError(section.title, TEXT_LIMITS.title) && "maximum"}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Texte :</label>
					<TextareaForm
						value={section.text}
						onChange={(e) => handleChange(`sections[${index}].text`, e.target.value)}
					/>
					<p
						className={`${getLengthError(section.text, TEXT_LIMITS.text) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
					>
						{section.text.length}/{TEXT_LIMITS.text} caractères{" "}
						{getLengthError(section.text, TEXT_LIMITS.text) && "maximum"}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default TextSectionEditor;
