import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { useNotification } from "@hooks/useNotification";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import TypewriterText from "@components/Auth/TypewriterText";
import galaxy from "@assets/galaxy.png";
import logo from "@assets/logo.png";
import { InputForm } from "@shared/Input";
import { BsExclamationCircleFill } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
	const navigate = useNavigate();
	const { register, loading } = useAuth();
	const { notification, showSuccess, showError, hideNotification } =
		useNotification();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// États pour afficher ou masquer le mot de passe
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		acceptTerms: false,
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Le nom d'utilisateur est requis";
		}

		if (!formData.email.trim()) {
			newErrors.email = "L'email est requis";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "L'email n'est pas valide";
		}

		if (!formData.password) {
			newErrors.password = "Le mot de passe est requis";
		} else if (formData.password.length < 8) {
			newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
		}

		if (!formData.password_confirmation) {
			newErrors.password_confirmation =
				"La confirmation du mot de passe est requise";
		} else if (formData.password !== formData.password_confirmation) {
			newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
		}

		if (!formData.acceptTerms) {
			newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
		}

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			setIsSubmitting(true);

			const result = await register(formData);

			if (result.success) {
				showSuccess("Inscription réussie ! Vérifiez votre email.", {
					duration: 3000,
					position: "top-center",
				});
				navigate("/email/verify", {
					state: {
						email: formData.email,
					},
				});
			} else {
				showError("Une erreur est survenue", {
					duration: 5000,
					position: "top-center",
				});
				if (result.errors) {
					showError("Une erreur est survenue", {
						duration: 5000,
						position: "top-center",
					});
					setErrors(result.errors);
				}
			}
		} catch (error) {
			console.error("Erreur d'inscription:", error);
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

			<div className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
				{/* Left */}
				<div className="flex-1 relative p-4 h-64 md:h-auto">
					<img
						src={galaxy}
						alt="galaxy"
						className="w-full h-full object-cover opacity-90 dark:opacity-30 rounded-2xl"
					/>
					<div className="absolute bottom-16 left-0 right-0 text-center">
						<TypewriterText
							text="Une idée, une campagne"
							typingSpeed={80}
							deleteSpeed={40}
							pauseTime={2500}
							loop={true}
						/>
					</div>
				</div>

				{/* Right */}
				<div className="flex-1 flex items-center justify-center px-8 py-6 md:py-12 overflow-y-auto">
					<div className="w-full max-w-md my-auto">
						<div className="text-center mb-2">
							<div className="flex items-center justify-center gap-2 mb-10">
								<img src={logo} className="size-15" alt="" />
								<h1 className="text-2xl font-bold cursor-pointer">
									<strong>PostNova</strong>
								</h1>
							</div>
							<h2 className="text-3xl md:text-2xl font-bold mb-4 text-center animate-fade-in">
								S'inscrire
							</h2>
							<p className="text-sm text-gray-700">
								Créez votre compte pour commencer à créer des campagnes innovantes.
							</p>
						</div>

						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="space-y-2">
								<InputForm
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Nom d'utilisateur"
									hasError={errors.name}
									disabled={isSubmitting || loading}
								/>
								{errors.name && (
									<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
										<BsExclamationCircleFill size={11} />
										{errors.name}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<InputForm
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Adresse email"
									hasError={errors.email}
									disabled={isSubmitting || loading}
								/>
								{errors.email && (
									<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
										<BsExclamationCircleFill size={11} />
										{errors.email}
									</div>
								)}
							</div>

							<div className="space-y-2 relative">
								<InputForm
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Mot de passe"
									hasError={errors.password}
									disabled={isSubmitting || loading}
								/>
								{/* Icône œil */}
								<div
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
								>
									{showPassword ? (
										<AiOutlineEyeInvisible size={20} />
									) : (
										<AiOutlineEye size={20} />
									)}
								</div>
								{errors.password && (
									<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
										<BsExclamationCircleFill size={11} />
										{errors.password}
									</div>
								)}
							</div>

							<div className="space-y-2 relative">
								<InputForm
									type={showPassword ? "text" : "password"}
									name="password_confirmation"
									value={formData.password_confirmation}
									onChange={handleChange}
									placeholder="Confirmation du mot de passe"
									hasError={errors.password_confirmation}
									disabled={isSubmitting || loading}
								/>
								{/* Icône œil */}
								<div
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
								>
									{showPassword ? (
										<AiOutlineEyeInvisible size={20} />
									) : (
										<AiOutlineEye size={20} />
									)}
								</div>
								{errors.password_confirmation && (
									<div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
										<BsExclamationCircleFill size={11} />
										{errors.password_confirmation}
									</div>
								)}
							</div>

							{/* Conditions d'utilisation */}
							<div className="text-start space-y-2">
								<div className="flex items-start">
									<label className="flex items-start cursor-pointer transition-colors">
										<input
											id="acceptTerms"
											type="checkbox"
											name="acceptTerms"
											checked={formData.acceptTerms}
											onChange={handleChange}
											className={`mr-3 mt-1 rounded bg-[#2e2d3b] border-gray-600 text-[#4335C4] focus:ring-[#4335C4] focus:ring-offset-0 ${
												errors.acceptTerms ? "border-red-500" : ""
											}`}
											disabled={isSubmitting || loading}
										/>
										<span className="text-sm text-gray-600 leading-relaxed">
											J'accepte les{" "}
											<Link
												to="/terms-of-use"
												className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors underline"
											>
												conditions d'utilisation
											</Link>{" "}
											et la{" "}
											<Link
												to="/privacy-policy"
												className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors underline"
											>
												politique de confidentialité
											</Link>
										</span>
									</label>
								</div>
								{errors.acceptTerms && (
									<div className="flex items-center text-red-400 text-sm animate-fade-in">
										<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											/>
										</svg>
										{errors.acceptTerms}
									</div>
								)}
							</div>

							<div className="flex justify-center">
								<Button
									type="submit"
									disabled={loading}
									className={`${loading ? "opacity-50 cursor-not-allowed" : ""}`}
								>
									{loading ? (
										<div className="flex items-center">
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
											Inscription...
										</div>
									) : (
										"S'inscrire"
									)}
								</Button>
							</div>
						</form>

						<div className="mt-6 text-center">
							<p className="text-sm text-gray-600">
								Déjà un compte ?{" "}
								<Link
									to="/login"
									className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors duration-200"
								>
									Se connecter
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
