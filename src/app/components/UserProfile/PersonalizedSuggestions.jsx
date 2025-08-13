import React from "react";
import {
	BsLightbulb,
	BsClock,
	BsRocket,
	BsAward,
	BsTrophy,
	BsBullseye,
	BsGraphUp,
	BsChevronUp,
	BsChevronDown,
} from "react-icons/bs";
import Spinner from "@components/Spinner";
import SectionBlock from "@components/Dashboard/SectionBlock";
import { Card } from "@shared/Card";

const iconMap = {
	lightbulb: <BsLightbulb />,
	clock: <BsClock />,
	rocket: <BsRocket />,
	award: <BsAward />,
	trophy: <BsTrophy />,
	target: <BsBullseye />,
	trending: <BsGraphUp />,
};

const PersonalizedSuggestions = ({
	suggestions,
	loadingSuggestions,
	expandedSections,
	toggleSection,
}) => {
	return (
		<section className="mb-12">
			<SectionBlock
				title="Conseils personnalisés"
				icon={<BsLightbulb />}
				action={
					<button
						onClick={() => toggleSection("suggestions")}
						className="md:hidden"
					>
						{expandedSections.suggestions ? <BsChevronUp /> : <BsChevronDown />}
					</button>
				}
			>
				<div
					className={`${!expandedSections.suggestions ? "hidden md:block" : ""}`}
				>
					{loadingSuggestions ? (
						<div className="text-center py-6 text-gray-500 dark:text-gray-400">
							<Spinner />
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{suggestions.map((suggestion) => (
								<Card key={suggestion.id} styles="p-4 hover:shadow-lg transition-shadow">
									<div className="flex items-start gap-3">
										{iconMap[suggestion.iconType] || <BsLightbulb />}
										<div>
											<h4 className="font-semibold text-sm mb-2">
												{suggestion.title}
											</h4>
											<p className="text-xs text-gray-600 dark:text-gray-400">
												{suggestion.content}
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					)}
				</div>
			</SectionBlock>
		</section>
	);
};

export default PersonalizedSuggestions;
