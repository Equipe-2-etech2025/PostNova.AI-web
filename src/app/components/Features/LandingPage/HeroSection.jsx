import React from "react";
import SectionBlock from "@layouts/SectionBlock";
import { Card } from "@shared/Card";
import { InputForm, TextareaForm } from "@shared/Input";

const HeroSection = ({
	content,
	handleChange,
	getLengthError,
	TEXT_LIMITS,
}) => {
	return (
		<SectionBlock title={"Hero Section"}>
			<div className="space-y-4">
				<Card>
					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium mb-1">Image de fond :</label>
							<InputForm
								type="url"
								placeholder="https://exemple.com/image.jpg"
								value={content.hero.backgroundImage}
								onChange={(e) => handleChange("hero.backgroundImage", e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Couleur de fond :
							</label>
							<InputForm
								type="color"
								value={content.hero.backgroundColor}
								onChange={(e) => handleChange("hero.backgroundColor", e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Titre principal :
							</label>
							<InputForm
								type="text"
								value={content.hero.title}
								onChange={(e) => handleChange("hero.title", e.target.value)}
							/>
							<p
								className={`${getLengthError(content.hero.title, TEXT_LIMITS.title) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
							>
								{content.hero.title.length}/{TEXT_LIMITS.title} caractères{" "}
								{getLengthError(content.hero.title, TEXT_LIMITS.title) && "maximum"}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Sous-titre :</label>
							<TextareaForm
								value={content.hero.subtitle}
								onChange={(e) => handleChange("hero.subtitle", e.target.value)}
							/>
							<p
								className={`${getLengthError(content.hero.subtitle, TEXT_LIMITS.subtitle) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
							>
								{content.hero.subtitle.length}/{TEXT_LIMITS.subtitle} caractères{" "}
								{getLengthError(content.hero.subtitle, TEXT_LIMITS.subtitle) &&
									"maximum"}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Texte du bouton :
							</label>
							<InputForm
								type="text"
								value={content.hero.cta.text}
								onChange={(e) => handleChange("hero.cta.text", e.target.value)}
							/>
							<p
								className={`${getLengthError(content.hero.cta.text, TEXT_LIMITS.buttonText) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
							>
								{content.hero.cta.text.length}/{TEXT_LIMITS.buttonText} caractères{" "}
								{getLengthError(content.hero.cta.text, TEXT_LIMITS.buttonText) &&
									"maximum"}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Lien du bouton :
							</label>
							<InputForm
								type="url"
								value={content.hero.cta.link}
								onChange={(e) => handleChange("hero.cta.link", e.target.value)}
							/>
							<p
								className={`${getLengthError(content.hero.cta.link, TEXT_LIMITS.url) ? "text-red-500" : "text-gray-500"} text-xs mt-1`}
							>
								{content.hero.cta.link.length}/{TEXT_LIMITS.url} caractères{" "}
								{getLengthError(content.hero.cta.link, TEXT_LIMITS.url) && "maximum"}
							</p>
						</div>
					</div>
				</Card>
			</div>
		</SectionBlock>
	);
};

export default HeroSection;
