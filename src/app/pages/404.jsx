import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import astro from "../../assets/astro.png";
import Button from "@shared/Button";

const NotFound = () => {
	const navigate = useNavigate();
	const astroRef = useRef(null);

	useEffect(() => {
		const move = () => {
			const el = astroRef.current;
			if (el) {
				el.animate(
					[{ transform: "translateY(0%)" }, { transform: "translateY(3vh)" }],
					{
						duration: 2000,
						iterations: Infinity,
						direction: "alternate",
						easing: "linear",
					}
				);
			}
		};
		move();
	}, []);

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0e24] via-[#1a1b3a] to-[#2d2b5e] text-white">
			{/* 404 Content */}
			<main className="flex flex-col md:flex-row items-center justify-center px-10 gap-12 flex-1">
				<div className="space-y-6">
					<div>
						<h1 className="text-8xl font-bold">404</h1>
						<h2 className="text-4xl font-semibold mt-2">Page introuvable</h2>
					</div>
					<p className="text-gray-400 mt-3 max-w-sm">
						Desolé, la page que vous essayez de consulter est introvable
					</p>
					<Button color="tertiary" onClick={() => navigate(-1)}>Retour</Button>
				</div>

				<div className="relative w-full max-w-md">
					<img
						ref={astroRef}
						src={astro}
						alt="Astro"
						className="w-full max-w-sm mx-auto"
					/>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-[#101010] py-6 text-center text-sm border-t border-blue-500">
				<div className="flex flex-col gap-4 text-center text-sm">
					<Link to={"/"}>
						<span className="text-xl font-bold">PostNova</span>
					</Link>
					<div className="flex justify-center gap-6 my-6">
						<Link to={"/"}>Accueil</Link>
						<Link to={"/about"}>À propos</Link>
						<Link to={"/our-offers"}>Nos offres</Link>
					</div>
					<p className="text-gray-400">
						Copyright 2025 - Made with <span className="text-pink-500">❤️</span> by
						Equipe 2
					</p>
				</div>
			</footer>
		</div>
	);
};
export default NotFound;
