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
import useAuth from "@hooks/useAuth";
import NavBar from "@layouts/NavBar";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import Indicator from "@components/Dashboard/Indicator";
import SectionBlock from "@layouts/SectionBlock";
import LastCampaignList from "@layouts/Dashboard/CampaignList";

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
			key: "engagement",
			title: "Engagement",
			icon: <BsHeart />,
		},
		{
			key: "conversions",
			title: "Conversions",
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
		const fetchIndicator = () => {
			// then
			setIndicator((prev) =>
				prev.map((item) => ({
					...item,
					number: (parseFloat(item.number ?? 0) + Math.random() * 10).toFixed(1),
					information: `+${Math.floor(Math.random() * 10)}% ce mois`,
				}))
			);
			// finally
			setLoadingIndicator(false);
		};
		const intervalIndicator = setInterval(fetchIndicator, 2000);

		// Fetch campaign list
		const fetchCampaign = () => {
			// then
			setCampaigns([
				{
					id: 1,
					name: "Lancement Produit SaaS B2B",
					status: "Terminé",
					createdAt: new Date().toLocaleString(),
					videoNumber: 2,
					imageNumber: 4,
					landingPageNumber: 3,
					views: 10,
					likes: 4,
					share: 2,
				},
				{
					id: 2,
					name: "Campagne Formation IA",
					status: "Terminé",
					createdAt: new Date().toLocaleString(),
					videoNumber: 4,
					imageNumber: 2,
					landingPageNumber: 2,
					views: 5,
					likes: 1,
					share: 1,
				},
			]);
			// finally
			setLoadingCampaigns(false);
		};
		const timeoutCampaign = setTimeout(fetchCampaign, 2000);

		return () => {
			clearTimeout(timeoutUserInfo);
			clearInterval(intervalIndicator);
			clearTimeout(timeoutCampaign);
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
			<NavBar />
			<div className="container flex flex-col gap-6 mx-auto my-4">
				<section>
					<div className="flex items-center justify-between gap-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl font-bold">Bonjour, {user?.name}</h1>
							<p>
								Créez des campagnes marketing complètes en moins d'une minute grâce à
								l'IA
							</p>
						</div>
						<div>
							<Button color="blue">
								<div className="flex items-center gap-4">
									<BsPlus size={24} />
									<span>Créer une campagne</span>
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
									<span>Campagnes</span>
									<strong>2/5</strong>
								</div>
								<div className="w-full bg-[var(--color-gray)] rounded-full h-2.5 mt-2">
									<div
										className={`bg-blue-600 h-2.5 rounded-full ${userInfo.name ? "w-1/2" : "w-0"} transition-all duration-1000`}
									></div>
								</div>
								<div className="mt-4">
									<span>
										Il vous reste {userInfo.name ? "3" : "0"} campagnes ce mois-ci.
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
