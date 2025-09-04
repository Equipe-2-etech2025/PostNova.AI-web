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
	const addColumn = () => {
		// Max column number
		if ((section.columns || []).length >= 3) return;
		const updatedColumns = [...(section.columns || []), { title: "", text: "" }];
		handleChange(`sections[${index}].columns`, updatedColumns);
	};

	const removeColumn = (columnIndex) => {
		// Min column number
		if ((section.columns || []).length <= 1) return;
		const updatedColumns = section.columns.filter((_, i) => i !== columnIndex);
		handleChange(`sections[${index}].columns`, updatedColumns);
	};

	const updateColumn = (columnIndex, field, value) => {
		const updatedColumns = [...section.columns];
		updatedColumns[columnIndex][field] = value;
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
					<div className="flex justify-between items-center mb-3">
						<label className="block text-sm font-medium">Colonnes :</label>
						{
							!((section.columns || []).length >= 3) &&
							<Button size="none" onClick={addColumn} className="text-sm px-2 py-1">
								Ajouter une colonne
							</Button>
						}
					</div>
					{section.columns?.map((column, columnIndex) => (
						<div key={columnIndex} className="border border-gray-500/25 rounded p-3 mb-3">
							<div className="flex justify-between items-center mb-2">
								<h5 className="font-medium">Colonne {columnIndex + 1}</h5>
								<Button
									variant="outline"
									circle
									size="none"
									color="danger"
									className="p-1"
									onClick={() => removeColumn(columnIndex)}
								>
									<BsTrash />
								</Button>
							</div>
							<div className="space-y-2">
								<div>
									<label className="block text-sm font-medium mb-1">Titre :</label>
									<InputForm
										type="text"
										value={column.title}
										onChange={(e) => updateColumn(columnIndex, "title", e.target.value)}
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
										onChange={(e) => updateColumn(columnIndex, "text", e.target.value)}
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
