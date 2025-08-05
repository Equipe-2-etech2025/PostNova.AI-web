import React, { useEffect, useState } from "react";
import Button from "@shared/Button";
import { InputForm } from "@shared/Input";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "@services/resetPassword";
import { useNotification } from "@hooks/useNotification";
import MessageNotification from "@shared/MessageNotification";

const PasswordResetFlow = () => {
  const navigate = useNavigate();
	const [step, setStep] = useState(1); // 1 pour l'email, 2 pour la réinitialisation

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		password_confirmation: "",
	});
  
  const [searchParams] = useSearchParams();
	const [resetToken, setResetToken] = useState("");
	const [resetEmail, setResetEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [errors, setErrors] = useState({});
  
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
  
  const handleEmailSubmit = async (e) => {
		try {
			e.preventDefault();
      
      if (!validateForm()) {
			  return;
		  }
      
			setIsSubmitting(true);

			const response = await resetPassword.sendResetPassword({
				email: formData.email,
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
    try {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      const response = await resetPassword.reset({
        token: resetToken,
        email: resetEmail,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
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
      
     } catch (err) {
			const allErrors = Object.values(err.message);
			showError(allErrors, {
				duration: 5000,
				position: "top-center",
			});
		 }
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
								<div className="flex justify-center">
									<Button
										type="submit"
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
									</Button>
								</div>
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
									<Button
										type="submit"
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
									</Button>
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
