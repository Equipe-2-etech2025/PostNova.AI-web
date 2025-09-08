import React, { useState } from "react";
import { initiatePayment } from "@services/paymentService";
import { BsCreditCard2BackFill, BsFillPhoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import logo from "@assets/logo.png";
import MV from "@assets/MV.png";

// ==================== Formulaire CARTE BANCAIRE ====================
const CardPaymentForm = () => {
	return (
		<div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg w-full text-center transition-transform transform hover:scale-105">
			<h2 className="text-gray-800 text-base font-semibold mb-3 tracking-wide">
				Paiement par carte bancaire
			</h2>
			<p className="text-gray-500 text-sm">🚧 Bientôt disponible 🚧</p>
			<div className="mt-4">
				<button
					disabled
					className="bg-white-300 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed text-sm font-medium"
				>
					À venir
				</button>
			</div>
		</div>
	);
};

/*const CardPaymentForm = ({ onSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [holder, setHolder] = useState("");

  const handleCardNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value.slice(0, 16));
  };

  const handleExpiry = (e) => {
    const input = e.target.value;
    const numbers = input.replace(/\D/g, "").slice(0, 4);
    let formatted = numbers;
    if (numbers.length > 2) formatted = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    if (input.length === 3 && input[2] === "/") formatted = numbers.slice(0, 2);
    if (input.length === 3 && input[2] !== "/") formatted = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    setExpiry(formatted);
  };

  const handleCvv = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value.slice(0, 3));
  };

  const handleHolder = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setHolder(value);
  };

  // Simulation d'une requête vers le backend
  const handlePayment = () => {
    // TODO: remplacer par un appel API (axios/fetch) vers Laravel
    setTimeout(() => {
      onSuccess(); // déclenche le succès dans PaymentForm
    }, 1000);
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-gray-700 text-sm font-medium mb-2">Coordonnées de la carte</h2>

      {/* Numéro de carte */
//<div className="bg-white border rounded-lg px-3 py-2 flex items-center justify-between mb-4">
//<input
/*type="text"
          placeholder="Numéro"
          value={cardNumber}
          onChange={handleCardNumber}
          className="flex-1 outline-none text-sm"
        />
        <div className="flex items-center space-x-1 ml-6">
          <img src="https://img.icons8.com/color/36/000000/visa.png" alt="visa" className="h-7" />
          <img src="https://img.icons8.com/color/36/000000/mastercard.png" alt="mastercard" className="h-7" />
        </div>
      </div>

      {/* Expiry + CVV */
/*<div className="flex space-x-2  mb-4">
        <div className="flex-1 border  bg-white rounded-lg p-2">
          <input
            type="text"
            placeholder="MM/AA"
            value={expiry}
            onChange={handleExpiry}
            className="w-full outline-none text-sm"
          />
        </div>
        <div className="flex-1 border bg-white rounded-lg p-2">
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={handleCvv}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {/* Titulaire */
/*<h2 className="text-gray-700 text-sm font-medium mb-2">Titulaire de la carte</h2>
      <input
        type="text"
        placeholder="Prénom Nom"
        value={holder}
        onChange={handleHolder}
        className="w-full p-3 rounded-lg border outline-none mb-4 text-sm bg-white"
      />

      {/* Bouton */
/*<button
        onClick={handlePayment}
        className="w-full bg-purple-400 text-white font-medium py-3 rounded-full shadow-md hover:opacity-50 transition"
      >
        Payer
      </button>
    </div>
  );
};
*/
// ==================== Formulaire MOBILE MONEY ====================
const MobileMoneyForm = ({
	onSuccess,
	userId,
	totalAmount = "199999",
}) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		if (!phoneNumber.startsWith("034") && !phoneNumber.startsWith("038")) {
			alert("Le numéro doit commencer par 034 ou 038");
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
				console.log("Paiement réussi :", response);

			} else {
				console.log("Réponse du backend", response);
			}
		} catch (error) {
			console.error("Erreur lors du paiement :", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-4 bg-gray-200 p-6 rounded-lg shadow-lg w-full">
			<h2 className="text-gray-700 text-sm font-medium mb-2">
				Coordonnées Mobile Money
			</h2>

			<div className="bg-white border rounded-lg px-3 py-3 flex items-center justify-between mb-4">
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
	const totalAmount = 199999;
	const navigate = useNavigate();
	const handlePaymentSuccess = () => {
		setPaymentSuccess(true);
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-white-300 p-4 overflow-hidden">
			<div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden border border-gray-200">
				{/* Partie gauche */}
				<div className="bg-gray-50 md:w-1/2 p-6">
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
				<div className="mt-4 bg-white md:w-1/2 p-6 flex flex-col justify-between">
					{paymentSuccess ? (
						<div className="flex flex-col items-center justify-center text-center space-y-4">
							<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
								✅
							</div>
							<p className="text-green-600 font-bold text-lg">Payement réussi!</p>
							<p className="text-gray-600 text-sm">
								Votre abonnement a été payer avec succes
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
									<p className=" ml-10 mb-6 font-bold">
										Sélectionnez un moyen de paiement :
									</p>
									<div className="flex flex-col space-y-6">
										<button
											onClick={() => setMethod("card")}
											className="flex items-center border border-gray-300 mb-6 rounded-lg px-4 py-3 hover:bg-blue-50 transition"
										>
											<BsCreditCard2BackFill className="text-purple-500 text-lg" />
											<span className="text-white-300 ml-3">Carte bancaire</span>
										</button>
										<button
											onClick={() => setMethod("mobile")}
											className="flex items-center border border-gray-300 mb-16 rounded-lg px-4 py-3 hover:bg-blue-50 transition"
										>
											<BsFillPhoneFill className="text-purple-500 text-lg" />
											<span className="ml-3">Virement Mobile money</span>
										</button>
									</div>
								</>
							)}

							{method === "card" && (
								<CardPaymentForm onSuccess={handlePaymentSuccess} />
							)}
							{method === "mobile" && (
								<MobileMoneyForm onSuccess={() => handlePaymentSuccess()} />
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PaymentForm;
