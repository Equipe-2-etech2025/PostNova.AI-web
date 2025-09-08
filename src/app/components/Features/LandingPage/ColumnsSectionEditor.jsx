import React from "react";
import { BsTrash } from "react-icons/bs";
import { Card } from "@shared/Card";
import { InputForm, TextareaForm } from "@shared/Input";
import Button from "@shared/Button";

const ColumnsSectionEditor = ({
	section,
	index,
	handleChange,
	getLengthError,
	TEXT_LIMITS,
}) => {
	const updateColumn = (index, field, value) => {
		const updatedColumns = [...section.columns];
		updatedColumns[index][field] = value;
		handleChange(`sections[${index}].columns`, updatedColumns);
	};

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
						{getLengthError(section?.title, TEXT_LIMITS.title) && "maximum"}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Sous-titre :</label>
					<TextareaForm
						value={section.subtitle}
						onChange={(e) =>
							handleChange(`sections[${index}].subtitle`, e.target.value)
						}
					/>
					<p
						className={`${getLengthError(section?.subtitle, TEXT_LIMITS.subtitle) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
					>
						{section?.subtitle?.length}/{TEXT_LIMITS.subtitle} caractères{" "}
						{getLengthError(section.subtitle, TEXT_LIMITS.subtitle) && "maximum"}
					</p>
				</div>
				<div>
					{section.columns?.map((column, index) => (
						<div key={index} className="border border-gray-500/25 rounded p-3 mb-3">
							<div className="mb-2">
								<h5 className="font-medium">Colonne {index + 1}</h5>
							</div>
							<div className="space-y-2">
								<div>
									<label className="block text-sm font-medium mb-1">Titre :</label>
									<InputForm
										type="text"
										value={column.title}
										onChange={(e) => updateColumn(index, "title", e.target.value)}
									/>
									<p
										className={`${getLengthError(column.title, TEXT_LIMITS.title) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
									>
										{column.title.length}/{TEXT_LIMITS.title} caractères{" "}
										{getLengthError(column.title, TEXT_LIMITS.title) && "maximum"}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Texte :</label>
									<TextareaForm
										value={column.text}
										onChange={(e) => updateColumn(index, "text", e.target.value)}
									/>
									<p
										className={`${getLengthError(column.text, TEXT_LIMITS.text) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
									>
										{column.text.length}/{TEXT_LIMITS.text} caractères{" "}
										{getLengthError(column.text, TEXT_LIMITS.text) && "maximum"}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default ColumnsSectionEditor;
