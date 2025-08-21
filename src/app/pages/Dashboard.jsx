import React, { useEffect, useState } from "react";
import {
	BsBarChartLine,
	BsBullseye,
	BsCameraVideo,
	BsEye,
	BsFileEarmarkText,
	BsHeart,
	BsLightningCharge,
	BsPieChart,
	BsPlus,
} from "react-icons/bs";
import { Link } from "react-router";
import useAuth from "@hooks/useAuth";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import Indicator from "@components/Dashboard/Indicator";
import SectionBlock from "@layouts/SectionBlock";
import LastCampaignList from "@layouts/Dashboard/CampaignList";
import { campaignService } from "@services/campaignService";
import { tarifUserService } from "@services/tarifUserService";
import { promptService } from "@services/promptService";
import { dashboardService } from "@services/dashboardService";

const DashboardUser = () => {
	const { user } = useAuth();
	const [userInfo, setUserInfo] = useState({
		name: "",
	});

	const indicatorBase = [
		{
			key: "totalCampaigns",
			title: "Total campagnes",
			icon: <BsBarChartLine />,
		},
		{
			key: "totalViews",
			title: "Vues totales",
			icon: <BsEye />,
		},
		{
			key: "totalLikes",
			title: "Likes totales",
			icon: <BsHeart />,
		},
		{
			key: "totalShares",
			title: "Partages totales",
			icon: <BsBullseye />,
		},
	];

	const [indicator, setIndicator] = useState(
		indicatorBase.map((item) => ({
			...item,
			number: null,
			information: "",
		}))
	);

	const [loadingIndicator, setLoadingIndicator] = useState(true);

	const [campaigns, setCampaigns] = useState();

	const [loadingCampaigns, setLoadingCampaigns] = useState(true);

	const [tarif, setTarif] = useState(null);

	const [quotaPrompt, setQuotaPrompt] = useState(null);

	useEffect(() => {
		// Fetch user from token
		const fetchUserInfo = async () => {
			// then
			const user = { name: "Alex" };
			setUserInfo(user);
		};

		let timeoutUserInfo = setTimeout(() => {
			fetchUserInfo();
		}, 1500);

		// Fetch indicator
		const fetchIndicator = async () => {
			if (!user?.id) return;

			try {
				const result = await dashboardService.getIndicators(user.id);
				if (result.success && result.data) {
					const data = result.data;

					// Met à jour les données des indicateurs
					setIndicator((prev) =>
						prev.map((item) => {
							switch (item.key) {
								case "totalCampaigns":
									return {
										...item,
										number: data.totalCampaigns,
										information: "Campagnes",
									};
								case "totalViews":
									return {
										...item,
										number: data.externalInteractions.views,
										information: `Vues`,
									};
								case "totalLikes":
									return {
										...item,
										number: data.externalInteractions.likes,
										information: `Likes`,
									};
								case "totalShares":
									return {
										...item,
										number: data.externalInteractions.shares,
										information: "Partages",
									};
								default:
									return item;
							}
						})
					);
				}
			} catch (e) {
				console.error("Erreur de chargement des indicateurs:", e);
			}
			setLoadingIndicator(false);
		};
		const intervalIndicator = setInterval(fetchIndicator, 2000);

		// Fetch campaign list
		const fetchCampaign = async () => {
			setLoadingCampaigns(true);
			const result = await campaignService.getAllCampaigns();
			if (result.success) {
				setCampaigns(result.data.data);
			} else {
				console.error(result.message);
				setCampaigns([]);
			}

			setLoadingCampaigns(false);
		};
		const timeoutCampaign = setTimeout(fetchCampaign, 2000);

		const fetchLatestTarif = async () => {
			if (!user?.id) return;

			try {
				const result = await tarifUserService.getLatestByUserId(user.id);
				if (result.success && result.data) {
					setTarif(result.data.data);
				} else {
					console.error("Erreur tarif:", result.message);
					setTarif(null);
				}
			} catch (e) {
				console.error("Erreur réseau:", e);
				setTarif(null);
			}
		};
		const timeoutTarif = setTimeout(fetchLatestTarif, 2000);

		const fetchPromptQuota = async () => {
			if (!user?.id) return;

			try {
				const result = await promptService.getQuotaByUserId(user.id);
				if (result.success && result.data !== null) {
					setQuotaPrompt(result.data.data);
				} else {
					console.error("Erreur quota prompt:", result.message);
					setQuotaPrompt(null);
				}
			} catch (e) {
				console.error("Erreur réseau (prompt quota):", e);
				setQuotaPrompt(null);
			}
		};
		const timeoutPromptQuota = setTimeout(fetchPromptQuota, 2000);

		return () => {
			clearTimeout(timeoutUserInfo);
			clearInterval(intervalIndicator);
			clearTimeout(timeoutCampaign);
			clearTimeout(timeoutTarif);
			clearTimeout(timeoutPromptQuota);
			setUserInfo({ name: "" });
			setIndicator((prev) =>
				prev.map((item) => ({
					...item,
					number: null,
					information: "",
				}))
			);
		};
	}, []);

	return (
		<>
			<div className="container flex flex-col gap-6 mx-auto my-4">
				<section>
					<div className="flex items-center justify-between gap-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl font-bold">Bonjour, {user?.name}</h1>
							<p>
								Créez ou gérez des campagnes marketing complètes en moins d'une minute
								grâce à l'IA
							</p>
						</div>
						<div>
							<Button as={Link} to={'/campaign/new'} className="pe-2">
								<div className="flex items-center">
									<span>Créer une campagne</span>
									<BsPlus size={24} />
								</div>
							</Button>
						</div>
					</div>
				</section>
				<section>
					<div className="flex justify-between gap-6">
						{indicator.map((item, i) => (
							<div key={i} className="w-full">
								<Indicator
									title={item.title}
									number={item.number}
									information={item.information}
									icon={item.icon}
									isLoading={loadingIndicator}
								/>
							</div>
						))}
					</div>
				</section>
				<section>
					<div className="grid grid-cols-6 items-start gap-6">
						<div className="col-span-4">
							<LastCampaignList campaigns={campaigns} isLoading={loadingCampaigns} />
						</div>
						<div className="col-span-2 grid grid-cols-1 gap-6">
							<SectionBlock title={"Quota utilisé"} icon={<BsPieChart />}>
								<div className="flex items-center justify-between gap-2">
									<span>Quotas</span>
									<strong>
										{quotaPrompt?.daily_quota_used ?? "..."}/
										{tarif?.tarif?.max_limit ?? "..."}
									</strong>
								</div>
								<div className="w-full bg-[var(--color-gray)] rounded-full h-2.5 mt-2">
									<div
										className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
										style={{
											width:
												tarif?.tarif?.max_limit != null &&
												quotaPrompt?.daily_quota_used != null
													? `${Math.min((quotaPrompt.daily_quota_used / tarif?.tarif?.max_limit) * 100, 100)}%`
													: "0%",
										}}
									></div>
								</div>
								<div className="mt-4">
									<span>
										Il vous reste{" "}
										{tarif?.tarif?.max_limit != null && quotaPrompt?.daily_quota_used != null
											? tarif.tarif.max_limit - quotaPrompt.daily_quota_used
											: "..."}{" "}
										quotas aujourd'hui.
									</span>
								</div>
							</SectionBlock>
							<div className="opacity-50">
								<SectionBlock title={"Actions rapides"} icon={<BsLightningCharge />}>
									<div className="bg-gray-600/5 text-center space-y-2 p-4 rounded-lg">
										<p className="text-gray-400">
											Fonctionnalité disponible en version Pro
										</p>
										<Button variant="outline">Découvrir Pro</Button>
									</div>
									<ul className="relative space-y-4 mt-4">
										<li>
											<a href="#">
												<div className="flex items-center gap-2">
													<Card styles={"w-full py-3"}>
														<div className="flex items-center gap-4">
															<BsCameraVideo size={16} className="text-gray-400" />
															<span>Créer une vidéo</span>
														</div>
													</Card>
												</div>
											</a>
										</li>
										<li>
											<a href="#">
												<div className="flex items-center gap-2">
													<Card styles={"w-full py-3"}>
														<div className="flex items-center gap-4">
															<BsFileEarmarkText size={16} className="text-gray-400" />
															<span>Générer une landing page</span>
														</div>
													</Card>
												</div>
											</a>
										</li>
										<li>
											<a href="#">
												<div className="flex items-center gap-2">
													<Card styles={"w-full py-3"}>
														<div className="flex items-center gap-4">
															<BsFileEarmarkText size={16} className="text-gray-400" />
															<span>Post Linkedin</span>
														</div>
													</Card>
												</div>
											</a>
										</li>
										<div className="absolute w-full h-full top-0 backdrop-blur-[1px] z-10"></div>
									</ul>
								</SectionBlock>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default DashboardUser;
