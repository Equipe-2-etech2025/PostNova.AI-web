import React from "react";
import Button from "@shared/Button";
import { BsTrash } from "react-icons/bs";
import TextSectionEditor from "./TextSectionEditor";
import CtaSectionEditor from "./CtaSectionEditor";
import ColumnsSectionEditor from "./ColumnsSectionEditor";

const DynamicSections = ({
	sections = [],
	handleSectionAdd,
	handleSectionRemove,
	handleChange,
	getLengthError,
	TEXT_LIMITS,
	MAX_SECTIONS,
}) => {
	const getSectionComponent = (section, index) => {
		switch (section.type) {
			case "text-section":
				return (
					<TextSectionEditor
						section={section}
						index={index}
						handleChange={handleChange}
						getLengthError={getLengthError}
						TEXT_LIMITS={TEXT_LIMITS}
					/>
				);
			case "cta-section":
				return (
					<CtaSectionEditor
						section={section}
						index={index}
						handleChange={handleChange}
						getLengthError={getLengthError}
						TEXT_LIMITS={TEXT_LIMITS}
					/>
				);
			case "columns-section":
				return (
					<ColumnsSectionEditor
						section={section}
						index={index}
						handleChange={handleChange}
						getLengthError={getLengthError}
						TEXT_LIMITS={TEXT_LIMITS}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Sections</h3>
				<div className="flex space-x-2">
					<Button
						onClick={() => handleSectionAdd("text")}
						disabled={sections.length >= MAX_SECTIONS}
						className="text-sm px-3 py-1"
					>
						+ Texte
					</Button>
					<Button
						onClick={() => handleSectionAdd("cta")}
						disabled={sections.length >= MAX_SECTIONS}
						className="text-sm px-3 py-1"
					>
						+ CTA
					</Button>
					<Button
						onClick={() => handleSectionAdd("columns")}
						disabled={sections.length >= MAX_SECTIONS}
						className="text-sm px-3 py-1"
					>
						+ Colonnes
					</Button>
				</div>
			</div>

			{sections.length >= MAX_SECTIONS && (
				<p className="text-orange-500 text-sm">
					Limite maximale de {MAX_SECTIONS} sections atteinte
				</p>
			)}

			{sections.map((section, index) => (
				<div key={index} className="relative">
					<div className="flex justify-between items-center mb-2">
						<h4 className="font-medium capitalize">Section {section.type}</h4>
						<Button
							onClick={() => handleSectionRemove(index)}
							className="text-red-500 hover:bg-red-50 p-1"
						>
							<BsTrash size={16} />
						</Button>
					</div>
					{getSectionComponent(section, index)}
				</div>
			))}

			{sections.length === 0 && (
				<p className="text-gray-500 text-center py-8">
					Aucune section ajoutée. Utilisez les boutons ci-dessus pour ajouter du
					contenu.
				</p>
			)}
		</div>
	);
};

export default DynamicSections;
