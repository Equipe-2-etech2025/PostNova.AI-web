import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import NavBar from "@layouts/NavBar";
import { InputPrompt } from "@shared/Input";
import { TypeCampaignService } from "@services/typeCampaignService";
import { campaignService } from "@services/campaignService";
import { BsMagic } from "react-icons/bs";

const New = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [description, setDescription] = useState("");
	const [typeCampaign, setTypeCampaign] = useState("");
	const [campaignOptions, setCampaignOptions] = useState([]);
	const [isCreating, setIsCreating] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			alert("Veuillez vous connecter");
			return;
		}

		if (!description || !typeCampaign) {
			alert("Veuillez remplir tous les champs.");
			return;
		}

		setIsCreating(true);

		try {
			const response = await campaignService.generateNameAndCreate({
				description,
				type_campaign_id: typeCampaign,
				user_id: user.id,
			});
            console.log("Response from campaign creation:", response);
			if (response.success) {
				navigate(`/campaign/${response.campaign.id}`);
			} else {
				alert("Erreur lors de la création : " + response.message);
			}
		} catch (error) {
			console.error("Erreur lors de la création :", error);
			alert("Une erreur est survenue.");
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
			}
		};
		fetchTypeCampaigns();
	}, []);

	return (
		<div className="min-h-screen">
			<NavBar />
			<div className="container flex flex-col items-center justify-center min-h-[80vh] mx-auto px-4">
				<h1 className="text-5xl font-bold mt-12 mb-2 text-center">
					Créer une campagne
				</h1>

				<p className="mb-8 text-gray-400 text-center">
					Décrivez votre campagne et choisissez son type.
				</p>

				<div className="w-full max-w-3xl">
					<InputPrompt
						placeholder="Décrivez votre campagne"
						value={description}
						btnText={isCreating ? "Création..." : "Créer"}
						btnDisabled={isCreating || !description || !typeCampaign}
						btnIcon={
							isCreating ? <span className="mr-1">🪄</span> : <BsMagic size={16} />
						}
						onChange={(e) => setDescription(e.target.value)}
						onSubmit={handleSubmit}
						containerStyle="!px-6 !py-4 !rounded-lg !bg-white !border !border-gray-200"
						inputStyle="!p-0 !bg-transparent text-lg min-h-[60px]"
						btnPosition="right"
					/>

					<div className="mt-8 text-center">
						<p className="text-sm text-gray-500 mb-4">Type de campagne *</p>
						<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
							{campaignOptions.map((option) => (
								<button
									key={option.id}
									type="button"
									onClick={() => setTypeCampaign(option.id)}
									className={`
          px-4 py-3 text-sm font-medium rounded-lg shadow-sm
          transition-all duration-200 whitespace-nowrap
          bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100
          hover:from-purple-400 hover:via-blue-400 hover:to-pink-400
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
	);
};

export default New;
