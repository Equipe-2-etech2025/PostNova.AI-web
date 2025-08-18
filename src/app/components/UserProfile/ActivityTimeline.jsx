import React from "react";
import { BsCalendar, BsChevronUp, BsChevronDown } from "react-icons/bs";
import SectionBlock from "@layouts/SectionBlock";
import Spinner from "@components/Spinner";

const ActivityTimeline = ({
	recentActivity,
	expandedSections,
	loadingActivity,
	toggleSection,
}) => {
	return (
		<section className="mb-12">
			<SectionBlock
				title="Activités récentes"
				icon={<BsCalendar />}
				action={
					<button onClick={() => toggleSection("timeline")} className="md:hidden">
						{expandedSections.timeline ? <BsChevronUp /> : <BsChevronDown />}
					</button>
				}
			>
				<div className={`${!expandedSections.timeline ? "hidden md:block" : ""}`}>
					{loadingActivity ? (
						<Spinner />
					) : (
						<div className="space-y-4">
							{recentActivity.map((activity) => (
								<div
									key={activity.id}
									className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
								>
									<div className="mt-1">{activity.icon}</div>
									<div className="flex-1">
										<p className="text-sm">{activity.message}</p>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											{activity.date}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</SectionBlock>
		</section>
	);
};

export default ActivityTimeline;
