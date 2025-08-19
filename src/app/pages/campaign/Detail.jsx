import React, { Suspense, useEffect, useState } from "react";
import {
	BsBarChartLine,
	BsTwitterX,
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
import CampaignPostItem from "@components/Campaign/CampaignPostItem";
import * as Feature from "@components/Campaign/Features";
import CampaignImageItem from "@components/Campaign/CampaignImageItem";
import CampaignLandingPageItem from "@components/Campaign/CampaignLandingPageItem";
import EditCampaign from "@layouts/Campaign/EditCampaign";
import { campaignService } from "@services/campaignService";
import { imageService } from "@services/imageService";
import { socialPostService } from "@services/socialPostService";
import { campaignInteractionService } from "@services/campaignInteractionService";
import ImagePreview from "@components/Campaign/Features/Image";
import { Card } from "@shared/Card";
import CampaignOverviewItem, {
	CampaignOverviewItemSkeleton,
} from "@components/Campaign/CampaignOverviewItem";

const Detail = () => {
	const location = useLocation();
	const { isOpen, openModal, closeModal } = useModal();
	const [isPreview, setIsPreview] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedPostId, setSelectedPostId] = useState(null);

	// States
	const [campaignName, setCampaignName] = useState("");
	const [campaignDescription, setCampaignDescription] = useState("");
	const [campaignOverviews, setCampaignOverviews] = useState([]);
	const [campaignPosts, setCampaignPosts] = useState([]);
	const [imageDetails, setImageDetails] = useState([]);
	const [campaignLandingPages, setCampaignLandingPages] = useState([]);
	const [interactionStats, setInteractionStats] = useState({
		likes: 0,
		views: 0,
		shares: 0,
	});
	const [loadingStats, setLoadingStats] = useState(true);

	// Loading states
	const [loadingCampaignOverviews, setLoadingCampaignOverviews] = useState(true);
	const [loadingCampaignPosts, setLoadingCampaignPosts] = useState(true);
	const [loadingCampaignImages, setLoadingCampaignImages] = useState(true);
	const [loadingCampaignLandingPages, setLoadingCampaignLandingPages] =
		useState(true);
	const [activeTab, setActiveTab] = useState(0);

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

	const getSocialLink = (socialId) => {
		switch (socialId) {
			case 1:
				return "https://www.tiktok.com";
			case 2:
				return "https://twitter.com";
			case 3:
				return "https://www.linkedin.com";
			default:
				return "#";
		}
	};

	const getSocialName = (socialId) => {
		switch (socialId) {
			case 1:
				return "TikTok";
			case 2:
				return "X (Twitter)";
			case 3:
				return "LinkedIn";
			default:
				return "Réseau social";
		}
	};

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const campaignId = location.pathname.split("/").pop();

				//Fetch stats
				setLoadingStats(true);
				const statsResponse =
					await campaignInteractionService.getCampaignStats(campaignId);
				if (statsResponse.success) {
					setInteractionStats(statsResponse.data);
				}

				// Fetch campaign details
				const campaignResponse = await campaignService.getCampaignById(campaignId);
				if (campaignResponse.success) {
					const { name, description } = campaignResponse.data.data;
					setCampaignName(name);
					setCampaignDescription(description);
				}

				// Fetch images
				setLoadingCampaignImages(true);
				const imagesResponse = await imageService.getAllImages();
				if (imagesResponse.success) {
					const campaignImages = imagesResponse.data.data.filter(
						(img) => img.campaign_id == campaignId
					);
					setImageDetails(campaignImages);
				}

				// Fetch posts
				setLoadingCampaignPosts(true);
				const postsResponse = await socialPostService.getAllSocialPost({
					campaign_id: campaignId,
				});
				if (postsResponse.success) {
					const campaignPosts = postsResponse.data.data.filter(
						(post) => post.campaign_id == campaignId
					);
					setCampaignPosts(campaignPosts);
				}

				const fetchedCampaignLandingPages = [
					{
						id: 1,
						created_at: "2023-10-01T12:00:00Z",
						title: "Landing page 1",
						content: "",
					},
				];
				setCampaignLandingPages(fetchedCampaignLandingPages);
			} catch (error) {
				console.error("Erreur lors de la récupération des données:", error);
			} finally {
				setLoadingCampaignOverviews(false);
				setLoadingCampaignPosts(false);
				setLoadingCampaignImages(false);
				setLoadingCampaignLandingPages(false);
				setLoadingStats(false);
			}
		};

		fetchAllData();

		const currentHash = location?.hash.replace("#", "");
		const activeFeatureIndex = featuresMemo.findIndex(
			(feature) => feature.link.replace("#", "") === currentHash
		);
		setActiveTab(activeFeatureIndex >= 0 ? activeFeatureIndex : 0);
	}, [featuresMemo, location]);

	const handleCampaignUpdateSuccess = () => {
		closeModal();
		const campaignId = location.pathname.split("/").pop();
		campaignService.getCampaignById(campaignId).then((response) => {
			if (response.success) {
				const { name, description } = response.data.data;
				setCampaignName(name);
				setCampaignDescription(description);
			}
		});
	};

	const formatDate = (dateString) => {
		if (!dateString) return "Date inconnue";
		const options = {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		return new Date(dateString).toLocaleDateString("fr-FR", options);
	};

	const renderItemByTab = (tabIndex) => {
		switch (tabIndex) {
			case 0:
				return loadingCampaignOverviews ||
					loadingCampaignPosts ||
					loadingCampaignImages ||
					loadingCampaignLandingPages ? (
					<div className="space-y-4">
						<CampaignOverviewItemSkeleton />
						<CampaignOverviewItemSkeleton />
						<CampaignOverviewItemSkeleton />
					</div>
				) : (
					<div className="space-y-6 px-10 mt-6">
						{/* Section Images */}
						{imageDetails.length > 0 && (
							<div className="mt-6">
								<h3 className="text-xl font-bold mb-4 px-10">
									Images générées ({imageDetails.length})
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{imageDetails.slice(0, 4).map((image) => (
										<CampaignImageItem
											key={image.id}
											campaignImage={{
												...image,
												content: image.path,
												formattedDate: formatDate(image.created_at),
											}}
											onClick={() => {
												setSelectedImage(image);
												openModal("image");
											}}
										/>
									))}
									{imageDetails.length > 4 && (
										<div className="mt-2">
											<Button
												variant="ghost"
												className="text-purple-600"
												onClick={() => setActiveTab(2)}
											>
												Voir toutes les images ({imageDetails.length})
											</Button>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Section Posts Sociaux */}
						{campaignPosts.length > 0 && (
							<div className="mt-6">
								<h3 className="text-xl font-bold mb-4 px-10">
									Publications ({campaignPosts.length})
								</h3>
								<div className="space-y-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{campaignPosts.slice(0, 4).map((campaignPost) => {
										const cleanedContent = campaignPost.content
											? campaignPost.content.replace(/<br\s*\/?>/gi, "\n")
											: "";

										return (
											<CampaignPostItem
												key={campaignPost.id}
												campaignPost={{
													...campaignPost,
													content: cleanedContent,
												}}
												isLoading={false}
												onClick={() => {
													setSelectedPostId(campaignPost.id);
													openModal("post");
												}}
												compactView={true}
											/>
										);
									})}
								</div>
								{campaignPosts.length > 3 && (
									<Button
										variant="ghost"
										className="mt-2 text-purple-600"
										onClick={() => setActiveTab(1)}
									>
										Voir toutes les publications ({campaignPosts.length})
									</Button>
								)}
							</div>
						)}

						{/* Section Landing Pages */}
						{campaignLandingPages.length > 0 && (
							<div className="mt-6">
								<h3 className="text-xl font-bold mb-4 px-10">
									Landing Pages ({campaignLandingPages.length})
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{campaignLandingPages.map((page) => (
										<CampaignLandingPageItem
											key={page.id}
											campaignLandingPage={page}
											isLoading={false}
											onClick={() => {
												setSelectedLandingPage(page);
												openModal("landing-page");
											}}
											compactView={true}
										/>
									))}
									{campaignLandingPages.length > 4 && (
										<div className="mt-2">
											<Button
												variant="ghost"
												className="text-purple-600"
												onClick={() => setActiveTab(3)}
											>
												Voir tous les landing page ({campaignLandingPages.length})
											</Button>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Message si vide */}
						{imageDetails.length === 0 &&
							campaignPosts.length === 0 &&
							campaignLandingPages.length === 0 && (
								<p className="text-gray-500 text-center py-8">
									Aucun contenu généré pour cette campagne
								</p>
							)}
					</div>
				);

			case 1:
				return loadingCampaignPosts ? (
					<CampaignPostItem campaignPost={[]} isLoading={loadingCampaignPosts} />
				) : campaignPosts.length > 0 ? (
					campaignPosts.map((campaignPost) => {
						const cleanedContent = campaignPost.content
							? campaignPost.content.replace(/<br\s*\/?>/gi, "\n")
							: "";

						return (
							<CampaignPostItem
								key={campaignPost.id}
								campaignPost={{
									...campaignPost,
									content: cleanedContent,
								}}
								isLoading={loadingCampaignPosts}
								onClick={() => {
									setSelectedPostId(campaignPost.id);
									openModal("post");
								}}
							/>
						);
					})
				) : (
					<p className="text-gray-500 text-center mt-4">
						Aucune publication trouvée.
					</p>
				);

			case 2:
				return loadingCampaignImages ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[...Array(3)].map((_, index) => (
							<CampaignImageItem key={`loading-${index}`} isLoading={true} />
						))}
					</div>
				) : imageDetails?.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{imageDetails.map((image) => (
							<CampaignImageItem
								key={image.id}
								campaignImage={{
									...image,
									content: image.path,
									formattedDate: formatDate(image.created_at),
								}}
								onClick={() => {
									setSelectedImage(image);
									openModal("image");
								}}
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
							<h1>{campaignName}</h1>
							<Tag color="red">En cours...</Tag>
						</span>
						<p className="text-gray-500">
							{campaignDescription}{" "}
							<Button
								variant="ghost"
								size="none"
								className="text-gray-500 hover:text-purple-700"
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
									{Array.from(new Set(campaignPosts.map((post) => post.social_id)))
										.filter((socialId) => socialId)
										.map((socialId) => (
											<a
												key={socialId}
												href={getSocialLink(socialId)}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex"
												title={`Visiter ${getSocialName(socialId)}`}
											>
												<Button
													variant="outline"
													circle
													size="none"
													className="p-2 hover:scale-105 transition-transform"
												>
													{(() => {
														switch (socialId) {
															case 1:
																return <BsTiktok size={20} />;
															case 2:
																return <BsTwitterX size={20} />;
															case 3:
																return <BsLinkedin size={20} />;
															default:
																return null;
														}
													})()}
												</Button>
											</a>
										))}
								</div>
							</div>
							<div className="my-2">
								<span className="text-sm font-semibold">Mentions j'aime</span>
								<div className="my-2">
									<div className="table bg-linear-0 from-gray-500/10 to-transparent rounded-xl px-4 py-2">
										<strong className="text-2xl">
											{loadingStats ? (
												<span className="inline-block h-6 w-6 animate-pulse rounded-full bg-gray-300"></span>
											) : (
												interactionStats.likes
											)}
										</strong>
									</div>
								</div>
								<span className="text-sm font-semibold">Nombre de vues</span>
								<div className="my-2">
									<div className="table bg-linear-0 from-gray-500/10 to-transparent rounded-xl px-4 py-2">
										<strong className="text-2xl">
											{loadingStats ? (
												<span className="inline-block h-6 w-6 animate-pulse rounded-full bg-gray-300"></span>
											) : (
												interactionStats.views
											)}
										</strong>
									</div>
								</div>
								<span className="text-sm font-semibold">Partages</span>
								<div className="my-2">
									<div className="table bg-linear-0 from-gray-500/10 to-transparent rounded-xl px-4 py-2">
										<strong className="text-2xl">
											{loadingStats ? (
												<span className="inline-block h-6 w-6 animate-pulse rounded-full bg-gray-300"></span>
											) : (
												interactionStats.shares
											)}
										</strong>
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

				{/* ... modal pour modification de la campagne */}
				<Modal isOpen={isOpen("edit-campaign")} onClose={closeModal} size="xl">
					<Suspense fallback={<div>Chargement...</div>}>
						<EditCampaign
							campaignName={campaignName}
							campaignDescription={campaignDescription}
							onSuccess={handleCampaignUpdateSuccess}
							onCancel={closeModal}
						/>
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
						{campaignPosts.length > 0 && (
							<Feature.Post
								postData={campaignPosts.find((post) => post.id === selectedPostId)}
							/>
						)}
					</Suspense>
				</Modal>

				<Modal
					isOpen={isOpen("image")}
					onClose={() => {
						closeModal();
						setIsPreview(false);
					}}
					size={isPreview ? "full" : "xl"}
				>
					{selectedImage && (
						<ImagePreview
							previewActive={isPreview}
							onTogglePreview={() => setIsPreview(!isPreview)}
							imageSrc={selectedImage.path}
							imageAlt={`Image ${selectedImage.id}`}
							creationDate={new Date(selectedImage.created_at).toLocaleDateString()}
							status={selectedImage.is_published ? "Publiée" : "Non publiée"}
						/>
					)}
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
