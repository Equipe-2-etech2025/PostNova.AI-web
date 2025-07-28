import React from "react";
import { Card } from "@shared/Card";

const SectionBlock = ({ children, title, icon, action }) => {
	return (
		<Card styles={"shadow-lg"}>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					{icon &&
						React.cloneElement(icon, {
							className: "w-5 h-5",
						})}
					<h2 className="text-xl font-bold">{title}</h2>
				</div>
				{action}
			</div>
			<div className="mt-4">{children}</div>
		</Card>
	);
};

export default SectionBlock;
