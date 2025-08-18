import React, { Suspense, useEffect, useState } from "react";
import {
	BsBarChartLine,
	BsFacebook,
	BsInstagram,
	BsLinkedin,
	BsPencilFill,
	BsPieChart,
	BsPlus,
	BsTiktok,
} from "react-icons/bs";
import { Link, useLocation } from "react-router";
import useModal from "@hooks/useModal";
import SectionBlock from "@layouts/SectionBlock";
import NewRequest from "@layouts/Campaign/NewRequest";
import Tag from "@shared/Tag";
import Button from "@shared/Button";
import Modal from "@shared/Modal";
import CampaignOverviewItem from "@components/Campaign/CampaignOverviewItem";
import CampaignPostItem from "@components/Campaign/CampaignPostItem";
import * as Feature from "@components/Campaign/Features";
import CampaignImageItem from "@components/Campaign/CampaignImageItem";
import CampaignLandingPageItem from "@components/Campaign/CampaignLandingPageItem";
import EditCampaign from "@layouts/Campaign/EditCampaign";

const Detail = () => {
	const location = useLocation();
	const { isOpen, openModal, closeModal } = useModal();
	const [isPreview, setIsPreview] = useState(false);

	const features = [
		{
			name: "Vue d'ensemble",
			link: "",
		},
		{
			name: "Publications",
			link: "#posts",
		},
		{
			name: "Images",
			link: "#images",
		},
		{
			name: "Landing page",
			link: "#landing-page",
		},
	];

	const [featuresMemo] = useState(features);

	const [activeTab, setActiveTab] = useState(0);

	const [campaignOverviews, setCampaignOverviews] = useState([]);
	const [loadingCampaignOverviews, setLoadingCampaignOverviews] = useState(true);

	const [campaignPosts, setCampaignPosts] = useState([]);
	const [loadingCampaignPosts, setLoadingCampaignPosts] = useState(true);

	const [campaignImages, setCampaignImages] = useState([]);
	const [loadingCampaignImages, setLoadingCampaignImages] = useState(true);

	const [campaignLandingPages, setCampaignLandingPages] = useState([]);
	const [loadingCampaignLandingPages, setLoadingCampaignLandingPages] =
		useState(true);

	useEffect(() => {
		// Simulate fetching campaign prompts data
		const fetchedCampaignOverviews = [
			{
				id: 1,
				created_at: "2023-10-01T12:00:00Z",
				prompt: "Lancement de la nouvelle fonctionnalité de mon produit",
				tags: ["Images", "Facebook", "Landing"],
			},
			{
				id: 2,
				created_at: "2023-10-05T14:30:00Z",
				prompt: "Campagne de sensibilisation de ce marque",
				tags: ["Images", "Facebook", "Instagram", "Linkedin", "Landing"],
			},
			{
				id: 3,
				created_at: "2023-10-10T09:15:00Z",
				prompt: "Promotion de la nouvelle fonctionnalité du produit",
				tags: ["Images", "Facebook", "Linkedin", "Landing"],
			},
		];
		setTimeout(() => {
			setCampaignOverviews(fetchedCampaignOverviews);
			setLoadingCampaignOverviews(false);
		}, 2000);

		// Simulate fetching campaign post data
		const fetchedCampaignPosts = [
			{
				id: 1,
				created_at: "2023-10-01T12:00:00Z",
				social: "TikTok",
				content:
					"Iure necessitatibus deleniti, magni hic laboriosam sit, et architecto doloribus facere inventore quis, ea eaque eveniet magnam odio corporis rem tenetur libero.",
			},
			{
				id: 2,
				created_at: "2023-10-05T14:30:00Z",
				social: "Facebook",
				content:
					"Nihil est tempore inventore, consectetur adipisicing elit et architecto ?",
			},
		];
		setTimeout(() => {
			setCampaignPosts(fetchedCampaignPosts);
			setLoadingCampaignPosts(false);
		}, 2000);

		// Simulate fetching campaign image data
		const fetchedCampaignImages = [
			{
				id: 1,
				created_at: "2023-10-01T12:00:00Z",
				social: "TikTok",
				content:
					"Iure necessitatibus deleniti, magni hic laboriosam sit, et architecto doloribus facere inventore quis, ea eaque eveniet magnam odio corporis rem tenetur libero.",
			},
			{
				id: 2,
				created_at: "2023-10-05T14:30:00Z",
				social: "Facebook",
				content:
					"Nihil est tempore inventore, consectetur adipisicing elit et architecto ?",
			},
		];
		setTimeout(() => {
			setCampaignImages(fetchedCampaignImages);
			setLoadingCampaignImages(false);
		}, 2000);

		// Simulate fetching campaign landing page data
		const fetchedCampaignLandingPages = [
			{
				id: 1,
				created_at: "2023-10-01T12:00:00Z",
				title: "Landing page 1",
				content: "",
			},
			{
				id: 2,
				created_at: "2023-10-05T14:30:00Z",
				title: "Landing page 2",
				content: "",
			},
		];
		setTimeout(() => {
			setCampaignLandingPages(fetchedCampaignLandingPages);
			setLoadingCampaignLandingPages(false);
		}, 2000);

		// Set active tab based on current location
		const currentHash = location?.hash.replace("#", "");
		const activeFeatureIndex = featuresMemo.findIndex(
			(feature) => feature.link.replace("#", "") === currentHash
		);
		setActiveTab(activeFeatureIndex >= 0 ? activeFeatureIndex : 0);
	}, [featuresMemo, location]);

	const renderItemByTab = (tabIndex) => {
		switch (tabIndex) {
			case 0:
				return loadingCampaignOverviews ? (
					<CampaignOverviewItem
						campaignOverview={[]}
						isLoading={loadingCampaignOverviews}
					/>
				) : campaignOverviews.length > 0 ? (
					campaignOverviews.map((campaignPrompt) => (
						<CampaignOverviewItem
							key={campaignPrompt.id}
							campaignOverview={campaignPrompt}
							isLoading={loadingCampaignOverviews}
							onClick={() => openModal("overview")}
						/>
					))
				) : (
					<p className="text-gray-500 text-center mt-4">Aucune requête trouvée.</p>
				);
			case 1:
				return loadingCampaignPosts ? (
					<CampaignPostItem campaignPost={[]} isLoading={loadingCampaignPosts} />
				) : campaignPosts.length > 0 ? (
					campaignPosts.map((campaignPost) => (
						<CampaignPostItem
							key={campaignPost.id}
							campaignPost={campaignPost}
							isLoading={loadingCampaignPosts}
							onClick={() => openModal("post")}
						/>
					))
				) : (
					<p className="text-gray-500 text-center mt-4">
						Aucune publication trouvée.
					</p>
				);
			case 2:
				return loadingCampaignImages ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<CampaignImageItem campaignImage={[]} isLoading={loadingCampaignImages} />
						<CampaignImageItem campaignImage={[]} isLoading={loadingCampaignImages} />
					</div>
				) : campaignImages.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{campaignImages.map((campaignImage) => (
							<CampaignImageItem
								key={campaignImage.id}
								campaignImage={campaignImage}
								isLoading={loadingCampaignImages}
								onClick={() => openModal("image")}
							/>
						))}
					</div>
				) : (
					<p className="text-gray-500 text-center mt-4">Aucune image trouvée.</p>
				);
			case 3:
				return loadingCampaignLandingPages ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<CampaignLandingPageItem
							campaignLandingPage={[]}
							isLoading={loadingCampaignLandingPages}
						/>
						<CampaignLandingPageItem
							campaignLandingPage={[]}
							isLoading={loadingCampaignLandingPages}
						/>
					</div>
				) : campaignLandingPages.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{campaignLandingPages.map((campaignLandingPage) => (
							<CampaignLandingPageItem
								key={campaignLandingPage.id}
								campaignLandingPage={campaignLandingPage}
								isLoading={loadingCampaignLandingPages}
								onClick={() => openModal("landing-page")}
							/>
						))}
					</div>
				) : (
					<p className="text-gray-500 text-center mt-4">Aucune page trouvée.</p>
				);
			default:
				return <p>Vue d'ensemble</p>;
		}
	};

	return (
		<>
			<div className="container mx-auto">
				<section className="py-4">
					<div className="space-y-2">
						<span className="flex items-center gap-4 text-3xl font-bold">
							<h1>Nom de la Campagne</h1>
							<Tag color="red">En cours...</Tag>
						</span>
						<p className="text-gray-500">
							Ici, vous pouvez voir les détails de votre campagne, y compris les
							statistiques, les performances et les résultats.{" "}
							<Button
								variant="ghost"
								size="none"
								onClick={() => openModal("edit-campaign")}
							>
								<BsPencilFill size={14} />
							</Button>
						</p>
					</div>
				</section>
				<section className="text-center py-4">
					<Button
						variant="solid"
						className="flex items-center gap-2"
						onClick={() => openModal("new-request")}
					>
						<span>Ajouter une nouvelle requête</span>
						<BsPlus size={20} className="text-white" />
					</Button>
				</section>
				<section className="flex items-start gap-6 py-4">
					<div className="flex-3/4">
						<div className="flex items-end text-center border-b-2 border-b-gray-500/10">
							{features.map((feature, id) => (
								<Button
									key={id}
									variant="ghost"
									as={Link}
									to={feature.link}
									color="tertiary"
									className={`bg-gray-500/10 rounded-b-none px-6 pb-1 hover:bg-gray-500/10 -mb-0.5 border-b-2 transition-all duration-300 ${
										activeTab === id
											? "bg-gray-500 border-b-purple-600"
											: "bg-transparent border-b-transparent"
									}`}
								>
									<span>{feature.name}</span>
								</Button>
							))}
						</div>
						<div className="my-4 space-y-4">{renderItemByTab(activeTab)}</div>
					</div>
					<aside className="flex-1/4 space-y-4">
						<SectionBlock title="Activités de la campagne" icon={<BsBarChartLine />}>
							<div className="my-2">
								<span className="text-sm font-semibold">
									Les réseaux sociaux utilisés
								</span>
								<div className="flex flex-wrap items-center gap-2 my-2">
									{[<BsFacebook />, <BsInstagram />, <BsTiktok />, <BsLinkedin />].map(
										(icon, index) => (
											<Button
												key={index}
												variant="outline"
												circle
												size="none"
												className="p-2"
											>
												{React.cloneElement(icon, { size: 20 })}
											</Button>
										)
									)}
								</div>
							</div>
							<div className="my-2">
								<span className="text-sm font-semibold">Mentions j'aime</span>
								<div className="my-2">
									<div className="table bg-linear-0 from-gray-500/10 to-transparent rounded-xl px-4 py-2">
										<strong className="text-2xl">2</strong>
									</div>
								</div>
							</div>
						</SectionBlock>
						<SectionBlock title={"Quota utilisé"} icon={<BsPieChart />}>
							<div className="flex items-center justify-between gap-2">
								<span>Campagnes</span>
								<strong>2/5</strong>
							</div>
							<div className="w-full bg-[var(--color-gray)] rounded-full h-2.5 mt-2">
								<div
									className={`bg-blue-600 h-2.5 rounded-full w-1/2 transition-all duration-1000`}
								></div>
							</div>
							<div className="mt-4">
								<span>Il vous reste 3 campagnes ce mois-ci.</span>
							</div>
						</SectionBlock>
					</aside>
				</section>

				<Modal isOpen={isOpen("edit-campaign")} onClose={closeModal} size="xl">
					<Suspense fallback={<div>Chargement...</div>}>
						<EditCampaign />
					</Suspense>
				</Modal>

				<Modal isOpen={isOpen("new-request")} onClose={closeModal} size="xl">
					<Suspense fallback={<div>Chargement...</div>}>
						<NewRequest />
					</Suspense>
				</Modal>

				<Modal isOpen={isOpen("overview")} onClose={closeModal} size="auto">
					<Suspense fallback={<div>Chargement...</div>}>
						<Feature.Overview />
					</Suspense>
				</Modal>

				<Modal isOpen={isOpen("post")} onClose={closeModal} size="xl">
					<Suspense fallback={<div>Chargement...</div>}>
						<Feature.Post />
					</Suspense>
				</Modal>

				<Modal
					isOpen={isOpen("image")}
					onClose={() => {
						closeModal();
						setIsPreview(false);
					}}
					size={isPreview ? "full" : "fit"}
				>
					<Suspense fallback={<div>Chargement image...</div>}>
						<Feature.Image
							previewActive={isPreview}
							onTogglePreview={() => setIsPreview((prev) => !prev)}
						/>
					</Suspense>
				</Modal>

				<Modal
					isOpen={isOpen("landing-page")}
					onClose={() => {
						closeModal();
						setIsPreview(false);
					}}
					size={isPreview ? "full" : "fit"}
				>
					<Suspense fallback={<div>Chargement...</div>}>
						<Feature.LandingPage
							previewActive={isPreview}
							onTogglePreview={() => setIsPreview((prev) => !prev)}
						/>
					</Suspense>
				</Modal>
			</div>
		</>
	);
};

export default Detail;
