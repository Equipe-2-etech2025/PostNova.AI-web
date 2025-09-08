import React, { useState, useMemo } from "react";
import OurTarifs from "@components/Home/OurTarifs";
import Contact from "@components/Home/Contact";
import { Link } from "react-router";

// ==================== Données ====================
const sampleImages = {
	video:
		"https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop",
	tiktok:
		"https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
	linkedin:
		"https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop",
	twitter:
		"https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1600&auto=format&fit=crop",
	landing:
		"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
};

const brand = {
	name: "Postnova.AI",
	tagline:
		"Transformez un simple prompt en une campagne complète – vidéos courtes, posts LinkedIn & X, et landing page – prêtes à publier en < 1 min.",
};

const featureBullets = [
	{
		icon: "🎬",
		title: "Clips courts auto-montés",
		text:
			"TikTok, Reels, Shorts en formats 9:16 avec sous-titres, découpes dynamiques et musique libre de droit.",
	},
	{
		icon: "📝",
		title: "Posts percutants",
		text:
			"Accroches AIDA, variations de ton et hashtags pertinents pour LinkedIn et X (Twitter).",
	},
	{
		icon: "🌐",
		title: "Landing page clé en main",
		text:
			"Section héros, preuve sociale, FAQ, CTA et intégration newsletter, exportable en HTML/React.",
	},
	{
		icon: "⚡",
		title: "< 60 s, grâce à l'IA",
		text:
			"Pipeline accéléré, templates optimisés et rendu CDN pour une livraison quasi-instantanée.",
	},
];

const tiers = [
	{
		name: "Starter",
		price: "$0",
		period: "illimité",
		points: ["2 campagnes", "Exports MP4 & PNG", "1 marque"],
	},
	{
		name: "Pro",
		price: "$49",
		period: "/mo",
		points: ["Illimité", "Montage vidéo avancé", "3 marques"],
	},
];

const testimonials = [
	{
		name: "Nathan",
		role: "Back-end developer, Greenly",
		quote:
			"On a divisé par 10 le temps de production social. Les clips et les posts sortent prêts à publier.",
		avatar:
			"https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
	},
	{
		name: "Tahiry Houlder",
		role: "Front-end developer, Studio K",
		quote:
			"Une solution simple, rapide, et qui s'intègre parfaitement à notre workflow.",
		avatar:
			"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=800&auto=format&fit=crop",
	},
	{
		name: "Andhi Kenah",
		role: "Full-stack developer, Studio K",
		quote:
			"La landing auto-générée convertit mieux que nos pages faites à la main. Un must pour les lancements.",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
	},
	{
		name: "Lisa",
		role: "Ingénieur DevOps, Greenly",
		quote:
			"J'ai pu lancer une campagne complète en 30 minutes. Incroyable gain de temps.",
		avatar:
			"https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop",
	},
];

// ==================== Composants ====================

// Switch amélioré
const Switch = ({ checked, onCheckedChange }) => (
	<button
		type="button"
		onClick={() => onCheckedChange(!checked)}
		className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${checked ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`}
	>
		<span
			className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ${checked ? "translate-x-8" : "translate-x-1"}`}
		/>
	</button>
);

// Carte de contenu améliorée
const AssetCard = ({ type, title, thumb, meta }) => (
	<div className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
		<div className="aspect-video w-full overflow-hidden">
			<img
				src={thumb}
				alt={title}
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		</div>
		<div className="p-5">
			<h3 className="text-base font-semibold flex items-center gap-2 mb-1 text-gray-900 dark:text-white">
				{type === "video" && <span className="text-purple-600">🎬</span>}
				{type === "post" && <span className="text-blue-600">📝</span>}
				{type === "landing" && <span className="text-indigo-600">🌐</span>}
				{title}
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400">{meta}</p>
		</div>
	</div>
);

// Hero amélioré
const Hero = ({ onTry }) => (
	<section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
		{/* Éléments décoratifs */}
		<div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20">
			<div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob"></div>
			<div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-2000"></div>
			<div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-4000"></div>
		</div>

		<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
			<div>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6 shadow-sm">
					<span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
					Produit propulsé par IA
				</div>
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
					{brand.name}
				</h1>
				<p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
					{brand.tagline}
				</p>
				<button
					className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
					onClick={onTry}
				>
					Voir une démo
				</button>
			</div>
			<div className="relative">
				<div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
				<img
					src={sampleImages.landing}
					alt="Hero preview"
					className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105"
				/>
			</div>
		</div>
	</section>
);

