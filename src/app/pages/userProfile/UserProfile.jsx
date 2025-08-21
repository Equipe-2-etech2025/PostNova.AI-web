import React, { useEffect, useState } from "react";
import {
	BsLightbulb,
	BsFileEarmark,
	BsBarChartLine,
	BsPlus,
	BsTrophy,
	BsPieChart,
} from "react-icons/bs";
import useAuth from "@hooks/useAuth";
import { dashboardService } from "@services/dashboardService";
import { tarifUserService } from "@services/tarifUserService";
import { promptService } from "@services/promptService";
import { campaignService } from "@services/campaignService";
import { userService } from "@services/userService";
import { suggestionService } from "@services/suggestionService";
import ProfileHeader from "@components/UserProfile/ProfileHeader";
import QuickActions from "@components/UserProfile/QuickActions";
import StatsSection from "@components/UserProfile/StatsSection";
import CampaignHistory from "@components/UserProfile/CampaignHistory";
import PersonalizedSuggestions from "@components/UserProfile/PersonalizedSuggestions";
import ActivityTimeline from "@components/UserProfile/ActivityTimeline";
import ProfileInfo from "@components/UserProfile/ProfileInfo";
import QuickSettings from "@components/UserProfile/QuickSettings";

const UserProfile = () => {
	const { user, setUser } = useAuth();
	const [userStats, setUserStats] = useState({
		totalCampaigns: 0,
		mentionJaime: 0,
	});
	const [tarif, setTarif] = useState(null);
	const [quotaPrompt, setQuotaPrompt] = useState(null);
	const [loadingStats, setLoadingStats] = useState(true);
	const [campaigns, setCampaigns] = useState([]);
	const [loadingCampaigns, setLoadingCampaigns] = useState(true);
	const [profileImage, setProfileImage] = useState(null);
	const [isMobileSettingsCollapsed, setIsMobileSettingsCollapsed] =
		useState(true);
	const [recentActivity, setRecentActivity] = useState([]);
	const [loadingActivity, setLoadingActivity] = useState(true);

	// États pour les sections collapsibles
	const [expandedSections, setExpandedSections] = useState({
		campaigns: true,
		suggestions: true,
		timeline: true,
	});

	const [suggestions, setSuggestions] = useState([]);
	const [loadingSuggestions, setLoadingSuggestions] = useState(true);

	const getInitials = (name) => {
		if (!name) return "AK";
		return name
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase())
			.join("")
			.substring(0, 2);
	};

	const toggleSection = (section) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleProfileImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setProfileImage(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSaveProfile = async (updatedData) => {
		try {
			const result = await userService.updateUser(user.id, updatedData);
			if (result.success) {
				setUser({
					...user,
					...updatedData,
				});
			} else {
				console.error("Erreur mise à jour :", result.message);
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour :", error);
		}
	};

	useEffect(() => {
		const fetchUserStats = async () => {
			if (!user?.id) return;
			try {
				const result = await dashboardService.getIndicators(user.id);
				if (result.success && result.data) {
					const data = result.data;
					setUserStats({
						totalCampaigns: data.totalCampaigns || 0,
						mentionJaime: data.externalInteractions.likes || 0,
					});
				}
			} catch (e) {
				console.error("Erreur de chargement des statistiques:", e);
			}
			setLoadingStats(false);
		};

		const fetchAllData = async () => {
			if (!user?.id) return;

			setLoadingCampaigns(true);
			setLoadingActivity(true);

			try {
				const [campaignResult, tarifResult, quotaResult] = await Promise.all([
					campaignService.getCampaignsByUserId(user.id),
					tarifUserService.getLatestByUserId(user.id),
					promptService.getQuotaByUserId(user.id),
				]);

				// Campagnes
				let campaigns = [];
				if (campaignResult.success && campaignResult.data?.data) {
					campaigns = campaignResult.data.data;
					setCampaigns(campaigns);
				} else {
					setCampaigns([]);
				}

				// Tarif
				let currentTarif = null;
				if (tarifResult.success && tarifResult.data) {
					currentTarif = tarifResult.data.data;
					setTarif(currentTarif);
				} else {
					setTarif(null);
				}

				// Quota
				let currentQuota = null;
				if (quotaResult.success && quotaResult.data !== null) {
					currentQuota = quotaResult.data.data;
					setQuotaPrompt(currentQuota);
				} else {
					setQuotaPrompt(null);
				}

				const activities = [];

				// 1. Dernière campagne
				if (campaigns.length > 0) {
					const sorted = [...campaigns].sort(
						(a, b) => new Date(b.created_at) - new Date(a.created_at)
					);
					const latest = sorted[0];
					activities.push({
						id: `campaign_${latest.id}`,
						type: "campaign_created",
						message: `Nouvelle campagne créée : '${latest.name}'`,
						date: latest.dates?.created_at || latest.created_at,
						icon: <BsPlus className="text-green-500" />,
					});
				}

				// 2. Quota utilisé
				if (currentQuota && currentTarif?.tarif) {
					activities.push({
						id: "quota_activity",
						type: "quota_used",
						message: `Quota utilisé : ${currentQuota.daily_quota_used || 0}/${currentTarif.tarif?.max_limit || 0} campagnes`,
						date: new Date().toISOString(),
						icon: <BsPieChart className="text-blue-500" />,
					});
				}

				// 3. Plan activé
				if (currentTarif?.tarif?.name && currentTarif?.created_at) {
					activities.push({
						id: "plan_pro",
						type: "plan_upgrade",
						message: `Plan ${currentTarif.tarif.name} activé avec succès`,
						date: currentTarif.created_at,
						icon: <BsTrophy className="text-yellow-500" />,
					});
				}

				// Trier et limiter à 5
				const sortedActivities = activities.sort(
					(a, b) => new Date(b.date) - new Date(a.date)
				);
				setRecentActivity(sortedActivities.slice(0, 5));
			} catch (error) {
				console.error("Erreur lors du chargement des données:", error);
				setCampaigns([]);
				setTarif(null);
				setQuotaPrompt(null);
				setRecentActivity([]);
			}

			setLoadingActivity(false);
			setLoadingCampaigns(false);
		};

		const fetchSuggestions = async () => {
			if (!user?.id) return;
			try {
				const result = await suggestionService.getSuggestions(user.id);
				setSuggestions(result.data.suggestions);
			} catch (error) {
				console.error("Erreur lors du chargement des suggestions:", error);
				setSuggestions([]);
			}
			setLoadingSuggestions(false);
		};

		const timeoutSuggestions = setTimeout(fetchSuggestions, 2000);
		const timeoutStats = setTimeout(fetchUserStats, 1000);
		const timeoutAll = setTimeout(fetchAllData, 1500);

		return () => {
			clearTimeout(timeoutStats);
			clearTimeout(timeoutAll);
			clearTimeout(timeoutSuggestions);
		};
	}, [user?.id]);

	return (
		<>
			<div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
				<div className="container mx-auto py-8 px-4">
					<ProfileHeader
						user={user}
						profileImage={profileImage}
						onImageUpload={handleProfileImageUpload}
						getInitials={getInitials}
						tarif={tarif}
					/>

					<QuickActions />

					<StatsSection
						userStats={userStats}
						loadingStats={loadingStats}
						quotaPrompt={quotaPrompt}
						tarif={tarif}
					/>

					<CampaignHistory
						campaigns={campaigns}
						loadingCampaigns={loadingCampaigns}
						expandedSections={expandedSections}
						toggleSection={toggleSection}
					/>

					<ActivityTimeline
						recentActivity={recentActivity}
						loadingActivity={loadingActivity}
						expandedSections={expandedSections}
						toggleSection={toggleSection}
					/>

					<PersonalizedSuggestions
						suggestions={suggestions}
						loadingSuggestions={loadingSuggestions}
						expandedSections={expandedSections}
						toggleSection={toggleSection}
					/>

					{/* Informations du profil et paramètres */}
					<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<ProfileInfo user={user} tarif={tarif} onSave={handleSaveProfile} />
						<QuickSettings
							isMobileSettingsCollapsed={isMobileSettingsCollapsed}
							setIsMobileSettingsCollapsed={setIsMobileSettingsCollapsed}
						/>
					</section>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
