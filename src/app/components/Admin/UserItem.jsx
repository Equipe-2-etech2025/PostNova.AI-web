import React, { useState } from "react";
import {
	BsThreeDotsVertical,
	BsEye,
	BsPencil,
	BsTrash,
	BsCheck,
	BsX,
} from "react-icons/bs";
import { Link } from "react-router";
import Button from "@shared/Button";
import Tag from "@shared/Tag";

const UserItem = ({
	user,
	onEdit,
	onDelete,
	onView,
	showActions = true,
	clickable = true,
}) => {
	const [actionMenuOpen, setActionMenuOpen] = useState(false);

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "success";
			case "inactive":
				return "danger";
			case "pending":
				return "warning";
			default:
				return "gray";
		}
	};

	const getRoleColor = (role) => {
		switch (role) {
			case "admin":
				return "purple";
			case "pro":
			case "premium":
				return "green";
			case "free":
				return "gray";
			default:
				return "gray";
		}
	};

	const handleActionClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setActionMenuOpen(!actionMenuOpen);
	};

	const handleMenuAction = (action, e) => {
		e.stopPropagation();
		e.preventDefault();
		action?.(user);
		setActionMenuOpen(false);
	};

	const userContent = (
		<div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
			<div className="flex items-center gap-3 flex-1">
				<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
					{user.name?.charAt(0).toUpperCase() || "U"}
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<span className="font-medium truncate">{user.name}</span>
						<Tag color={getRoleColor(user.role)} size="sm">
							{user.role}
						</Tag>
					</div>
					<div className="text-sm text-gray-500 truncate">
						{user.email} • Inscrit le{" "}
						{new Date(user.created_at || Date.now()).toLocaleDateString()}
					</div>
				</div>

				<div className="flex items-center gap-2 flex-shrink-0">
					<Tag
						color={getStatusColor(user.status)}
						size="sm"
						icon={
							user.status === "inactive" ? <BsX size={12} /> : <BsCheck size={12} />
						}
					>
						{user.status || "Active"}
					</Tag>
				</div>

				<div className="text-sm text-gray-500 flex-shrink-0">
					{user.campaigns_count || 0} campagnes
				</div>
			</div>

			{/* Actions Menu */}
			{showActions && (
				<div className="relative flex-shrink-0 ml-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleActionClick}
						className="p-2"
					>
						<BsThreeDotsVertical />
					</Button>

					{actionMenuOpen && (
						<>
							<div
								className="fixed inset-0 z-10"
								onClick={() => setActionMenuOpen(false)}
							></div>

							<div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-[150px]">
								<button
									onClick={(e) => handleMenuAction(onView, e)}
									className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg"
								>
									<BsEye size={14} />
									Voir détails
								</button>
								<button
									onClick={(e) => handleMenuAction(onEdit, e)}
									className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
									<BsPencil size={14} />
									Modifier
								</button>
								<button
									onClick={(e) => handleMenuAction(onDelete, e)}
									className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors last:rounded-b-lg"
								>
									<BsTrash size={14} />
									Supprimer
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);

	if (clickable) {
		return (
			<Link to={`/admin/users/${user.id}`} className="block">
				{userContent}
			</Link>
		);
	}

	return userContent;
};

export const UserItemSkeleton = () => (
	<div className="flex items-center gap-4 px-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg">
		<div className="w-10 h-10 bg-gray-500/10 rounded-full animate-pulse flex-shrink-0"></div>
		<div className="flex-1 space-y-2">
			<div className="h-4 w-32 bg-gray-500/10 rounded animate-pulse"></div>
			<div className="h-3 w-48 bg-gray-500/10 rounded animate-pulse"></div>
		</div>
		<div className="h-6 w-16 bg-gray-500/10 rounded animate-pulse flex-shrink-0"></div>
		<div className="h-6 w-12 bg-gray-500/10 rounded animate-pulse flex-shrink-0"></div>
	</div>
);

export default UserItem;
