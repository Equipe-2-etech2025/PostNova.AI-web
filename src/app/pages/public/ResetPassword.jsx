import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "@services/resetPassword";
import { useNotification } from "@hooks/useNotification";
import MessageNotification from "@shared/MessageNotification";

const PasswordResetFlow = () => {
	const [step, setStep] = useState(1); // 1 pour l'email, 2 pour la réinitialisation
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [searchParams] = useSearchParams();
	const [resetToken, setResetToken] = useState("");
	const [resetEmail, setResetEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { notification, showSuccess, showError, showInfo, hideNotification } =
		useNotification();

	useEffect(() => {
		const tokenFromURL = searchParams.get("token");
		const emailFromURL = searchParams.get("email");

		if (tokenFromURL && emailFromURL) {
			setResetToken(tokenFromURL);
			setResetEmail(emailFromURL);
			showSuccess("Lien vérifié", {
				duration: 3000,
				position: "top-center",
			});
			setStep(2);
		}
	}, [searchParams]);

	const handleEmailSubmit = async (e) => {
		try {
			e.preventDefault();
			setIsSubmitting(true);

			const response = await resetPassword.sendResetPassword({
				email,
			});

			if (response.success) {
				showSuccess("Reset link envoyé.", {
					duration: 3000,
					position: "top-center",
				});
			} else {
				if (response.errors) {
					const allErrors = Object.values(response.message);
					showError(allErrors, {
						duration: 5000,
						position: "top-center",
					});
				}
			}

			setIsSubmitting(false);
		} catch (err) {
			const allErrors = Object.values(err.message);
			showError(allErrors, {
				duration: 5000,
				position: "top-center",
			});
		}
	};

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const response = await resetPassword.reset({
			token: resetToken,
			email: resetEmail,
			password,
			password_confirmation: confirmPassword,
		});

		if (response.success) {
			showSuccess("Mot de passe réinitialisé.", {
				duration: 3000,
				position: "top-center",
			});
			navigate("/login");
		} else {
			if (response.errors) {
				const allErrors = Object.values(response.errors).flat().join(" ");
				showError(allErrors, {
					duration: 5000,
					position: "top-center",
				});
			}
		}

		setIsSubmitting(false);
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
			{step === 1 ? (
				<div className="flex justify-center items-center h-screen bg-[#1c1b23]">
					<div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
						<div className="w-full max-w-md my-auto">
							<h2 className="text-2xl font-bold text-white mb-4 text-center">
								Email de récupération de mot de passe
							</h2>
							<p className="text-sm text-gray-400 mb-6 text-center">
								Veuillez saisir votre email pour recevoir un lien de réinitialisation de
								mot de passe.
							</p>

							<form onSubmit={handleEmailSubmit} className="space-y-6">
								<div>
									<input
										type="email"
										name="email"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105"
										required
									/>
								</div>
								<div className="flex justify-center">
									<button
										type="submit"
										className="px-6 py-3 bg-[#4335C4] text-white rounded-md hover:bg-[#5a4fd4] transition-colors duration-200 flex items-center justify-center min-w-[150px]"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<svg
													className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Envoi...
											</>
										) : (
											"Valider l'email"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-screen bg-[#1c1b23]">
					<div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
						<div className="w-full max-w-md my-auto">
							<h2 className="text-2xl font-bold text-white mb-4 text-center">
								Réinitialisation Mot de Passe
							</h2>
							<p className="text-sm text-gray-400 mb-6 text-center">
								Veuillez saisir un nouveau mot de passe et le confirmer.
							</p>

							<form onSubmit={handlePasswordReset} className="space-y-6">
								<div>
									<input
										type="password"
										name="password"
										placeholder="Nouveau Mot de passe"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105"
										required
									/>
								</div>

								<div>
									<input
										type="password"
										name="password_confirmation"
										placeholder="Confirmer Nouveau Mot de Passe"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full px-4 py-3 rounded-md bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 transform focus:scale-105"
										required
									/>
								</div>

								<div className="flex justify-center">
									<button
										type="submit"
										className="px-6 py-3 bg-[#4335C4] text-white rounded-md hover:bg-[#5a4fd4] transition-colors duration-200 flex items-center justify-center min-w-[200px]"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<svg
													className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Réinitialisation...
											</>
										) : (
											"Réinitialiser votre mot de passe"
										)}
									</button>
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
