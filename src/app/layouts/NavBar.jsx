import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsMoonStarsFill, BsSunriseFill } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import useTheme from "@hooks/useTheme";
import Button from "@shared/Button";
import logo from "@assets/logo.png";

const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div
			className=" sticky top-0 z-40 backdrop-blur-md bg-gray-500/40 dark:bg-gray-800/40 border-b border-black/10 dark:border-white/10 transition-colors duration-300"
		>
			<div className="container mx-auto flex items-center justify-between py-5 px-4">
				{/* Logo */}
				<Link to="/" className="text-2xl font-bold flex items-center gap-2">
					<img className="size-10" src={logo} alt="logo" />
					<strong>PostNova</strong>
				</Link>

				{/* Menu desktop */}
				<nav className="hidden md:flex gap-6">
					<a href="#">A propos</a>
					<a href="#our-services">Nos services</a>
					<a href="#our-offers">Nos offres</a>
				</nav>

				{/* Boutons */}
				<div className="hidden md:flex items-center gap-2">
					<Button
						variant="outline"
						color="tertiary"
						circle
						className="px-4 py-3"
						onClick={toggleTheme}
					>
						{theme === "light" ? (
							<BsMoonStarsFill size={16} />
						) : (
							<BsSunriseFill size={16} />
						)}
					</Button>
					<Button as={Link} to="/login" circle variant="solid" color="neutral">
						Se connecter
					</Button>
				</div>

				{/* Bouton menu mobile */}
				<div className="md:hidden">
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="text-gray-700 dark:text-gray-200"
					>
						{menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
					</button>
				</div>
			</div>

			{/* Menu mobile */}
			{menuOpen && (
				<div className="md:hidden bg-gray-500/90 dark:bg-gray-800/90 backdrop-blur-md p-5 space-y-4 animate-fade-in">
					<nav className="flex flex-col gap-4">
						<a href="#" onClick={() => setMenuOpen(false)}>
							A propos
						</a>
						<a href="#our-services" onClick={() => setMenuOpen(false)}>
							Nos services
						</a>
						<a href="#our-offers" onClick={() => setMenuOpen(false)}>
							Nos offres
						</a>
					</nav>
					<div className="flex items-center gap-2 pt-4 border-t border-gray-400/30">
						<Button
							variant="outline"
							color="tertiary"
							circle
							className="px-4 py-3"
							onClick={toggleTheme}
						>
							{theme === "light" ? (
								<BsMoonStarsFill size={16} />
							) : (
								<BsSunriseFill size={16} />
							)}
						</Button>
						<Button as={Link} to="/login" circle variant="solid" color="neutral">
							Se connecter
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavBar;
