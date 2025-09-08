import React, { useState } from "react";
import { initiatePayment } from "@services/paymentService";
import { BsCreditCard2BackFill, BsFillPhoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";
import MV from "@assets/MV.png";
import MessageNotification from "@shared/MessageNotification";

// ==================== Formulaire CARTE BANCAIRE ====================
const CardPaymentForm = () => {
	return (
		<div className="dark:bg-gray-500 mt-10 bg-gray-100 p-6 rounded-lg shadow-lg w-full text-center transition-transform transform hover:scale-105">
			<h2 className="dark:text-white text-gray-800 text-base font-semibold mb-3 tracking-wide">
				Paiement par carte bancaire
			</h2>
			<p className="dark:text-white text-gray-500 text-sm">🚧 Bientôt disponible 🚧</p>
			<div className="mt-4">
				<button
					disabled
					className="dark:text-white bg-white-300 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed text-sm font-medium"
				>
					À venir
				</button>
			</div>
		</div>
	);
};

// ==================== Formulaire MOBILE MONEY ====================
const MobileMoneyForm = ({ onSuccess, userId, totalAmount = "199999", showMessage }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		if (!phoneNumber.startsWith("034") && !phoneNumber.startsWith("038")) {
			showMessage("Le numéro doit commencer par 034 ou 038", "warning");
			return;
		}

		setLoading(true);
		try {
			const response = await initiatePayment({
				amount: totalAmount,
				description: "AbonnementMensuel",
				currency: "Ar",
				customer_msisdn: phoneNumber,
				merchant_msisdn: "0343500001",
				user_id: userId,
			});

			if (response && response.success) {
				onSuccess();
				showMessage("Paiement réussi ✅", "success");
				console.log("Paiement réussi :", response);
			} else {
				showMessage("Échec du paiement. Veuillez réessayer.", "error");
				console.log("Réponse du backend", response);
			}
		} catch (error) {
			showMessage("Erreur lors du paiement. Vérifiez votre connexion.", "error");
			console.error("Erreur lors du paiement :", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="dark:bg-gray-500 mt-4 bg-gray-200 p-6 rounded-lg shadow-lg w-full">
			<h2 className="text-gray-700 text-sm font-medium mb-2">Coordonnées Mobile Money</h2>

			<div className="bg-white dark:bg-gray-400 border rounded-lg px-3 py-3 flex items-center justify-between mb-4">
				<input
					type="text"
					placeholder="Numéro (034 / 038)"
					value={phoneNumber}
					onChange={(e) =>
						setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
					}
					className="flex-1 outline-none text-sm"
				/>
				<div className="flex items-center ml-4">
					<img src={MV} alt="mobile money" className="h-7 rounded-lg" />
				</div>
			</div>

			<button
				onClick={handlePayment}
				disabled={loading}
				className="w-full bg-purple-400 text-white font-medium py-3 rounded-full shadow-md hover:opacity-50 transition"
			>
				{loading ? "Paiement en cours..." : "Payer"}
			</button>
		</div>
	);
};

// ==================== COMPOSANT PRINCIPAL ====================
const PaymentForm = () => {
	const [method, setMethod] = useState(null);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		visible: false,
	});
	const totalAmount = 199999;
	const navigate = useNavigate();

	const handlePaymentSuccess = () => {
		setPaymentSuccess(true);
	};

	// Fonction pour afficher les notifications
	const showMessage = (message, type = "info") => {
		setNotification({ message, type, visible: true });
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-white-300 p-4 overflow-hidden">
			<div className="dark:bg-gray-700 bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden border border-gray-200">
				{/* Partie gauche */}
				<div className="bg-gray-50 dark:bg-gray-800 dark:border-gray-800 md:w-1/2 p-6">
					<div className="flex items-center space-x-3 mb-6">
						<div className="w-8 h-8 rounded-full flex items-center justify-center text-white-500">
							<img src={logo} alt="Logo" />
						</div>
						<span className="text-xl font-semibold text-white-500">PostnovaAI</span>
					</div>

					<div className="space-y-3">
						<div>
							<p className="text-sm  text-gray-500">Destinataire :</p>
							<a href="#" className="text-purple-500 text-sm hover:underline">
								PostnovaAI.com
							</a>
						</div>
						<div>
							<p className="text-sm font-bold text-gray-500">Description :</p>
							<a href="#" className="text-purple-500 text-sm hover:underline">
								Abonnement mensuel
							</a>
						</div>
						<div>
							<p className="text-sm font-bold text-gray-500">À payer :</p>
							<p className="text-2xl font-bold text-purple-500">{totalAmount} AR</p>
						</div>
						<div>
							<p className="text-sm font-bold text-gray-500">
								Total :{" "}
								<span className="text-purple-500">
									{totalAmount.toLocaleString()} AR
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Partie droite */}
				<div className="dark:bg-gray-700 mt-4 bg-white md:w-1/2 p-6 flex flex-col justify-between">
					{paymentSuccess ? (
						<div className="flex flex-col items-center justify-center text-center space-y-4">
							<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
								✅
							</div>
							<p className="text-green-600 font-bold text-lg">Payement réussi!</p>
							<p className="dark:text-white text-gray-600 text-sm">
								Votre abonnement a été payé avec succès
							</p>
							<button
								onClick={() => navigate("/factures")}
								className="bg-purple-300 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
							>
								Voir votre facture
							</button>
						</div>
					) : (
						<>
							{!method && (
								<>
									<p className="ml-10 mb-6 font-bold">
										Sélectionnez un moyen de paiement :
									</p>
									<div className="flex flex-col space-y-6">
										<button
											onClick={() => setMethod("card")}
											className="flex items-center border border-gray-300 mb-6 rounded-lg px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-500 transition"
										>
											<BsCreditCard2BackFill className="text-purple-500 text-lg" />
											<span className="text-white-300 ml-3">Carte bancaire</span>
										</button>
										<button
											onClick={() => setMethod("mobile")}
											className="flex items-center border border-gray-300 mb-16 rounded-lg px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-500 transition"
										>
											<BsFillPhoneFill className="text-purple-500 text-lg" />
											<span className="ml-3">Virement Mobile money</span>
										</button>
									</div>
								</>
							)}

							{method === "card" && <CardPaymentForm onSuccess={handlePaymentSuccess} />}
							{method === "mobile" && (
								<MobileMoneyForm onSuccess={handlePaymentSuccess} showMessage={showMessage} />
							)}
						</>
					)}
				</div>
			</div>

			{/* ✅ Notification */}
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.visible}
				onClose={() => setNotification({ ...notification, visible: false })}
			/>
		</div>
	);
};

export default PaymentForm;
