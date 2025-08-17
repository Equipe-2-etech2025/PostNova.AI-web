import React from "react";
import {
	BsGear,
	BsChevronDown,
	BsChevronUp,
	BsMoonStarsFill,
	BsSunriseFill,
} from "react-icons/bs";
import SectionBlock from "@layouts/SectionBlock";
import { Card } from "@shared/Card";
import useTheme from "@hooks/useTheme";

const QuickSettings = ({
	isMobileSettingsCollapsed,
	setIsMobileSettingsCollapsed,
}) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div>
			<SectionBlock
				title="Paramètres rapides"
				icon={<BsGear />}
				action={
					<button
						onClick={() => setIsMobileSettingsCollapsed(!isMobileSettingsCollapsed)}
						className="md:hidden"
					>
						{isMobileSettingsCollapsed ? <BsChevronDown /> : <BsChevronUp />}
					</button>
				}
			>
				<div
					className={`space-y-4 ${isMobileSettingsCollapsed ? "hidden md:block" : ""}`}
				>
					<Card styles="p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
						<div className="flex items-center justify-between">
							<span>Notifications</span>
							<div className="w-12 h-6 bg-blue-600 rounded-full relative">
								<div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
							</div>
						</div>
					</Card>

					<Card styles="p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
						<div
							className="flex items-center justify-between w-full cursor-pointer"
							onClick={toggleTheme}
						>
							<span>Mode sombre</span>
							<div className="relative w-12 h-6">
								<div
									className={`absolute inset-0 rounded-full transition-colors duration-300 ${
										theme === "dark" ? "bg-blue-600" : "bg-gray-400"
									}`}
								></div>
								<div
									className={`absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
										theme === "dark" ? "translate-x-6" : "translate-x-1"
									}`}
								></div>
							</div>
						</div>
					</Card>
				</div>
			</SectionBlock>
		</div>
	);
};

export default QuickSettings;
