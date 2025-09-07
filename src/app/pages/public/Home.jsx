import React from "react";
import { BsGlobe, BsImage, BsFileEarmarkText } from "react-icons/bs";
import { InputPrompt } from "@components/Home/InputPrompt";
import { Card } from "@shared/Card";
import PopularContent from "@components/Home/PopularContent";
import OurTarifs from "@components/Home/OurTarifs";
import Contact from "@components/Home/Contact";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			{/* Background gradient arc */}
			<div className="absolute top-0 left-1/2 w-[150%] h-[800px] transform -translate-x-1/2 bg-gradient-to-b from-purple-600/10 via-blue-500/10 to-transparent rounded-b-[50%] z-0"></div>

			{/* Hero Section */}
			<section id="home" className="relative h-screen overflow-hidden mt-0">
				{/* Energy particles */}
				<div className="absolute top-40 left-1/6 w-20 h-20 rounded-full bg-purple-500 opacity-60 blur-md animate-pulse animate-bounce"></div>
				<div
					className="absolute top-80 right-1/3 w-15 h-15 rounded-full bg-blue-400 opacity-50 blur-md animate-pulse animate-bounce"
					style={{ animationDelay: "1s" }}
				></div>
				<div
					className="absolute top-20 right-1/4 w-16 h-16 bg-blue-400 opacity-50 blur-md animate-pulse rounded-full animate-bounce"
					style={{ animationDelay: "1s" }}
				></div>

				<div className="container flex flex-col items-center justify-center h-full mx-auto relative z-10">
					<h1 className="text-6xl font-extrabold leading-tight text-center text-gray-900 dark:text-white">
						Créez un <span className="text-purple-600">Post</span>, in
						<span className="text-purple-600">Nova</span>nte
					</h1>
					<p className="text-xl text-center mb-8 max-w-2xl">
						Une idée ? L'IA la transforme en campagne complète en quelques secondes.
						<span className="block mt-2 text-purple-500 font-semibold">
							La révolution marketing est née.
						</span>
					</p>
					<div className="w-2/3 mt-8">
						<InputPrompt placeholder="Demander à PostNova de générer ..." />
					</div>
				</div>

				{/* Bottom particles */}
				<div className="absolute bottom-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-70 animate-bounce"></div>
				<div
					className="absolute bottom-40 right-1/4 w-3 h-3 bg-purple-500 rounded-full opacity-80 animate-bounce"
					style={{ animationDelay: "0.3s" }}
				></div>
			</section>

			{/* Services Section */}
			<section id="our-services" className="py-20 md:py-32 relative">
				<div className="container mx-auto text-center">
					<div className="mb-12">
						<h2 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
							De la création de contenu à la gestion de campagnes, nous avons tout ce
							qu'il vous faut pour propulser votre présence en ligne.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
						<Card styles="p-6 md:p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
							<div className="flex justify-center mb-5">
								<div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full p-3">
									<BsGlobe size={28} />
								</div>
							</div>
							<h4 className="text-xl md:text-2xl font-bold mb-3 text-center">
								Publication sur les réseaux
							</h4>
							<p className="text-gray-600 dark:text-gray-300 text-center flex-grow">
								Publiez du contenu engageant sur les réseaux sociaux avec l'aide de
								l'IA.
							</p>
						</Card>

						<Card styles="p-6 md:p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
							<div className="flex justify-center mb-5">
								<div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-3">
									<BsImage size={28} />
								</div>
							</div>
							<h4 className="text-xl md:text-2xl font-bold mb-3 text-center">Image</h4>
							<p className="text-gray-600 dark:text-gray-300 text-center flex-grow">
								Créez des images captivantes pour vos campagnes marketing.
							</p>
						</Card>

						<Card styles="p-6 md:p-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
							<div className="flex justify-center mb-5">
								<div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-3">
									<BsFileEarmarkText size={28} />
								</div>
							</div>
							<h4 className="text-xl md:text-2xl font-bold mb-3 text-center">
								Landing page
							</h4>
							<p className="text-gray-600 dark:text-gray-300 text-center flex-grow">
								Concevez des pages d'atterrissage optimisées pour convertir vos
								visiteurs en clients.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* Popular Content */}
			<PopularContent />

			{/* Tarifs Section */}
			<section id="tarifs">
				<OurTarifs />
			</section>

			{/* Contact Section */}
			<section id="contact">
				<Contact />
			</section>

			{/* Footer */}
			<section id="footer">
				<footer className="py-12 bg-gray-900 text-white">
					<div className="container mx-auto px-4">
						<div className="flex flex-col md:flex-row justify-between items-start gap-8">
							{/* Logo et description */}
							<div className="flex-1">
								<Link to="/">
									<span className="text-xl font-bold">PostNova</span>
								</Link>
								<p className="mt-3 text-gray-400 max-w-md text-sm">
									Transformez vos idées en campagnes marketing percutantes avec
									l'intelligence artificielle.
								</p>
							</div>

							{/* Liens rapides */}
							<div className="flex-1">
								<h4 className="text-lg font-bold mb-3">Liens rapides</h4>
								<div className="grid grid-cols-2 gap-2">
									<a
										href="/"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										Accueil
									</a>
									<Link
										to="/about"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										À propos
									</Link>
									<a
										href="#tarifs"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										Nos offres
									</a>
									<a
										href="#contact"
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										Contact
									</a>
								</div>
							</div>

							{/* Newsletter */}
							<div className="flex-1">
								<h4 className="text-lg font-bold mb-3">Newsletter</h4>
								<p className="text-gray-400 mb-3 text-sm">
									Inscrivez-vous pour recevoir nos actualités
								</p>
								<div className="flex">
									<input
										type="email"
										placeholder="Votre email"
										className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1 text-sm"
									/>
									<button className="bg-purple-600 px-3 py-2 rounded-r-lg hover:bg-purple-700 transition-colors text-sm">
										Ok
									</button>
								</div>
							</div>
						</div>

						{/* Copyright */}
						<div className="border-t border-gray-800 mt-10 pt-6 text-center">
							<p className="text-gray-400 text-sm">
								Copyright 2025 - Made with <span className="text-pink-500">❤️</span> by
								Equipe 2
							</p>
						</div>
					</div>
				</footer>
			</section>
		</>
	);
};

export default Home;
