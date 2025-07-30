import Button from "@shared/Button";
import { InputForm } from "@shared/Input";
import React, { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

const PasswordResetFlow = () => {
	const [step, setStep] = useState(1); // 1 pour l'email, 2 pour la réinitialisation

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		password_confirmation: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear the error for the modified field
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleEmailSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		//logique pour envoyer l'email
		// Si succès, passer à l'étape suivante
		setStep(2);
	};

	const handlePasswordReset = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		// logique pour réinitialiser le mot de passe
		console.log("Mot de passe réinitialisé pour", formData.email);
	};

	const validateForm = () => {
		const newErrors = {};

		if (step === 1) {
			if (!formData.email) {
				newErrors.email = "L'email est requis";
			} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				newErrors.email = "Format d'email invalide";
			}	
		}

		if (step === 2) {
			if (!formData.password) {
				newErrors.password = "Le nouveau mot de passe est requis";
			} else if (formData.password.length < 6) {
				newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
			}

			if (formData.password !== formData.password_confirmation) {
				newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
			}

			if (!formData.password_confirmation) {
				newErrors.password_confirmation =
					"La confirmation du mot de passe est requise";
			} else if (formData.password_confirmation.length < 6) {
				newErrors.password_confirmation =
					"La confirmation du mot de passe doit contenir au moins 6 caractères";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	return (
		<>
			{step === 1 ? (
				<div className="flex justify-center items-center h-screen">
					<div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
						<div className="w-full max-w-md my-auto">
							<h2 className="text-2xl font-bold mb-4 text-center">
								Email de récupération de mot de passe
							</h2>
							<p className="text-sm text-gray-500 mb-6 text-center">
								Veuillez saisir votre email pour recevoir un lien de réinitialisation de
								mot de passe.
							</p>

							<form onSubmit={handleEmailSubmit} className="space-y-6 text-center">
								<div className="space-y-1">
									<InputForm
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="Adresse email"
									/>
									{errors.email && (
										<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
											<BsExclamationCircleFill size={11} />
											{errors.email}
										</div>
									)}
								</div>
								<Button type="submit">Valider l'email</Button>
							</form>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-screen">
					<div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
						<div className="w-full max-w-md my-auto">
							<h2 className="text-2xl font-bold mb-4 text-center">
								Réinitialisation Mot de Passe
							</h2>
							<p className="text-sm text-gray-500 mb-6 text-center">
								Veuillez saisir un nouveau mot de passe et le confirmer.
							</p>

							<form onSubmit={handlePasswordReset} className="space-y-6">
								<div className="space-y-1">
									<InputForm
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										placeholder="Entrer le nouveau mot de passe"
									/>
									{errors.password && (
										<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
											<BsExclamationCircleFill size={11} />
											{errors.password}
										</div>
									)}
								</div>

								<div className="space-y-1">
									<InputForm
										type="password"
										name="password_confirmation"
										value={FormData.password_confirmation}
										onChange={handleChange}
										placeholder="Confirmer le nouveau mot de passe"
									/>
									{errors.password_confirmation && (
										<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
											<BsExclamationCircleFill size={11} />
											{errors.password_confirmation}
										</div>
									)}
								</div>

								<div className="flex justify-center">
									<Button type="submit">Réinitialiser le mot de passe</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PasswordResetFlow;
