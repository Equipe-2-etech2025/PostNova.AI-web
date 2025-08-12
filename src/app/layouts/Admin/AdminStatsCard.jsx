import React from "react";
import { Card } from "@shared/Card";

const AdminStatsCard = ({
	title,
	value,
	subtitle,
	icon,
	trend,
	isLoading = false,
}) => {
	const getTrendColor = (trend) => {
		if (trend > 0) return "text-green-500";
		if (trend < 0) return "text-red-500";
		return "text-gray-500";
	};

	const getTrendIcon = (trend) => {
		if (trend > 0) return "↗";
		if (trend < 0) return "↘";
		return "→";
	};

	return (
		<Card shadow="md">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						{icon && <span className="text-gray-500">{icon}</span>}
						<span className="text-sm text-gray-500 font-medium">{title}</span>
					</div>
					<div className="space-y-1">
						<div
							className={`text-2xl font-bold ${
								isLoading
									? "bg-gray-500/10 rounded-lg text-transparent animate-pulse"
									: ""
							}`}
						>
							{isLoading ? "000" : value || "0"}
						</div>
						{subtitle && (
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-400">{subtitle}</span>
								{trend !== undefined && !isLoading && (
									<span className={`text-sm ${getTrendColor(trend)}`}>
										{getTrendIcon(trend)} {Math.abs(trend)}%
									</span>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default AdminStatsCard;
