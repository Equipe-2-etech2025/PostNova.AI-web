import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import InputPrompt from "@shared/Input";
import { TypeCampaignService } from "@services/typeCampaignService";
import { campaignService } from "@services/campaignService";
import { BsMagic } from "react-icons/bs";
import MessageNotification from "@shared/MessageNotification";
import LoadingSpinnerNova from "@shared/LoadingSpinnerNova";
import Modal from "@shared/Modal";
import CampaignInformationInputs from "@layouts/Campaign/components/CampaignInformationInputs";
import Button from "@shared/Button";

const New = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [description, setDescription] = useState("");
	const [typeCampaign, setTypeCampaign] = useState("");
	const [campaignOptions, setCampaignOptions] = useState([]);
	const [campaignInformation, setCampaignInformation] = useState({
		business_name: "",
		email: "",
		phone_numbers: "",
		company: "",
		website: "",
		industry: "",
		location: "",
		target_audience: "",
		goals: "",
		budget: "",
		keywords: "",
		preferred_style: "",
		additional_notes: "",
	});
	const [isCreating, setIsCreating] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [notification, setNotification] = useState({
		message: "",
		type: "info" /*"success", "error", "warning", "info"*/,
		isVisible: false,
	});

	const showNotification = (message, type = "info") => {
		setNotification({
			message,
			type,
			isVisible: true,
		});
	};

	const handleSubmit = async (e) => {
		if (!user) {
			showNotification("Veuillez vous connecter", "error");
			return;
		}

		if (!description || !typeCampaign) {
			showNotification("Veuillez remplir tous les champs.", "warning");
			return;
		}

		setIsCreating(true);

		try {
			// const response = await campaignService.generateNameAndCreate({
			// 	description,
			// 	type_campaign_id: typeCampaign,
			// 	user_id: user.id,
			// });
			const response = await campaignService.createCampaign({
				description,
				type_campaign_id: typeCampaign,
				user_id: user.id,
				business_name: campaignInformation.business_name,
        		email: campaignInformation.email,
        		phone_numbers: campaignInformation.phone_numbers,
        		company: campaignInformation.company,
        		website: campaignInformation.website,
        		industry: campaignInformation.industry,
        		location: campaignInformation.location,
        		target_audience: campaignInformation.target_audience,
        		goals: campaignInformation.goals,
        		budget: campaignInformation.budget,
        		keywords: campaignInformation.keywords,
        		additional_notes: campaignInformation.additional_notes,
        		preferred_style: campaignInformation.preferred_style
			});
			if (response.success) {
				showNotification("Campagne créée avec succès !", "success");
				setTimeout(() => {
					navigate(`/campaign/${response.data.data.id}`);
				}, 1500);
			} else {
				showNotification(
					"Erreur lors de la création : " + response.data.data.message,
					"error"
				);
			}
		} catch (error) {
			showNotification("Une erreur est survenue lors de la création.", "error");
		} finally {
			setIsCreating(false);
		}
	};

	useEffect(() => {
		const fetchTypeCampaigns = async () => {
			try {
				const response = await TypeCampaignService.getAllTypeCampaign();
				if (response.success) {
					setCampaignOptions(response.data.data);
				}
			} catch (error) {
				console.error("Erreur:", error);
				showNotification(
					"Erreur lors du chargement des types de campagne",
					"error"
				);
			}
		};
		fetchTypeCampaigns();
	}, []);

	return (
		<>
			<div className="min-h-screen">
				{/* Notification */}
				<MessageNotification
					message={notification.message}
					type={notification.type}
					isVisible={notification.isVisible}
					onClose={() => setNotification({ ...notification, isVisible: false })}
					autoHide={true}
					duration={5000}
					position="top-center"
					showProgressBar={true}
				/>

				<div className="container flex flex-col items-center justify-center min-h-[80vh] mx-auto">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-12 mb-2 text-center">
						Créer une nouvelle campagne
					</h1>

					<p className="mb-8 text-gray-400 text-center">
						Plus vous êtes précis, meilleur sera le résultat généré par Nova.
					</p>

					<div className="w-full max-w-3xl ">
						<InputPrompt
							placeholder="Décrivez votre campagne"
							value={description}
							btnText={"Créer"}
							btnDisabled={isCreating || !description || !typeCampaign}
							btnIcon={
								<LoadingSpinnerNova
									isLoading={isCreating}
									iconSize={10}
									spinnerSize={20}
									showIdleGlow={true}
								/>
							}
							onChange={(e) => setDescription(e.target.value)}
							onSubmit={(e) => {
								e.preventDefault();
								setShowModal(true);
							}}
							containerStyle="!px-6 !py-4 !rounded-lg"
							inputStyle="!p-0 !bg-transparent text-lg min-h-[60px]"
							btnPosition="right"
						/>

						<div className="mt-8 text-center">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mt-6">
								{campaignOptions.map((option) => (
									<button
										key={option.id}
										type="button"
										onClick={() => setTypeCampaign(option.id)}
										className={`
			px-4 py-3 text-sm font-medium rounded-lg shadow-sm
			transition-all duration-200 whitespace-nowrap
			bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100
			hover:from-purple-400 hover:via-blue-400 	hover:to-pink-400
			focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
			${
				typeCampaign === option.id
					? "from-purple-500 via-blue-500 to-pink-500 text-white"
					: "text-gray-800"
			}
			${isCreating ? "opacity-70 cursor-not-allowed" : ""}
			overflow-hidden text-ellipsis
			flex items-center justify-center
			`}
										disabled={isCreating}
										title={option.name}
									>
										<span className="truncate">{option.name}</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				showClose={true}
				size="3xl"
				className="px-4 py-6"
			>
				<strong className="block text-2xl text-center mb-3">
					Information de la campagne
				</strong>
				<CampaignInformationInputs
					state={campaignInformation}
					setState={setCampaignInformation}
				/>
				<div className="text-center mt-4">
					<Button
						className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500
              hover:from-purple-600 hover:to-pink-600
              transition-all duration-300 transform 
              hover:scale-105
              active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              relative overflow-hidden"
						onClick={handleSubmit}
					>
						<LoadingSpinnerNova
							isLoading={isCreating}
							iconSize={10}
							spinnerSize={20}
							showIdleGlow={true}
						/>
						{isCreating ? "Création..." : "Créer"}
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default New;
