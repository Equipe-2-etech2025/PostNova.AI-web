import React from "react";
import { InputForm, TextareaForm } from "@shared/Input";
import Button from "@shared/Button";

const EditCampaign = () => {
	return (
		<div className="max-w-2xl mx-auto p-8 rounded shadow">
			<h1 className="text-center text-3xl font-bold mb-6">
				Modification de la campagne
			</h1>
			<form className="space-y-6">
				<div>
					<label className="block font-semibold mb-1">Nom :</label>
					<InputForm placeholder="Nom de la campagne" />
				</div>
				<div>
					<label className="block font-semibold mb-1">Description :</label>
					<TextareaForm placeholder="Description de la campagne" rows={4} />
				</div>
				<div className="flex justify-end gap-2">
					<Button type="submit">Enregistrer</Button>
					<Button type="button" color="tertiary">Annuler</Button>
				</div>
			</form>
		</div>
	);
};

export default EditCampaign;
