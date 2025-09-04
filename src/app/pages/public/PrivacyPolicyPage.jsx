import React from "react";

const PrivacyPolicyPage = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="bg-gray-700 text-white px-6 py-4">
					<h1 className="text-2xl font-bold">Politique de confidentialité</h1>
					<p className="text-gray-400 mt-1">
						Dernière mise à jour : {new Date().toLocaleDateString()}
					</p>
				</div>

				<div className="p-6 space-y-6">
					<section className="border-b border-gray-200 pb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							1. Données collectées
						</h2>
						<p className="text-gray-600 mb-3">
							Nous collectons les informations suivantes lorsque vous utilisez notre
							service :
						</p>
						<ul className="list-disc pl-5 space-y-2 text-gray-600">
							<li>Informations personnelles (nom, email) lors de l'inscription</li>
							<li>Données de navigation (adresse IP, type de navigateur)</li>
							<li>Cookies et technologies similaires</li>
						</ul>
					</section>

					<section className="border-b border-gray-200 pb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							2. Utilisation des données
						</h2>
						<p className="text-gray-600">Vos données sont utilisées pour :</p>
						<ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
							<li>Fournir et maintenir notre service</li>
							<li>Améliorer l'expérience utilisateur</li>
							<li>Prévenir les fraudes et abus</li>
							<li>Communication (si vous y consentez)</li>
						</ul>
					</section>

					<section className="border-b border-gray-200 pb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							3. Protection des données
						</h2>
						<p className="text-gray-600 mb-3">
							Nous mettons en œuvre des mesures de sécurité techniques et
							organisationnelles appropriées pour protéger vos données.
						</p>
						<p className="text-gray-600">
							Nous ne vendons ni ne louons vos données personnelles à des tiers.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							4. Vos droits
						</h2>
						<p className="text-gray-600 mb-3">
							Conformément au RGPD et autres lois sur la protection des données, vous
							avez le droit de :
						</p>
						<ul className="list-disc pl-5 space-y-2 text-gray-600">
							<li>Accéder à vos données personnelles</li>
							<li>Demander leur rectification ou suppression</li>
							<li>Vous opposer à leur traitement</li>
							<li>Demander la portabilité de vos données</li>
						</ul>
						<div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
							<p className="text-blue-800 font-medium">
								Pour exercer ces droits, contactez-nous à : privacy@monsite.com
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicyPage;
