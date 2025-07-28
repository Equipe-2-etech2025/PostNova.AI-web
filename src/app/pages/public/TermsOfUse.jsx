import React from "react";

const ConditionsUtilisation = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="bg-gray-800 text-white px-6 py-4">
					<h1 className="text-2xl font-bold">Conditions d'utilisation</h1>
					<p className="text-gray-300 mt-1">
						Dernière mise à jour : {new Date().toLocaleDateString()}
					</p>
				</div>

				<div className="p-6 space-y-6">
					<section className="border-b border-gray-200 pb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							1. Acceptation des conditions
						</h2>
						<p className="text-gray-600">
							En accédant et en utilisant ce site web, vous acceptez d'être lié par ces
							conditions d'utilisation. Si vous n'acceptez pas toutes ces conditions,
							veuillez ne pas utiliser ce site.
						</p>
					</section>

					<section className="border-b border-gray-200 pb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							2. Utilisation du service
						</h2>
						<p className="text-gray-600 mb-3">
							Vous vous engagez à utiliser ce service uniquement à des fins légales et
							conformément à ces conditions.
						</p>
						<ul className="list-disc pl-5 space-y-2 text-gray-600">
							<li>Ne pas utiliser le site de manière frauduleuse ou abusive</li>
							<li>Ne pas tenter d'accéder à des zones non autorisées</li>
							<li>Ne pas perturber la sécurité ou la stabilité du service</li>
						</ul>
					</section>

					<section className="border-b border-gray-200 pb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							3. Modifications
						</h2>
						<p className="text-gray-600">
							Nous nous réservons le droit de modifier ces conditions à tout moment. La
							version mise à jour sera publiée sur cette page avec une indication de la
							date de révision.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-gray-800 mb-3">
							4. Nous contacter
						</h2>
						<p className="text-gray-600">
							Pour toute question concernant ces conditions, vous pouvez nous contacter
							à :
						</p>
						<div className="mt-3 p-4 bg-gray-50 rounded-md">
							<p className="font-medium">Email : contact@monsite.com</p>
							<p className="font-medium mt-1">
								Adresse : 123 Rue Exemple, Ville, Pays
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ConditionsUtilisation;