// Feature Section améliorée
const FeatureSection = () => (
	<section className="py-20 bg-white dark:bg-gray-900">
		<div className="max-w-7xl mx-auto px-4">
			<h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
				Comment ça fonctionne
			</h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{featureBullets.map((f, i) => (
					<div
						key={i}
						className="group border border-gray-100 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 shadow-sm hover:shadow-md"
					>
						<div className="text-3xl mb-4 transform transition duration-300 group-hover:scale-110">
							{f.icon}
						</div>
						<h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
							{f.title}
						</h3>
						<p className="text-gray-600 dark:text-gray-400">{f.text}</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

// Playground amélioré
const Playground = () => {
	const [prompt, setPrompt] = useState(
		"Lancer un nouveau cours de programmation en ligne pour débutants..."
	);
	const [targets, setTargets] = useState({
		tiktok: true,
		linkedin: true,
		twitter: true,
		landing: true,
	});
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);

	const assets = useMemo(() => {
		if (!done) return [];
		const list = [];
		if (targets.tiktok)
			list.push({
				type: "image",
				title: "TikTok – description posts  ",
				thumb: sampleImages.tiktok,
				meta: "9:16 • Sous-titres auto",
			});
		if (targets.linkedin)
			list.push({
				type: "post",
				title: "Post LinkedIn – Story + CTA",
				thumb: sampleImages.linkedin,
				meta: "700–1 100 caractères",
			});
		if (targets.twitter)
			list.push({
				type: "post",
				title: " X – Conseils – Post réseaux ",
				thumb: sampleImages.twitter,
				meta: "Ton éducatif",
			});
		if (targets.landing)
			list.push({
				type: "landing",
				title: "Landing 'React Kickstart'",
				thumb: sampleImages.landing,
				meta: "Section héros + FAQ",
			});
		return list;
	}, [done, targets]);

	const handleGenerate = () => {
		setLoading(true);
		setDone(false);
		setTimeout(() => {
			setLoading(false);
			setDone(true);
		}, 1200);
	};

	return (
		<section
			className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800"
			id="playground"
		>
			<div className="max-w-7xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
					Essayez notre démo
				</h2>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Prompt + Switch */}
					<div className="lg:col-span-1 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
						<h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
							De votre prompt à la campagne
						</h3>
						<textarea
							value={prompt}
							readOnly
							onChange={(e) => setPrompt(e.target.value)}
							className="w-full p-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl min-h-[200px] resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
						/>
						<div className="mt-6 space-y-4">
							<h4 className="font-medium text-gray-900 dark:text-white">
								Plateformes cibles
							</h4>
							{Object.keys(targets).map((key) => (
								<div
									key={key}
									className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
								>
									<span className="capitalize font-medium text-gray-700 dark:text-gray-300">
										{key}
									</span>
									<Switch
										checked={targets[key]}
										onCheckedChange={(v) => setTargets({ ...targets, [key]: v })}
									/>
								</div>
							))}
						</div>
						<button
							onClick={handleGenerate}
							className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={loading}
						>
							{loading ? (
								<span className="flex items-center justify-center">
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
									Génération en cours...
								</span>
							) : (
								"🚀 Générer la campagne"
							)}
						</button>
					</div>

					{/* Résultats */}
					<div className="lg:col-span-2">
						{loading && (
							<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700 text-center">
								<div className="flex justify-center mb-4">
									<div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-700 border-t-purple-600 rounded-full animate-spin"></div>
								</div>
								<p className="text-gray-700 dark:text-gray-300">
									Assemblage des clips, posts et landing…
								</p>
							</div>
						)}
						{!loading && done && (
							<div className="grid sm:grid-cols-2 gap-6">
								{assets.map((a, i) => (
									<AssetCard key={i} {...a} />
								))}
							</div>
						)}
						{!loading && !done && (
							<div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500">
								Aucun résultat (encore)
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

// Testimonials améliorés
const Testimonials = () => (
	<section className="py-20 bg-white dark:bg-gray-900">
		<div className="max-w-7xl mx-auto px-4">
			<h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
				Ce que disent nos utilisateurs
			</h2>
			<div className="grid md:grid-cols-2 gap-8">
				{testimonials.map((t, i) => (
					<div
						key={i}
						className="group border border-gray-100 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
					>
						<div className="flex items-center gap-4 mb-4">
							<div className="relative">
								<div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
								<img
									src={t.avatar}
									alt={t.name}
									className="relative w-12 h-12 rounded-full"
								/>
							</div>
							<div>
								<h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
								<p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
							</div>
						</div>
						<p className="text-gray-700 dark:text-gray-300 italic">"{t.quote}"</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

// Footer amélioré
const Footer = () => (
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
);

// ==================== Page About ====================
export default function About() {
	const onTry = () => {
		const el = document.querySelector("#playground");
		el?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
			<Hero onTry={onTry} />
			<FeatureSection />
			<Playground />
			<OurTarifs />
			<Testimonials />
			<Contact />
			<Footer />
		</div>
	);
}
