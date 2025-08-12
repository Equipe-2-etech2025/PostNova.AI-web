import React, { useState } from "react";
import {
	BsFillPeopleFill,
	BsSearch,
	BsPlus,
	BsDownload,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";
import UserItem, { UserItemSkeleton } from "@components/Admin/UserItem";

const UserManagement = ({
	users = [],
	onEdit,
	onDelete,
	onView,
	isLoading = false,
	showHeader = true,
	showActions = true,
	showSearch = false,
	showFilters = false,
	maxItems = 5,
	title = "Gestion des utilisateurs",
}) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [filterRole, setFilterRole] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	// Users filter
	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesRole = filterRole === "all" || user.role === filterRole;
		const matchesStatus = filterStatus === "all" || user.status === filterStatus;

		return matchesSearch && matchesRole && matchesStatus;
	});

	const displayedUsers = maxItems
		? filteredUsers.slice(0, maxItems)
		: filteredUsers;
	const hasMore = filteredUsers.length > maxItems;

	const ActionView = () => {
		if (!showActions) return null;

		return (
			<div className="flex items-center gap-2">
				<span
					className={`text-sm ${isLoading ? "bg-gray-500/10 text-transparent rounded-md animate-pulse" : "text-gray-500"}`}
				>
					{filteredUsers?.length || "0"} utilisateur
					{filteredUsers?.length > 1 ? "s" : ""}
				</span>

				{showFilters && (
					<Button variant="outline" size="sm">
						<BsDownload size={14} />
					</Button>
				)}

				<Button
					variant="outline"
					size="sm"
					onClick={() => navigate("/admin/users/new")}
				>
					<BsPlus size={14} />
				</Button>

				<Button size="sm" onClick={() => navigate("/admin/users")}>
					Voir tous
				</Button>
			</div>
		);
	};

	const SearchAndFilters = () => {
		if (!showSearch && !showFilters) return null;

		return (
			<div className="flex items-center gap-3 mb-4">
				{showSearch && (
					<div className="relative flex-1">
						<BsSearch
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={16}
						/>
						<input
							type="text"
							placeholder="Rechercher un utilisateur..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				)}

				{showFilters && (
					<div className="flex items-center gap-2">
						<select
							value={filterRole}
							onChange={(e) => setFilterRole(e.target.value)}
							className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="all">Tous les rôles</option>
							<option value="admin">Admin</option>
							<option value="pro">Pro</option>
							<option value="premium">Premium</option>
							<option value="free">Gratuit</option>
						</select>

						<select
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
							className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="all">Tous les statuts</option>
							<option value="active">Actif</option>
							<option value="inactive">Inactif</option>
							<option value="pending">En attente</option>
						</select>
					</div>
				)}
			</div>
		);
	};

	const content = (
		<div className="space-y-4">
			<SearchAndFilters />

			{isLoading ? (
				<div className="space-y-3">
					{[...Array(maxItems || 3)].map((_, i) => (
						<UserItemSkeleton key={i} />
					))}
				</div>
			) : (
				<div className="space-y-2">
					{displayedUsers.length > 0 ? (
						<>
							{displayedUsers.map((user) => (
								<UserItem
									key={user.id}
									user={user}
									onView={onView}
									onEdit={onEdit}
									onDelete={onDelete}
									showActions={showActions}
									clickable={true}
								/>
							))}

							{hasMore && (
								<div className="text-center py-3 border-t border-gray-200 dark:border-gray-700">
									<Button
										variant="outline"
										size="sm"
										onClick={() => navigate("/admin/users")}
									>
										Voir {filteredUsers.length - maxItems} utilisateur
										{filteredUsers.length - maxItems > 1 ? "s" : ""} de plus
									</Button>
								</div>
							)}
						</>
					) : (
						<div className="text-center py-8 text-gray-500">
							{searchTerm || filterRole !== "all" || filterStatus !== "all"
								? "Aucun utilisateur ne correspond aux critères de recherche"
								: "Aucun utilisateur trouvé"}
						</div>
					)}
				</div>
			)}
		</div>
	);

	if (showHeader) {
		return (
			<SectionBlock
				icon={<BsFillPeopleFill />}
				title={title}
				action={<ActionView />}
			>
				{content}
			</SectionBlock>
		);
	}

	return content;
};

export default UserManagement;
