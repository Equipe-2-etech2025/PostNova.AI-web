import React from "react";
import { Link } from "react-router-dom";
import { BsLightningFill, BsBookmarksFill, BsCheck, BsX } from "react-icons/bs";
import Button from "@shared/Button";

const OurTarifs = () => {
	return (
		<section
			id="our-offers"
			className="py-20 md:py-32 relative bg-gray-50 dark:bg-gray-900/30"
		>
			<div className="container mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">Nos Offres</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Découvrez nos offres adaptées à vos besoins et propulsez votre business.
					</p>
				</div>

				<div className="flex flex-col md:flex-row items-stretch justify-center gap-8 px-4 max-w-5xl mx-auto">
					{/* Plan Gratuit */}
					<div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md relative overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
						<div className="flex justify-center mb-4">
							<div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full p-2">
								<BsLightningFill size={24} />
							</div>
						</div>
						<h3 className="text-2xl font-bold text-center mb-3">Plan Gratuit</h3>
						<div className="text-center mb-5">
							<strong className="text-xl text-purple-600 dark:text-purple-400">
								0€ / mois
							</strong>
						</div>
						<hr className="w-1/3 border-gray-200 dark:border-gray-700 my-5 mx-auto" />
						<div className="flex flex-col gap-3 flex-grow mb-6">
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									Jusqu'à 3 campagnes actives
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									10 modèles personnalisables
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsX size={20} className="text-red-500 mt-1 flex-shrink-0" />
								<p className="text-gray-500 dark:text-gray-400">
									Support client prioritaire
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsX size={20} className="text-red-500 mt-1 flex-shrink-0" />
								<p className="text-gray-500 dark:text-gray-400">
									Analyses avancées et rapports détaillés
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsX size={20} className="text-red-500 mt-1 flex-shrink-0" />
								<p className="text-gray-500 dark:text-gray-400">
									Intégrations API tierces
								</p>
							</div>
						</div>
						<div className="text-center mt-auto">
							<Link to="/register">
								<Button className="w-full bg-purple-600 hover:bg-purple-700 border-purple-600">
									Tester gratuitement
								</Button>
							</Link>
						</div>
					</div>

					{/* Plan Professionnel */}
					<div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md relative overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
						<div className="flex justify-center mb-4">
							<div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full p-2">
								<BsBookmarksFill size={24} />
							</div>
						</div>
						<h3 className="text-2xl font-bold text-center mb-3">Professionnel</h3>
						<div className="text-center mb-5">
							<strong className="text-xl text-purple-600 dark:text-purple-600">
								14,99€ / mois
							</strong>
						</div>
						<hr className="w-1/3 border-gray-200 dark:border-gray-700 my-5 mx-auto" />
						<div className="flex flex-col gap-3 flex-grow mb-6">
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">Campagnes illimitées</p>
							</div>
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									Plus de 50 modèles personnalisables
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									Support client prioritaire 24/7
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									Analyses avancées et rapports personnalisés
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									Intégrations API et CRM
								</p>
							</div>
							<div className="flex items-start gap-2">
								<BsCheck size={20} className="text-green-500 mt-1 flex-shrink-0" />
								<p className="text-gray-600 dark:text-gray-300">
									Accès aux fonctionnalités beta exclusives
								</p>
							</div>
						</div>
						<div className="text-center mt-auto">
							<Link to="/campaign/new">
								<Button className="w-full bg-purple-600 hover:bg-purple-700 border-purple-600">
									Commencer
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurTarifs;
