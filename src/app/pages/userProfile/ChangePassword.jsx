import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
	BsArrowLeft,
	BsExclamationCircleFill,
	BsCheckCircleFill,
	BsShieldLock,
	BsKey,
} from "react-icons/bs";
import useAuth from "@hooks/useAuth";
import { useNotification } from "@hooks/useNotification";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import { InputForm } from "@shared/Input";
import { userService } from "@services/userService";

const ChangePassword = () => {
	const navigate = useNavigate();
	const { loading } = useAuth();
	const { notification, showSuccess, showError, showWarning, hideNotification } =
		useNotification();

	// États pour le formulaire
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	// États pour les erreurs et messages
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState({
		score: 0,
		feedback: "",
		color: "text-gray-400",
	});

	// Évaluer la force du mot de passe
	const evaluatePasswordStrength = (password) => {
		let score = 0;
		let feedback = "";
		let color = "text-red-400";

		if (password.length === 0) {
			return { score: 0, feedback: "", color: "text-gray-400" };
		}

		if (password.length >= 8) score += 1;
		if (password.length >= 12) score += 1;
		if (/[a-z]/.test(password)) score += 1;
		if (/[A-Z]/.test(password)) score += 1;
		if (/[0-9]/.test(password)) score += 1;
		if (/[^A-Za-z0-9]/.test(password)) score += 1;

		switch (score) {
			case 0:
			case 1:
			case 2:
				feedback = "Faible";
				color = "text-red-400";
				break;
			case 3:
			case 4:
				feedback = "Moyen";
				color = "text-yellow-400";
				break;
			case 5:
			case 6:
				feedback = "Fort";
				color = "text-green-400";
				break;
			default:
				feedback = "Très fort";
				color = "text-green-500";
		}

		return { score, feedback, color };
	};

	// Gérer les changements dans les inputs
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Évaluer la force du nouveau mot de passe
		if (name === "newPassword") {
			setPasswordStrength(evaluatePasswordStrength(value));
		}

		// Effacer l'erreur du champ modifié
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Validation du formulaire
	const validateForm = () => {
		const newErrors = {};

		if (!formData.currentPassword) {
			newErrors.currentPassword = "Le mot de passe actuel est requis";
		}

		if (!formData.newPassword) {
			newErrors.newPassword = "Le nouveau mot de passe est requis";
		} else if (formData.newPassword.length < 8) {
			newErrors.newPassword =
				"Le nouveau mot de passe doit contenir au moins 8 caractères";
		} else if (formData.newPassword === formData.currentPassword) {
			newErrors.newPassword =
				"Le nouveau mot de passe doit être différent de l'ancien";
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "La confirmation du mot de passe est requise";
		} else if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Gérer la soumission du formulaire
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setErrors({});

		try {
			const result = await userService.changePassword({
				currentPassword: formData.currentPassword,
				newPassword: formData.newPassword,
				newPassword_confirmation: formData.confirmPassword,
			});

			if (result.success) {
				showSuccess("Mot de passe modifié avec succès", {
					duration: 5000,
					position: "top-center",
				});
				// Réinitialiser le formulaire
				setFormData({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				});
				setPasswordStrength({ score: 0, feedback: "", color: "text-gray-400" });
				// Rediriger vers les paramètres ou dashboard après 2 secondes
				setTimeout(() => navigate("/userProfile"), 2000);
			} else {
				showError(result.message || "Erreur lors de la modification", {
					duration: 5000,
					position: "top-center",
				});
				if (result.errors) {
					setErrors(result.errors);
				}
			}
		} catch (error) {
			console.error("Erreur de modification:", error);
			showError("Une erreur est survenue", {
				duration: 5000,
				position: "top-center",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={hideNotification}
				autoHide={true}
				duration={5000}
				position="top-center"
				showProgressBar={true}
			/>

			<div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
				<div className="container mx-auto py-8 px-4">
					{/* Header avec bouton retour */}
					<div className="flex items-center mb-8">
						<Button
							variant="outline"
							color="neutral"
							circle
							className="h-12 w-12 mr-4"
							onClick={() => navigate(-1)}
						>
							<BsArrowLeft size={20} />
						</Button>
						<div>
							<h1 className="text-3xl font-bold flex items-center gap-3">
								<BsShieldLock className="text-[#4335C4]" />
								Changer le mot de passe
							</h1>
							<p className="text-gray-600 dark:text-gray-400 mt-2">
								Modifiez votre mot de passe pour sécuriser votre compte PostNova.AI
							</p>
						</div>
					</div>

					{/* Contenu principal */}
					<div className="max-w-2xl mx-auto">
						<div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-8 border border-gray-200 dark:border-gray-800">
							<div className="flex items-center gap-3 mb-6">
								<BsKey className="text-2xl text-[#4335C4]" />
								<h2 className="text-xl font-semibold">Sécurité du compte</h2>
							</div>

							<form className="space-y-6" onSubmit={handleSubmit}>
								{/* Mot de passe actuel */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Mot de passe actuel
									</label>
									<InputForm
										type="password"
										name="currentPassword"
										value={formData.currentPassword}
										onChange={handleChange}
										placeholder="Entrez votre mot de passe actuel"
										hasError={errors.currentPassword}
										disabled={isSubmitting || loading}
										className="w-full"
									/>
									{errors.currentPassword && (
										<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
											<BsExclamationCircleFill size={12} />
											{errors.currentPassword}
										</div>
									)}
								</div>

								{/* Nouveau mot de passe */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Nouveau mot de passe
									</label>
									<InputForm
										type="password"
										name="newPassword"
										value={formData.newPassword}
										onChange={handleChange}
										placeholder="Entrez votre nouveau mot de passe"
										hasError={errors.newPassword}
										disabled={isSubmitting || loading}
										className="w-full"
									/>
									{errors.newPassword && (
										<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
											<BsExclamationCircleFill size={12} />
											{errors.newPassword}
										</div>
									)}
									{/* Indicateur de force du mot de passe */}
									{formData.newPassword && !errors.newPassword && (
										<div className="mt-3">
											<div className="flex items-center justify-between mb-2">
												<span className="text-sm text-gray-600 dark:text-gray-400">
													Force du mot de passe
												</span>
												<span
													className={`text-sm font-medium ${passwordStrength.color} transition-colors duration-300`}
												>
													{passwordStrength.feedback}
												</span>
											</div>
											<div className="flex gap-1">
												{[1, 2, 3, 4, 5, 6].map((level) => (
													<div
														key={level}
														className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
															level <= passwordStrength.score
																? passwordStrength.score <= 2
																	? "bg-red-400"
																	: passwordStrength.score <= 4
																		? "bg-yellow-400"
																		: "bg-green-400"
																: "bg-gray-300 dark:bg-gray-600"
														}`}
													/>
												))}
											</div>
										</div>
									)}
								</div>

								{/* Confirmer le nouveau mot de passe */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Confirmer le nouveau mot de passe
									</label>
									<InputForm
										type="password"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										placeholder="Confirmez votre nouveau mot de passe"
										hasError={errors.confirmPassword}
										disabled={isSubmitting || loading}
										className="w-full"
									/>
									{errors.confirmPassword && (
										<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
											<BsExclamationCircleFill size={12} />
											{errors.confirmPassword}
										</div>
									)}
									{/* Indicateur de correspondance */}
									{formData.confirmPassword &&
										formData.newPassword === formData.confirmPassword &&
										!errors.confirmPassword && (
											<div className="flex items-center gap-2 text-green-400 text-sm animate-fade-in">
												<BsCheckCircleFill size={12} />
												Les mots de passe correspondent
											</div>
										)}
								</div>

								{/* Conseils de sécurité */}
								<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
									<h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
										💡 Conseils pour un mot de passe sécurisé
									</h4>
									<ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
										<li>• Au moins 8 caractères (12+ recommandé)</li>
										<li>• Mélange de majuscules et minuscules</li>
										<li>• Inclure des chiffres et symboles spéciaux</li>
										<li>• Éviter les informations personnelles</li>
										<li>• Ne pas réutiliser d'anciens mots de passe</li>
									</ul>
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row gap-4 pt-4">
									<Button
										type="button"
										variant="outline"
										onClick={() => navigate(-1)}
										disabled={isSubmitting || loading}
										className="flex-1 sm:flex-none"
									>
										Annuler
									</Button>
									<Button
										type="submit"
										disabled={isSubmitting || loading}
										className={`flex-1 relative overflow-hidden ${
											isSubmitting || loading
												? "opacity-50 cursor-not-allowed"
												: "hover:shadow-lg hover:shadow-[#4335C4]/25 transform hover:scale-[1.02]"
										} transition-all duration-300`}
									>
										{isSubmitting || loading ? (
											<div className="flex items-center justify-center">
												<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
												Modification en cours...
											</div>
										) : (
											<span className="flex items-center justify-center gap-2">
												<BsShieldLock size={16} />
												Modifier le mot de passe
											</span>
										)}
									</Button>
								</div>
							</form>
						</div>

						{/* Liens utiles */}
						<div className="text-center mt-8 space-y-3">
							<div className="text-sm text-gray-600 dark:text-gray-400">
								Besoin d'aide ?{" "}
								<Link
									to="/support"
									className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors font-medium hover:underline"
								>
									Contacter le support
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
