import React from "react";
import SectionBlock from "@layouts/SectionBlock";
import { Card } from "@shared/Card";
import { InputForm } from "@shared/Input";

const ColorsSection = ({ content, handleChange }) => {
	return (
		<SectionBlock title={"Couleurs"}>
			<div className="space-y-4">
				<Card>
					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium mb-1">
								Couleur principale :
							</label>
							<InputForm
								type="color"
								value={content.colors.primary}
								onChange={(e) => handleChange("colors.primary", e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Couleur secondaire :
							</label>
							<InputForm
								type="color"
								value={content.colors.secondary}
								onChange={(e) => handleChange("colors.secondary", e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Couleur du texte :
							</label>
							<InputForm
								type="color"
								value={content.colors.text}
								onChange={(e) => handleChange("colors.text", e.target.value)}
							/>
						</div>
					</div>
				</Card>
			</div>
		</SectionBlock>
	);
};

export default ColorsSection;
