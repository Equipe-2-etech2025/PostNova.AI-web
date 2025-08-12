import React from "react";
import {
	BsFillPersonFill,
	BsBarChartLine,
	BsCurrencyExchange,
	BsGearFill,
	BsPin,
	BsX,
	BsExclamationTriangle,
	BsCheckCircle,
	BsInfoCircle,
} from "react-icons/bs";

const ActivityItem = ({
	activity,
	showTimestamp = true,
	compact = false,
	className = "",
}) => {
	const getActivityIcon = (type) => {
		switch (type) {
			case "user_registered":
				return (
					<BsFillPersonFill className="text-green-500" size={compact ? 14 : 16} />
				);
			case "campaign_created":
				return (
					<BsBarChartLine className="text-blue-500" size={compact ? 14 : 16} />
				);
			case "payment_received":
				return (
					<BsCurrencyExchange className="text-yellow-500" size={compact ? 14 : 16} />
				);
			case "error":
				return <BsX className="text-red-500" size={compact ? 14 : 16} />;
			case "warning":
				return (
					<BsExclamationTriangle
						className="text-orange-500"
						size={compact ? 14 : 16}
					/>
				);
			case "success":
				return (
					<BsCheckCircle className="text-green-500" size={compact ? 14 : 16} />
				);
			case "info":
				return <BsInfoCircle className="text-blue-500" size={compact ? 14 : 16} />;
			case "system":
				return <BsGearFill className="text-gray-500" size={compact ? 14 : 16} />;
			default:
				return <BsPin className="text-gray-400" size={compact ? 14 : 16} />;
		}
	};

	const getActivityColor = (type) => {
		switch (type) {
			case "user_registered":
				return "text-green-600 dark:text-green-400";
			case "campaign_created":
				return "text-blue-600 dark:text-blue-400";
			case "payment_received":
				return "text-yellow-600 dark:text-yellow-400";
			case "error":
				return "text-red-600 dark:text-red-400";
			case "warning":
				return "text-orange-600 dark:text-orange-400";
			case "success":
				return "text-green-600 dark:text-green-400";
			case "info":
				return "text-blue-600 dark:text-blue-400";
			case "system":
				return "text-gray-600 dark:text-gray-400";
			default:
				return "text-gray-600 dark:text-gray-400";
		}
	};

	const getActivityBgColor = (type) => {
		switch (type) {
			case "user_registered":
				return "bg-green-50 dark:bg-green-900/20";
			case "campaign_created":
				return "bg-blue-50 dark:bg-blue-900/20";
			case "payment_received":
				return "bg-yellow-50 dark:bg-yellow-900/20";
			case "error":
				return "bg-red-50 dark:bg-red-900/20";
			case "warning":
				return "bg-orange-50 dark:bg-orange-900/20";
			case "success":
				return "bg-green-50 dark:bg-green-900/20";
			case "info":
				return "bg-blue-50 dark:bg-blue-900/20";
			case "system":
				return "bg-gray-50 dark:bg-gray-800/50";
			default:
				return "bg-gray-50 dark:bg-gray-800/50";
		}
	};

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diff = now.getTime() - date.getTime();

		// Less than one minute
		if (diff < 60000) {
			return "À l'instant";
		}

		// Less than one hour
		if (diff < 3600000) {
			const minutes = Math.floor(diff / 60000);
			return `Il y a ${minutes} min`;
		}

		// Less than one day
		if (diff < 86400000) {
			const hours = Math.floor(diff / 3600000);
			return `Il y a ${hours}h`;
		}

		// More than one day
		if (diff < 604800000) {
			const days = Math.floor(diff / 86400000);
			return `Il y a ${days}j`;
		}

		// Standard format
		return date.toLocaleDateString();
	};

	return (
		<div
			className={`flex items-start gap-3 ${compact ? "py-2" : "py-3"} ${className}`}
		>
			<div
				className={`
				${compact ? "w-6 h-6" : "w-8 h-8"} 
				${getActivityBgColor(activity.type)} 
				rounded-full flex items-center justify-center flex-shrink-0
			`}
			>
				{getActivityIcon(activity.type)}
			</div>

			<div className="flex-1 min-w-0">
				<div
					className={`${compact ? "text-sm" : "text-sm"} ${getActivityColor(activity.type)} leading-relaxed`}
				>
					{activity.message}
				</div>
				{showTimestamp && (
					<div className={`${compact ? "text-xs" : "text-xs"} text-gray-500 mt-1`}>
						{formatTimestamp(activity.timestamp || Date.now())}
					</div>
				)}
			</div>

			{(activity.type === "error" || activity.priority === "high") && (
				<div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
			)}
		</div>
	);
};

export const ActivityItemSkeleton = ({ compact = false }) => (
	<div className={`flex items-start gap-3 ${compact ? "py-2" : "py-3"}`}>
		<div
			className={`
			${compact ? "w-6 h-6" : "w-8 h-8"} 
			bg-gray-500/10 rounded-full animate-pulse flex-shrink-0
		`}
		></div>
		<div className="flex-1 space-y-2">
			<div className={`h-4 w-full bg-gray-500/10 rounded animate-pulse`}></div>
			<div className={`h-3 w-24 bg-gray-500/10 rounded animate-pulse`}></div>
		</div>
	</div>
);

export const ActivityGroup = ({
	activities,
	title,
	compact = false,
	maxItems = 5,
	showViewAll = false,
	onViewAll,
}) => {
	const displayedActivities = activities.slice(0, maxItems);
	const hasMore = activities.length > maxItems;

	return (
		<div className="space-y-3">
			{title && (
				<div className="flex items-center justify-between">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
						{title}
					</h4>
					{showViewAll && hasMore && (
						<button
							onClick={onViewAll}
							className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						>
							Voir tout ({activities.length})
						</button>
					)}
				</div>
			)}

			<div className="space-y-1">
				{displayedActivities.map((activity, index) => (
					<ActivityItem
						key={activity.id || index}
						activity={activity}
						compact={compact}
					/>
				))}

				{hasMore && !showViewAll && (
					<div className="text-center py-2">
						<span className="text-xs text-gray-500">
							+{activities.length - maxItems} autres activités
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ActivityItem;
