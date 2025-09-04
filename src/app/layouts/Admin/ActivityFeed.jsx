import React, { useState, useEffect } from "react";
import { BsActivity, BsFilter, BsArrowClockwise } from "react-icons/bs";
import { useNavigate } from "react-router";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";
import ActivityItem, {
	ActivityItemSkeleton,
} from "@components/Admin/ActivityItem";

const ActivityFeed = ({
	activities = [],
	onView,
	onRefresh,
	isLoading = false,
	showHeader = true,
	showActions = true,
	showFilters = false,
	maxItems = 10,
	autoRefresh = false,
	refreshInterval = 30000, // 30 secondes
}) => {
	const navigate = useNavigate();
	const [filterType, setFilterType] = useState("all");
	const [lastRefresh, setLastRefresh] = useState(new Date());

	// Auto-refresh functionality
	useEffect(() => {
		if (!autoRefresh || !onRefresh) return;

		const interval = setInterval(() => {
			onRefresh();
			setLastRefresh(new Date());
		}, refreshInterval);

		return () => clearInterval(interval);
	}, [autoRefresh, onRefresh, refreshInterval]);

	// Activity filtering
	const filteredActivities = activities.filter((activity) => {
		if (filterType === "all") return true;
		return activity.type === filterType;
	});

	// Grouped by date
	const groupedActivities = filteredActivities.reduce((groups, activity) => {
		const date = new Date(activity.created_at || Date.now()).toDateString();
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(activity);
		return groups;
	}, {});

	const displayedActivities = maxItems
		? filteredActivities.slice(0, maxItems)
		: filteredActivities;
	const hasMore = filteredActivities.length > maxItems;

	const handleRefresh = () => {
		if (onRefresh) {
			onRefresh();
			setLastRefresh(new Date());
		}
	};

	const getFilterOptions = () => {
		const types = [...new Set(activities.map((activity) => activity.type))];
		return [
			{ value: "all", label: "Toutes les activités" },
			...types.map((type) => ({
				value: type,
				label: type.charAt(0).toUpperCase() + type.slice(1),
			})),
		];
	};

	const ActionView = () => {
		if (!showActions) return null;

		return (
			<div className="flex items-center gap-2">
				<span
					className={`text-sm ${isLoading ? "bg-gray-500/10 text-transparent rounded-md animate-pulse" : "text-gray-500"}`}
				>
					{filteredActivities?.length || "0"} activité
					{filteredActivities?.length > 1 ? "s" : ""}
				</span>

				{autoRefresh && (
					<span className="text-xs text-gray-400">
						Mis à jour il y a{" "}
						{Math.floor((Date.now() - lastRefresh.getTime()) / 1000)}s
					</span>
				)}

				{onRefresh && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleRefresh}
						disabled={isLoading}
					>
						<BsArrowClockwise size={14} className={isLoading ? "animate-spin" : ""} />
					</Button>
				)}

				<Button size="sm" onClick={() => navigate("/admin/activity")}>
					Voir tout
				</Button>
			</div>
		);
	};

	const FilterControls = () => {
		if (!showFilters) return null;

		return (
			<div className="flex items-center gap-3 mb-4">
				<div className="flex items-center gap-2">
					<BsFilter className="text-gray-400" size={16} />
					<select
						value={filterType}
						onChange={(e) => setFilterType(e.target.value)}
						className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{getFilterOptions().map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>
		);
	};

	const content = (
		<div className="space-y-4">
			<FilterControls />

			{isLoading ? (
				<div className="space-y-3">
					{[...Array(maxItems || 5)].map((_, i) => (
						<ActivityItemSkeleton key={i} />
					))}
				</div>
			) : (
				<div>
					{displayedActivities.length > 0 ? (
						<>
							{showFilters
								? // Grouped by date
									Object.entries(groupedActivities).map(([date, dayActivities]) => (
										<div key={date} className="space-y-2">
											<div className="text-sm font-medium text-gray-500 px-2">
												{new Date(date).toLocaleDateString("fr-FR", {
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</div>
											{dayActivities
												.slice(
													0,
													maxItems
														? Math.ceil(maxItems / Object.keys(groupedActivities).length)
														: undefined
												)
												.map((activity) => (
													<ActivityItem
														key={activity.id}
														activity={activity}
														onView={onView}
														showActions={showActions}
														compact={true}
													/>
												))}
										</div>
									))
								: displayedActivities.map((activity, i) => (
										<ActivityItem
											key={i}
											activity={activity}
											onView={onView}
											showActions={showActions}
										/>
									))}

							{hasMore && (
								<div className="text-center py-3 border-t border-gray-200 dark:border-gray-700">
									<Button
										variant="outline"
										size="sm"
										onClick={() => navigate("/admin/activity")}
									>
										Voir {filteredActivities.length - maxItems} activité
										{filteredActivities.length - maxItems > 1 ? "s" : ""} de plus
									</Button>
								</div>
							)}
						</>
					) : (
						<div className="text-center py-8 text-gray-500">
							{filterType !== "all"
								? `Aucune activité de type "${filterType}" trouvée`
								: "Aucune activité récente"}
						</div>
					)}
				</div>
			)}
		</div>
	);

	if (showHeader) {
		return (
			<SectionBlock icon={<BsActivity />} title={"Journal d'activité"} action={<ActionView />}>
				{content}
			</SectionBlock>
		);
	}

	return content;
};

export default ActivityFeed;
