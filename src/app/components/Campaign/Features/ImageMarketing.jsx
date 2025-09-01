import React, { useState } from "react";
import { generateImageService } from "@services/generateImageService";
import { promptService } from "@services/promptService";
import MessageNotification from "@shared/MessageNotification";

const ImageMarketing = ({ campaignId, onSuccess, onContentGenerated }) => {
	const [topic, setTopic] = useState("");
	const [style, setStyle] = useState("realistic");
	const [loading, setLoading] = useState(false);
	const [generatedImages, setGeneratedImages] = useState([]);
	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		isVisible: false,
	});

	const showNotification = (message, type = "info") => {
		setNotification({ message, type, isVisible: true });
	};

	const handleGenerateImages = async () => {
		if (!topic) {
			showNotification("Veuillez saisir un sujet pour l'image.", "warning");
			return;
		}

		setLoading(true);
		try {
			// Créer le prompt d'abord
			const promptResponse = await promptService.create({
				content: topic,
				campaign_id: campaignId,
			});

			if (!promptResponse.success) {
				if (promptResponse.type === "quota_exceeded") {
					showNotification(
						`Quota dépassé ! Vous avez utilisé ${promptResponse.quota_used}/${promptResponse.quota_max} prompts aujourd'hui.`,
						"warning"
					);
				} else {
					showNotification("Erreur lors de la création du prompt.", "error");
				}
				setLoading(false);
				return;
			}

			// Générer les images
			const imagesResponse = await generateImageService({
				prompt: topic,
				campaign_id: campaignId,
			});
			console.log(imagesResponse);

			if (imagesResponse.success) {
				// Vérifier que images existe et est un tableau avant de l'utiliser
				const images = imagesResponse.images || [];
				setGeneratedImages(images);
				
				if (images.length > 0) {
					showNotification("Images générées avec succès !", "success");
					if (onContentGenerated) {
						onContentGenerated("full");
					}
					if (onSuccess) {
						onSuccess();
					}
				} else {
					showNotification("Aucune image n'a été générée.", "warning");
				}
			} else {
				showNotification(
					imagesResponse.message || "Erreur lors de la génération des images.",
					"error"
				);
			}
		} catch (error) {
			console.error("Erreur API:", error);
			showNotification("Erreur de connexion à l'API.", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">Générer des images marketing</h2>
			
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-2">
						Description de l'image *
					</label>
					<textarea
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						placeholder="Décrivez l'image que vous souhaitez générer..."
						className="w-full p-3 border rounded-lg resize-none"
						rows={3}
					/>
				</div>

				<button
					onClick={handleGenerateImages}
					disabled={loading || !topic}
					className="bg-purple-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
				>
					{loading ? "Génération..." : "Générer les images"}
				</button>

				{generatedImages && generatedImages.length > 0 && (
					<div className="mt-6">
						<h3 className="text-lg font-semibold mb-4">Images générées</h3>
						<div className="grid grid-cols-2 gap-4">
							{generatedImages.map((image, index) => (
								<div key={index} className="border rounded-lg overflow-hidden">
									<img
										src={image.url}
										alt={`Image générée ${index + 1}`}
										className="w-full h-48 object-cover"
									/>
									<div className="p-3">
										<button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
											Télécharger
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageMarketing;