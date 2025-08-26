import React from "react";
import SectionBlock from "@layouts/SectionBlock";
import { Card } from "@shared/Card";
import { InputForm } from "@shared/Input";

const FooterSection = ({ content, handleChange }) => {
	return (
		<SectionBlock title={"Footer"}>
			<div className="space-y-4">
				<Card>
					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium mb-1">
								Texte du footer :
							</label>
							<InputForm
								type="text"
								value={content.footer.text}
								onChange={(e) => handleChange("footer.text", e.target.value)}
							/>
						</div>
						<div className="space-y-3">
							<label className="block text-sm font-medium mb-2">Liens :</label>
							{content.footer.links.map((link, linkIndex) => (
								<div
									key={linkIndex}
									className="border border-gray-500/25 rounded p-3 space-y-2"
								>
									<h4 className="font-medium">Lien {linkIndex + 1}</h4>
									<div>
										<label className="block text-xs font-medium mb-1">Texte :</label>
										<InputForm
											type="text"
											value={link.text}
											onChange={(e) =>
												handleChange(`footer.links[${linkIndex}].text`, e.target.value)
											}
										/>
									</div>
									<div>
										<label className="block text-xs font-medium mb-1">URL :</label>
										<InputForm
											type="url"
											value={link.link}
											onChange={(e) =>
												handleChange(`footer.links[${linkIndex}].link`, e.target.value)
											}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</Card>
			</div>
		</SectionBlock>
	);
};

export default FooterSection;
