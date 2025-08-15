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
			<div className="container flex flex-col items-center justify-center min-h-[80vh] mx-auto">
				<h1 className="text-5xl font-bold mt-12 mb-2 text-center">
					Créer une campagne
				</h1>

				<p className="mb-8 text-gray-400 text-center">
					Décrivez votre campagne et choisissez son type.
				</p>

				<div className="w-full flex flex-col gap-6 max-w-3xl">
					<InputPrompt
						placeholder="Décrivez votre campagne"
						value={description}
						btnText={isCreating ? "Création..." : "Créer"}
						btnDisabled={isCreating}
						btnIcon={
							isCreating ? <span className="mr-1">🪄</span> : <BsMagic size={16} />
						}
						onChange={(e) => setDescription(e.target.value)}
						onSubmit={handleSubmit}
						optionComponent={
							<div className="w-full max-w-md mb-4">
								<select
									id="campaignType"
									value={typeCampaign}
									onChange={(e) => setTypeCampaign(e.target.value)}
									className={`
    w-full px-4 py-2 block text-sm font-medium rounded-md shadow-sm
    gradient-select
    ${isCreating ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
  `}
									disabled={isCreating}
								>
									<option value="" disabled className="text-gray-400">
										Choisissez le type de campagne *
									</option>
									{campaignOptions.map((option) => (
										<option
											key={option.id}
											value={option.id}
											className="transition-colors duration-200"
										>
											{option.name}
										</option>
									))}
								</select>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default New;
