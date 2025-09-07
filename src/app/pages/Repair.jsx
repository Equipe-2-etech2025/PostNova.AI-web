import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import astro from "../../assets/astro-repair.png";
import station from "../../assets/station-spatiale.png";
import Button from "@shared/Button";

const Repair = () => {
	const navigate = useNavigate();
	const astroRef = useRef(null);
	const containerRef = useRef(null);
	const blackHoleRef = useRef(null);
	const stationRef = useRef(null);
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const checkDarkMode = () => {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setIsDark(true);
			} else {
				setIsDark(false);
			}
		};
		
		checkDarkMode();
		
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', checkDarkMode);
		
		return () => {
			mediaQuery.removeEventListener('change', checkDarkMode);
		};
	}, []);

	useEffect(() => {
		const moveAstro = () => {
			const el = astroRef.current;
			if (el) {
				el.animate(
					[
						{ transform: "translateY(0%) rotate(0deg)" }, 
						{ transform: "translateY(3vh) rotate(5deg)" }
					],
					{
						duration: 2000,
						iterations: Infinity,
						direction: "alternate",
						easing: "ease-in-out",
					}
				);
			}
		};

		const animateStation = () => {
			const stationEl = stationRef.current;
			if (stationEl) {
				stationEl.animate(
					[
						{ transform: "translateY(0px)" }, 
						{ transform: "translateY(-15px)" }
					],
					{
						duration: 3000,
						iterations: Infinity,
						direction: "alternate",
						easing: "ease-in-out",
					}
				);
			}
		};

		const animateBlackHole = () => {
			const blackHole = blackHoleRef.current;
			if (blackHole) {
				blackHole.animate(
					[
						{ transform: "rotate(0deg)" },
						{ transform: "rotate(360deg)" }
					],
					{
						duration: 30000,
						iterations: Infinity,
						easing: "linear"
					}
				);
			}
		};

		const createStars = () => {
			const container = containerRef.current;
			if (!container) return;
	
			const existingStars = container.querySelectorAll('.star, .shooting-star');
			existingStars.forEach(star => star.remove());
			
			for (let i = 0; i < 200; i++) {
				const star = document.createElement('div');
				star.className = 'star';
				star.style.left = `${Math.random() * 100}%`;
				star.style.top = `${Math.random() * 100}%`;
				star.style.width = `${Math.random() * 3}px`;
				star.style.height = star.style.width;
				star.style.animationDelay = `${Math.random() * 5}s`;
				container.appendChild(star);
			}
			
			setInterval(() => {
				if (Math.random() > 0.7) {
					const shootingStar = document.createElement('div');
					shootingStar.className = 'shooting-star';
					shootingStar.style.top = `${Math.random() * 40}%`;
					shootingStar.style.left = `${Math.random() * 20}%`;
					container.appendChild(shootingStar);
					
					setTimeout(() => {
						if (shootingStar.parentNode) {
							shootingStar.parentNode.removeChild(shootingStar);
						}
					}, 2000);
				}
			}, 3000);
		};

		moveAstro();
		animateStation();
		createStars();
		animateBlackHole();
		
		
	}, []);

	return (
		<div 
			ref={containerRef}
			className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black relative overflow-hidden"
		>
			{/* Brouillard cosmique autour du trou noir */}
			<div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black/0 blur-xl transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
			
			{/* Trou noir avec effet de tourbillon cosmique */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
				<div 
					ref={blackHoleRef}
					className="relative w-60 h-60"
				>
					{/* Centre du trou noir - obscurité totale */}
					<div className="absolute inset-0 rounded-full bg-black z-30 shadow-[inset_0_0_50px_5px_rgba(0,0,0,0.9)]"></div>
					
					{/* Anneau d'accrétion interne - énergie subtile */}
					<div className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-gray-900/40 blur-md z-20"></div>
					
					{/* Tourbillon de gaz sombre - filaments */}
					<div className="absolute -inset-12 rounded-full bg-gradient-to-r from-gray-800/30 via-purple-900/30 to-black/30 blur-lg z-10">
						<div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(100,100,100,0.1)_0%,_rgba(0,0,0,0)_70%)]"></div>
					</div>
					
					{/* Halos externes - gaz diffus sombre */}
					<div className="absolute -inset-20 rounded-full bg-gradient-to-r from-gray-800/15 via-purple-900/15 to-black/15 blur-2xl z-0"></div>
					
					{/* Particules et matière en orbite sombre */}
					<div className="absolute inset-0 rounded-full">
						{[...Array(24)].map((_, i) => (
							<div 
								key={i}
								className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-500 rounded-full transform origin-center"
								style={{
									transform: `rotate(${i * 15}deg) translateX(110px)`,
									animation: `orbit 4s linear infinite`,
									animationDelay: `${i * 0.17}s`,
									filter: 'blur(0.5px)',
									boxShadow: '0 0 5px 1px rgba(100,100,100,0.5)'
								}}
							></div>
						))}
						{[...Array(16)].map((_, i) => (
							<div 
								key={`outer-${i}`}
								className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-600 rounded-full transform origin-center"
								style={{
									transform: `rotate(${i * 22.5}deg) translateX(140px)`,
									animation: `orbit 6s linear infinite`,
									animationDelay: `${i * 0.25}s`,
									filter: 'blur(0.5px)',
									boxShadow: '0 0 6px 1px rgba(80,80,80,0.5)'
								}}
							></div>
						))}
					</div>
					
					{/* Effets de filaments tourbillonnants sombres */}
					<div className="absolute inset-0 rounded-full overflow-hidden">
						{[...Array(8)].map((_, i) => (
							<div 
								key={i}
								className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-b from-gray-600/50 to-transparent transform origin-center"
								style={{
									transform: `rotate(${i * 45}deg) translateX(50px)`,
									animation: `swirl 12s linear infinite`,
									animationDelay: `${i * 0.5}s`,
									filter: 'blur(1px)'
								}}
							></div>
						))}
					</div>

					{/* Ombres autour du trou noir */}
					<div className="absolute -inset-24 rounded-full bg-gradient-to-b from-black/30 via-transparent to-black/20 z-0 blur-lg"></div>
					<div className="absolute -inset-16 rounded-full bg-radial from-black/40 to-transparent z-5"></div>
				</div>
			</div>
			
			{/* Contenu Page en cours de développement */}
			<main className="flex flex-col md:flex-row items-center justify-center px-10 gap-12 flex-1 z-10">
				<div className="space-y-6 text-center md:text-left">
					<div>
						<h1 className="text-8xl font-bold bg-clip-text text-white">🚧</h1>
						<h2 className="text-4xl font-semibold mt-2">Page en cours de développement</h2>
					</div>
					<p className="text-gray-300 mt-3 max-w-sm">
						Cette section est actuellement en construction. 
						Nos développeurs travaillent dur pour la terminer au plus vite.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
						<Button color="tertiary" onClick={() => navigate(-1)}>
							Retour
						</Button>
						<Button onClick={() => navigate("/")}>
							Retour à l'accueil
						</Button>
					</div>
				</div>

				<div className="relative w-full max-w-2xl z-10 flex items-center justify-center">
					<div className="relative">
						<img
												ref={astroRef}
												src={astro}
												alt="Astronaute perdu dans l'espace"
												className="w-full max-w-sm mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
											/>
						<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
							<p className="text-gray-400 text-sm font-medium">Je suis en train de réparer cette page!</p>
						</div>
					</div>
					
					{/* Station spatiale */}
					<div className="relative ml-12">
						<img
							ref={stationRef}
							src={station}
							alt="Station spatiale en réparation"
							className="w-72 h-72 object-contain drop-shadow-[0_0_25px_rgba(255,223,0,0.9)]"
						/>
						{/* Effets de lumière/étincelles*/}
						<div className="absolute top-1/3 right-6 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-80"></div>
						<div className="absolute top-2/3 right-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-70" style={{animationDelay: '0.5s'}}></div>
						<div className="absolute bottom-1/4 left-4 w-5 h-5 bg-orange-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
					</div>
				</div>
			</main>
			
			{/* Styles dynamiques pour les étoiles et animations */}
			<style>
				{`
				.star {
					position: absolute;
					background-color: white;
					border-radius: 50%;
					animation: twinkle 5s infinite;
					opacity: 0.7;
				}
				
				@keyframes twinkle {
					0% { opacity: 0.3; }
					50% { opacity: 1; }
					100% { opacity: 0.3; }
				}
				
				.shooting-star {
					position: absolute;
					height: 2px;
					background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
					animation: shoot 2s ease-in-out;
				}
				
				@keyframes shoot {
					0% { 
						transform: translateX(0) translateY(0);
						opacity: 0;
						width: 0;
					}
					10% { opacity: 1; }
					100% { 
						transform: translateX(100vw) translateY(20vh);
						opacity: 0;
						width: 100px;
					}
				}
				
				@keyframes orbit {
					0% { transform: rotate(0deg) translateX(110px) rotate(0deg); }
					100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
				}
				
				@keyframes swirl {
					0% { transform: rotate(0deg) translateX(50px) scaleY(1); opacity: 0.5; }
					50% { transform: rotate(180deg) translateX(50px) scaleY(1.1); opacity: 0.7; }
					100% { transform: rotate(360deg) translateX(50px) scaleY(1); opacity: 0.5; }
				}
				`}
			</style>
		</div>
	);
};

export default Repair;