import React, { useEffect, useState } from "react";
import {
	BsPersonFill,
	BsCollection,
	BsCurrencyEuro,
	BsEye,
	BsHeart,
	BsShare,
	BsPeople,
	BsGraphUp,
	BsServer,
	BsShield,
	BsBell,
	BsDownload,
} from "react-icons/bs";
import useAuth from "@hooks/useAuth";
import { useNotification } from "@hooks/useNotification";
import NavBar from "@layouts/NavBar";
import SectionBlock from "@layouts/SectionBlock";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import MessageNotification from "@shared/MessageNotification";
import AdminStatsCard from "@layouts/Admin/AdminStatsCard";
import UserManagement from "@layouts/Admin/UserManagement";
import ActivityFeed from "@layouts/Admin/ActivityFeed";
import RevenueChart from "@layouts/Admin/RevenueChart";
import AdminTools from "@layouts/Admin/AdminTools";
// import { adminService } from "@services/adminService";

const AdminDashboard = () => {
	const { user } = useAuth();
	const { notification, hideNotification, showSuccess } = useNotification();

	// Statistiques
	const [systemStats, setSystemStats] = useState(null);
	const [userStats, setUserStats] = useState(null);
	const [campaignStats, setCampaignStats] = useState(null);
	const [revenueStats, setRevenueStats] = useState(null);
	const [loadingStats, setLoadingStats] = useState(true);

	// Users
	const [users, setUsers] = useState([]);
	const [loadingUsers, setLoadingUsers] = useState(true);

	// Activities
	const [activities, setActivities] = useState([]);
	const [loadingActivities, setLoadingActivities] = useState(true);

	// États pour les revenus
	const [revenueData, setRevenueData] = useState([]);
	const [loadingRevenue, setLoadingRevenue] = useState(true);

	// Main Indicators
	const getMainIndicators = () => [
		{
			title: "Utilisateurs totaux",
			value: userStats?.totalUsers || 0,
			subtitle: `+${userStats?.newUsersThisMonth || 0} ce mois`,
			trend: userStats?.userGrowthPercent || 0,
			icon: <BsPersonFill size={20} />,
		},
		{
			title: "Campagnes actives",
			value: campaignStats?.activeCampaigns || 0,
			subtitle: `${campaignStats?.totalCampaigns || 0} au total`,
			trend: campaignStats?.campaignGrowthPercent || 0,
			icon: <BsCollection size={20} />,
		},
		{
			title: "Revenus mensuels",
			value: `${revenueStats?.currentMonthRevenue || 0}€`,
			subtitle: "Ce mois",
			trend: revenueStats?.revenueGrowthPercent || 0,
			icon: <BsCurrencyEuro size={20} />,
		},
		{
			title: "Taux d'engagement",
			value: `${systemStats?.engagementRate || 0}%`,
			subtitle: "Moyenne générale",
			trend: systemStats?.engagementTrend || 0,
			icon: <BsGraphUp size={20} />,
		},
	];

	// Load data
	useEffect(() => {
		const loadData = async () => {
			setSystemStats({ engagementRate: 25, engagementTrend: 5 });
			setUserStats({
				totalUsers: 1450,
				newUsersThisMonth: 50,
				userGrowthPercent: 10,
			});
			setCampaignStats({
				activeCampaigns: 120,
				totalCampaigns: 500,
				campaignGrowthPercent: 15,
			});
			setRevenueStats({ currentMonthRevenue: 950, revenueGrowthPercent: 20 });
			setTimeout(() => {
				setLoadingStats(false);
			}, 3000);
		};

		const loadActivities = async () => {
			setActivities([
				{
					type: "user_registered",
					message: "Nouvel utilisateur inscrit: tahiry@gmail.com",
					timestamp: new Date(Date.now() - 5 * 60 * 1000),
				},
				{
					type: "campaign_created",
					message: "Nouvelle campagne créée: 'Promotion Été 2025' par nathan",
					timestamp: new Date(Date.now() - 15 * 60 * 1000),
				},
				{
					type: "payment_received",
					message: "Paiement reçu: 29,99€ - Plan Pro",
					timestamp: new Date(Date.now() - 30 * 60 * 1000),
				},
				{
					type: "system",
					message: "Sauvegarde automatique effectuée",
					timestamp: new Date(Date.now() - 60 * 60 * 1000),
				},
				{
					type: "user_registered",
					message: "Nouvel utilisateur inscrit: nathan@gmail.com",
					timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
				},
			]);
			setTimeout(() => {
				setLoadingActivities(false);
			}, 1000);
		};

		const loadRevenueData = async () => {
			const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"];
			setRevenueData(
				months.map((month) => ({
					month,
					value: Math.floor(Math.random() * 5000) + 1000,
				}))
			);
			setTimeout(() => {
				setLoadingRevenue(false);
			}, 1000);
		};

		// Simulate users
		const simulateUsers = () => {
			setUsers([
				{
					id: 1,
					name: "Nathan Nathan",
					email: "nathan@gmail.com",
					role: "pro",
					status: "active",
					campaigns_count: 12,
					created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				},
				{
					id: 2,
					name: "Tahiry Tahiry",
					email: "tahiry@gmail.com",
					role: "free",
					status: "active",
					campaigns_count: 3,
					created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
				},
				{
					id: 3,
					name: "Lisa Lisa",
					email: "lisa@gmail.com",
					role: "admin",
					status: "active",
					campaigns_count: 25,
					created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				},
			]);
			setLoadingUsers(false);
		};

		setTimeout(loadData, 1000);
		setTimeout(() => {
			simulateUsers();
		}, 1500);
		setTimeout(loadActivities, 2000);
		setTimeout(loadRevenueData, 2500);
	}, []);

	// Gestionnaires d'événements
	const handleViewUser = (user) => {
		showSuccess(`Consultation du profil de ${user.name}`);
	};

	const handleEditUser = (user) => {
		showSuccess(`Édition du profil de ${user.name}`);
	};

	const handleDeleteUser = (user) => {
		if (
			window.confirm(
				`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`
			)
		) {
			showSuccess(`Utilisateur ${user.name} supprimé`);
			setUsers(users.filter((u) => u.id !== user.id));
		}
	};

	const handleExport = (type) => {
		showSuccess(`Export des ${type} lancé`);
	};

	const handleBackup = (type) => {
		showSuccess(`Sauvegarde ${type} lancée`);
	};

	const handleNotification = () => {
		showSuccess("Interface de notification ouverte");
	};

	return (
		<>
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={hideNotification}
				autoHide={true}
				duration={5000}
				position="top-center"
				showProgressBar={true}
			/>

			<NavBar />

			<div className="container flex flex-col gap-6 mx-auto my-4">
				<section>
					<div className="flex items-center justify-between gap-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl font-bold flex items-center gap-3">
								<BsShield className="text-green-600" />
								Dashboard Administrateur
							</h1>
							<p className="text-gray-600 dark:text-gray-400">
								Bienvenue {user?.name}, gérez votre plateforme PostNova
							</p>
						</div>
						<div className="flex items-center gap-3">
							<Button variant="outline" color="neutral">
								<div className="flex items-center gap-2">
									<BsDownload size={16} />
									<span>Rapport</span>
								</div>
							</Button>
							<Button color="primary">
								<div className="flex items-center gap-2">
									<BsBell size={16} />
									<span>Notifications</span>
								</div>
							</Button>
						</div>
					</div>
				</section>

				{/* Main indicators */}
				<section>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{getMainIndicators().map((indicator, index) => (
							<AdminStatsCard
								key={index}
								title={indicator.title}
								value={indicator.value}
								subtitle={indicator.subtitle}
								trend={indicator.trend}
								icon={indicator.icon}
								isLoading={loadingStats}
							/>
						))}
					</div>
				</section>

				{/* Detail statistics */}
				<section>
					<SectionBlock title="Statistiques détaillées" icon={<BsGraphUp />}>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<Card>
								<div className="text-center space-y-2">
									<div className="flex items-center justify-center gap-2">
										<BsEye size={24} className="text-blue-500" />
										<div className="text-2xl font-bold">
											{campaignStats?.totalViews?.toLocaleString() || "0"}
										</div>
									</div>
									<div className="text-sm text-gray-500">Vues totales</div>
								</div>
							</Card>
							<Card>
								<div className="text-center space-y-2">
									<div className="flex items-center justify-center gap-2">
										<BsHeart size={24} className="text-red-500" />
										<div className="text-2xl font-bold">
											{campaignStats?.totalLikes?.toLocaleString() || "0"}
										</div>
									</div>
									<div className="text-sm text-gray-500">Likes totaux</div>
								</div>
							</Card>
							<Card>
								<div className="text-center space-y-2">
									<div className="flex items-center justify-center gap-2">
										<BsShare size={24} className="text-green-500" />
										<div className="text-2xl font-bold">
											{campaignStats?.totalShares?.toLocaleString() || "0"}
										</div>
									</div>
									<div className="text-sm text-gray-500">Partages totaux</div>
								</div>
							</Card>
							<Card>
								<div className="text-center space-y-2">
									<div className="flex items-center justify-center gap-2">
										<BsPeople size={24} className="text-purple-500" />
										<div className="text-2xl font-bold">
											{userStats?.activeUsersToday?.toLocaleString() || "0"}
										</div>
									</div>
									<div className="text-sm text-gray-500">Utilisateurs actifs</div>
								</div>
							</Card>
						</div>
					</SectionBlock>
				</section>

				{/* Main content */}
				<section>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-6">
							{/* User management */}
							<UserManagement
								users={users}
								showSearch={true}
								onView={handleViewUser}
								onEdit={handleEditUser}
								onDelete={handleDeleteUser}
								isLoading={loadingUsers}
							/>

							{/* Revenue chart */}
							<RevenueChart data={revenueData} isLoading={loadingRevenue} />
						</div>

						{/* Aside */}

						<div className="space-y-6">
							<ActivityFeed activities={activities} isLoading={loadingActivities} />

							<AdminTools
								onExport={handleExport}
								onBackup={handleBackup}
								onNotification={handleNotification}
								isLoading={loadingStats}
							/>

							<Card>
								<div className="space-y-4">
									<h3 className="text-lg font-semibold flex items-center gap-2">
										<BsServer />
										Système
									</h3>
									<div className="space-y-3">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-500">Uptime:</span>
											<span className="font-medium text-green-600">99.9%</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-500">Utilisation CPU:</span>
											<span className="font-medium">23%</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-500">Mémoire:</span>
											<span className="font-medium">1.2GB / 4GB</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-500">Stockage:</span>
											<span className="font-medium">45GB / 100GB</span>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default AdminDashboard;
