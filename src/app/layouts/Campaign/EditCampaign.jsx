import React, { useState, useEffect } from "react";
import { InputForm, TextareaForm } from "@shared/Input";
import Button from "@shared/Button";
import { campaignService } from "@services/campaignService";
import { useParams } from "react-router";
import MessageNotification from "@shared/MessageNotification";

const EditCampaign = ({
	campaignName: initialName,
	campaignDescription: initialDescription,
	onSuccess,
	onCancel,
}) => {
	const [name, setName] = useState(initialName || "");
	const [description, setDescription] = useState(initialDescription || "");
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		isVisible: false,
	});

	useEffect(() => {
		setName(initialName || "");
		setDescription(initialDescription || "");
	}, [initialName, initialDescription]);

	const showNotification = (message, type = "info") => {
		setNotification({
			message,
			type,
			isVisible: true,
		});
	};

	const handleCloseNotification = () => {
		setNotification({
			...notification,
			isVisible: false,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await campaignService.updateCampaign(id, {
				name,
				description,
			});
			if (response.success) {
				showNotification("Campagne mise à jour avec succès !", "success");
				onSuccess();
			} else {
				showNotification(
					response.message || "Erreur lors de la mise à jour de la campagne.",
					"error"
				);
			}
		} catch (err) {
			console.error(err);
			showNotification(
				"Une erreur est survenue lors de la mise à jour de la campagne.",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-3xl mx-auto p-8 rounded shadow">
			{/* Notification */}
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={handleCloseNotification}
				autoHide={true}
				duration={5000}
				position="top-center"
				showProgressBar={true}
			/>

			<h1 className="text-center text-3xl font-bold mb-6">
				Modification de la campagne
			</h1>
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
					<label className="block font-semibold mb-1 text-gray-700">Nom :</label>
					<InputForm
						placeholder={initialName || "Nom de la campagne"}
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{
							"--tw-placeholder-opacity": "1",
							"--tw-placeholder-color": "rgb(156 163 175)",
						}}
						className="placeholder-[var(--tw-placeholder-color)]"
					/>
				</div>
				<div>
					<label className="block font-semibold mb-1 text-gray-700">
						Description :
					</label>
					<TextareaForm
						placeholder={initialDescription || "Description de la campagne"}
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
