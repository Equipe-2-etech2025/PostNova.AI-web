import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { useNotification } from "@hooks/useNotification";
import { Button } from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import TypewriterText from "@components/Auth/TypewriterText";
import galaxy from "@assets/galaxy.png";
import logo from "@assets/logo.png";

const Login = () => {
	const navigate = useNavigate();
	const { login, loading } = useAuth();
	const { notification, showSuccess, showError, showWarning, hideNotification } =
		useNotification();

	// États pour le formulaire
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});

	// États pour les erreurs et messages
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showMessage, setShowMessage] = useState(false);

	// Gérer les changements dans les inputs
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

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

		if (!formData.email) {
			newErrors.email = "L'email est requis";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Format d'email invalide";
		}

		if (!formData.password) {
			newErrors.password = "Le mot de passe est requis";
		} else if (formData.password.length < 6) {
			newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
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
		setMessage("");
		setErrors({});
		setShowMessage(false);

		try {
			const result = await login({
				email: formData.email,
				password: formData.password,
			});

			if (result.success) {
				navigate("/dashboard");
			} else {
				showError(result.message, {
					duration: 5000,
					position: "top-center",
				});
				if (result.errors) {
					setErrors(result.errors);
				}
			}
		} catch (error) {
			console.error("Erreur de connexion:", error);
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

			<div className="h-screen w-full bg-[#1c1b23] text-white flex flex-col md:flex-row overflow-hidden">
				{/*Left Section*/}
				<div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
					<div className="w-full max-w-md space-y-6">
						<div className="text-center space-y-2">
							<div className="flex items-center justify-center gap-2 mb-20">
								<img src={logo} className="size-15" alt="" />
								<h1 className="text-2xl font-bold text-white cursor-pointer">
									<strong>PostNova</strong>
								</h1>
							</div>
							<h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
								Se connecter
							</h2>
							<p className="text-sm text-gray-400">
								Connectez-vous à votre compte PostNova.AI pour accéder à vos campagnes.
							</p>
						</div>

						<form className="space-y-6" onSubmit={handleSubmit}>
							{/* Email */}
							<div className="space-y-2">
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Email"
									className={`w-full px-4 py-3 rounded-lg bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.email
											? "focus:ring-red-500 border border-red-500 shake"
											: "focus:ring-[#4335C4] hover:bg-[#353447]"
									}`}
									disabled={isSubmitting || loading}
								/>
								{errors.email && (
									<div className="flex items-center text-red-400 text-sm animate-fade-in">
										<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											/>
										</svg>
										{errors.email}
									</div>
								)}
							</div>

							{/* Mot de passe */}
							<div className="space-y-2">
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Mot de passe"
									className={`w-full px-4 py-3 rounded-lg bg-[#2e2d3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.password
											? "focus:ring-red-500 border border-red-500 shake"
											: "focus:ring-[#4335C4] hover:bg-[#353447]"
									}`}
									disabled={isSubmitting || loading}
								/>
								{errors.password && (
									<div className="flex items-center text-red-400 text-sm animate-fade-in">
										<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
												clipRule="evenodd"
											/>
										</svg>
										{errors.password}
									</div>
								)}
							</div>

							{/* Options */}
							<div className="flex items-center justify-between text-sm text-gray-300">
								<label className="flex items-center cursor-pointer hover:text-white transition-colors">
									<input
										type="checkbox"
										name="remember"
										checked={formData.remember}
										onChange={handleChange}
										className="mr-2 rounded bg-[#2e2d3b] border-gray-600 text-[#4335C4] focus:ring-[#4335C4] focus:ring-offset-0"
										disabled={isSubmitting || loading}
									/>
									Se souvenir de moi
								</label>
								<Link
									to="/resetPassword"
									className="text-gray-400 hover:text-[#4335C4] transition-colors duration-200"
								>
									Mot de passe oublié ?
								</Link>
							</div>

							{/* Bouton de connexion */}
							<div className="flex justify-center">
								<Button
									type="submit"
									disabled={isSubmitting || loading}
									className={`relative overflow-hidden ${
										isSubmitting || loading
											? "opacity-50 cursor-not-allowed"
											: "hover:shadow-lg hover:shadow-[#4335C4]/25 transform hover:scale-105"
									} transition-all duration-300`}
								>
									{isSubmitting || loading ? (
										<div className="flex items-center">
											<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
											Connexion...
										</div>
									) : (
										<span className="flex items-center">Se connecter</span>
									)}
								</Button>
							</div>
						</form>

						{/* Lien vers l'inscription */}
						<div className="text-center text-sm text-gray-400">
							Pas encore de compte ?{" "}
							<Link
								to="/register"
								className="text-[#4335C4] hover:text-[#5a4fd4] transition-colors font-medium hover:underline"
							>
								S'inscrire
							</Link>
						</div>
					</div>
				</div>

				{/*Right Section avec animation typewriter*/}
				<div className="flex-1 relative p-4 h-64 md:h-auto">
					<img
						src={galaxy}
						alt="galaxy"
						className="w-full h-full object-cover opacity-30 rounded-2xl"
					/>
					<div className="absolute bottom-16 left-0 right-0 text-center px-4">
						<TypewriterText
							text="Une idée, une campagne"
							typingSpeed={80}
							deleteSpeed={40}
							pauseTime={2500}
							loop={true}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
