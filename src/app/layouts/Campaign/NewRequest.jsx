import React, { useState } from "react";
import { InputPrompt } from "@shared/Input";
import { generateSocialPostService } from "@services/generateSocialPostService";

const NewRequest = ({ campaignId }) => {
	const [showOption, setShowOption] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState("");
	const [topic, setTopic] = useState("");
	const [generatedPosts, setGeneratedPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	// --- Fonction utilitaire pour formatter le contenu avant affichage ---
	const formatContent = (content) => {
		if (!content) return "Aucun contenu disponible";

		return (
			content
				// **texte** → <strong>texte</strong>
				.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
				// _texte_ → <em>texte</em>
				.replace(/_(.*?)_/g, "<em>$1</em>")
				// Hashtags → mettre en gras automatiquement
				.replace(/(#\w[\w-]*)/g, "<strong>$1</strong>")
				// <br> → retour à la ligne
				.replace(/<br\s*\/?>/gi, "\n")
				// Convertir les retours à la ligne (\n) en <br> pour affichage HTML
				.replace(/\n/g, "<br />")
		);
	};

	// --- Fonction pour nettoyer et afficher les hashtags ---
	const formatHashtags = (hashtags) => {
		if (!hashtags) return [];
		return hashtags
			.replace(/\*\*/g, "")
			.trim()
			.split(/\s+/)
			.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
	};

	const handlePlatformChange = (e) => {
		setSelectedPlatform(e.target.value);
	};

	const handleGenerate = async () => {
		if (!topic || !selectedPlatform) {
			return alert("Veuillez saisir le sujet et choisir une plateforme.");
		}

		setLoading(true);

		try {
			const response = await generateSocialPostService({
				topic,
				platforms: [selectedPlatform],
				campaign_id: campaignId || 15,
				is_published: false,
			});

			console.log("Generated posts response:", response);

			if (response.success) {
				setGeneratedPosts(response.posts);
			} else {
				alert(response.message || "Erreur lors de la génération des posts.");
			}
		} catch (error) {
			console.error("Erreur API:", error);
			alert("Erreur de connexion à l’API.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1 className="text-center text-3xl font-bold mb-2">Nouvelle requête</h1>
			<div className="p-6 space-y-4 w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
				<div className="space-y-6">
					{/* Input du sujet du post + bouton intégré */}
					<InputPrompt
						optionValue="Voir les options"
						handleOption={() => setShowOption((prev) => !prev)}
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						onSubmit={handleGenerate}
						btnDisabled={loading || !topic || !selectedPlatform}
						btnText={loading ? "Génération..." : "Générer"}
					/>

					{/* Contenu affiché quand on clique sur "options" */}
					<div
						className={`${
							showOption ? "max-h-100" : "max-h-0"
						} overflow-clip transition-all duration-500`}
					>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
							pariatur maxime, est asperiores nostrum recusandae consequatur rem fugit
							perspiciatis, accusantium aliquam vitae voluptates temporibus dignissimos
							ad voluptatibus quis odio voluptas!
						</p>
					</div>
				</div>

				{/* Affichage de la plateforme sélectionnée */}
				{selectedPlatform && (
					<div className="mt-2 text-gray-700 font-medium">
						Plateforme sélectionnée :{" "}
						<span className="font-bold">{selectedPlatform}</span>
					</div>
				)}

				{/* Sélection de la plateforme */}
				<div className="flex flex-col space-y-2 mt-4">
					{["tiktok", "x", "linkedin"].map((platform) => (
						<label key={platform} className="flex items-center space-x-2">
							<input
								type="radio"
								name="platform"
								value={platform}
								checked={selectedPlatform === platform}
								onChange={handlePlatformChange}
							/>
							<span className="capitalize">{platform}</span>
						</label>
					))}
				</div>

				{/* Résultat des posts générés */}
				{generatedPosts.length > 0 && (
					<div className="w-full max-h-[60vh] overflow-y-auto bg-gray-50 rounded-2xl p-6 mt-6">
						<h3 className="text-xl font-bold mb-4">Posts générés :</h3>
						{generatedPosts.map((post, idx) => (
							<div key={idx} className="p-4 border rounded bg-white shadow-sm mb-4">
								<strong>{post.platform}</strong>

								<p
									className="text-lg leading-relaxed mt-2"
									dangerouslySetInnerHTML={{
										__html: formatContent(post.content),
									}}
								></p>

								{/* Affichage des hashtags */}
								{post.hashtags && (
									<div className="text-sm text-gray-500 mt-2">
										{formatHashtags(post.hashtags).map((tag, i) => (
											<span key={i} className="mr-2">
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default NewRequest;
