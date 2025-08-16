import React, { useState } from "react";
import { InputForm, TextareaForm } from "@shared/Input";
import Button from "@shared/Button";
import { BsMagic } from "react-icons/bs";
import { campaignService } from "@services/campaignService";
import { useParams } from "react-router";

const EditCampaign = ({ campaignId, onSuccess, onCancel }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

		const handleSubmit = async (e) => {
			e.preventDefault();
			try {
				const response = await campaignService.updateCampaign(id, {
					name,
					description,
				});
				if (response.success) {
					alert(" Campagne mise à jour !");
					onSuccess();
				} else {
					alert("alert" + response.message);
				}
			} catch (err) {
				console.error(err);
			}
	};

	return (
		<div className="max-w-2xl mx-auto p-8 rounded shadow">
			<h1 className="text-center text-3xl font-bold mb-6">
				Modification de la campagne
			</h1>
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
					<label className="block font-semibold mb-1">Nom :</label>
					<InputForm
						placeholder="Nom de la campagne"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label className="block font-semibold mb-1">Description :</label>
					<TextareaForm
						placeholder="Description de la campagne"
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex justify-end gap-2">
					<Button type="submit" disabled={loading}>
						{loading ? "Enregistrement..." : "Enregistrer"}
					</Button>
					<Button type="button" color="tertiary" onClick={onCancel}>
						Annuler
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditCampaign;
