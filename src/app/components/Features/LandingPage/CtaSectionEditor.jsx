import React from "react";
import { Card } from "@shared/Card";
import { InputForm, TextareaForm } from "@shared/Input";

const CtaSectionEditor = ({
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
						value={section.backgroundColor || "#F8F8F8"}
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
				<div>
					<label className="block text-sm font-medium mb-1">Texte du bouton :</label>
					<InputForm
						type="text"
						value={section.cta.text}
						onChange={(e) =>
							handleChange(`sections[${index}].cta.text`, e.target.value)
						}
					/>
					<p
						className={`${getLengthError(section.cta.text, TEXT_LIMITS.buttonText) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
					>
						{section.cta.text.length}/{TEXT_LIMITS.buttonText} caractères{" "}
						{getLengthError(section.cta.text, TEXT_LIMITS.buttonText) && "maximum"}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Lien :</label>
					<InputForm
						type="url"
						value={section.cta.link}
						onChange={(e) =>
							handleChange(`sections[${index}].cta.link`, e.target.value)
						}
					/>
					<p
						className={`${getLengthError(section.cta.link, TEXT_LIMITS.url) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
					>
						{section.cta.link.length}/{TEXT_LIMITS.url} caractères{" "}
						{getLengthError(section.cta.link, TEXT_LIMITS.url) && "maximum"}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default CtaSectionEditor;
