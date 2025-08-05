import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { useNotification } from "@hooks/useNotification";
import MessageNotification from "@shared/MessageNotification";
import { emailService } from "@services/emailService";

const EmailVerification = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { user } = useAuth();
	const { notification, showSuccess, showError, showInfo, hideNotification } =
		useNotification();
	const { setIsAuthenticated, setUser } = useAuth();

	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [canResend, setCanResend] = useState(true);
	const [resendCooldown, setResendCooldown] = useState(0);
	const hasVerifiedOnceRef = useRef(false);

	const location = useLocation();
	const email = location.state?.email;

	// Vérifier automatiquement si on a les paramètres dans l'URL
	useEffect(() => {
		const id = searchParams.get("id");
		const hash = searchParams.get("hash");
		const expires = searchParams.get("expires");
		const signature = searchParams.get("signature");

		if (id && hash && expires && signature && !hasVerifiedOnceRef.current) {
			hasVerifiedOnceRef.current = true;
			handleVerifyFromUrl({ id, hash, expires, signature });
		}
	}, [searchParams]);

	const handleVerifyFromUrl = async (params) => {
		try {
			setIsVerifying(true);
			console.log(params);
			const result = await emailService.verifyEmail(params);
			console.log("Email vérication...");

			if (result.success) {
				console.log("Email vérifié");
				localStorage.setItem("auth_token", result.token);
				setUser(result.user);
				setIsAuthenticated(true);
				// Redirection vers le dashboard
				setTimeout(() => {
					navigate("/dashboard");
				}, 1000);
			} else {
				showError(result.message);
			}
		} catch (error) {
			console.log(error);
			showError("Erreur lors de la vérification de l'email");
		} finally {
			setIsVerifying(false);
		}
	};

	// Si l'email est déjà vérifié
	if (user?.email_verified_at) {
		return (
			<div className="min-h-screen w-full bg-[#1c1b23] text-white flex items-center justify-center p-6">
				<div className="w-full max-w-md">
					<div className="bg-[#2e2d3b] rounded-2xl shadow-2xl p-8 border border-gray-700/50">
						<div className="text-center">
							<div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>

							<h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
								Email vérifié !
							</h1>

							<p className="text-gray-400 mb-6">
								Votre email a été vérifié le{" "}
								{new Date(user.email_verified_at).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

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

			<div className="min-h-screen w-full bg-[#1c1b23] text-white flex items-center justify-center p-6">
				<div className="w-full max-w-md">
					<div className="bg-[#2e2d3b] rounded-2xl shadow-2xl p-8 border border-gray-700/50">
						{/* Header */}
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-[#4335C4] rounded-full flex items-center justify-center mx-auto mb-4">
								{isVerifying ? (
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
								) : (
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								)}
							</div>

							<h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
								{isVerifying ? "Vérification en cours..." : "Vérifiez votre email"}
							</h1>

							{!isVerifying && (
								<>
									<p className="text-gray-400 text-sm leading-relaxed">
										Nous avons envoyé un lien de vérification à
									</p>
									<p className="text-[#4335C4] font-medium mt-1">{user?.email}</p>
								</>
							)}
						</div>

						{/* Contenu principal */}
						{!isVerifying && (
							<div className="space-y-6">
								<div className="text-center text-gray-300">
									<p className="mb-4">
										Cliquez sur le lien dans l'email pour vérifier votre compte.
									</p>
								</div>
							</div>
						)}

						{/* Si en cours de vérification */}
						{isVerifying && (
							<div className="text-center">
								<div className="animate-pulse text-gray-300 mb-4">
									Vérification de votre email en cours...
								</div>
								<div className="text-sm text-gray-400">
									Veuillez patienter quelques instants
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default EmailVerification;
