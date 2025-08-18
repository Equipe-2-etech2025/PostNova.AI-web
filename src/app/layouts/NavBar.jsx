import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
	BsBoxArrowRight,
	BsChevronDown,
	BsMoonStarsFill,
	BsPersonFill,
	BsSpeedometer2,
	BsSunriseFill,
} from "react-icons/bs";
import useTheme from "@hooks/useTheme";
import useAuth from "@hooks/useAuth";
import Button from "@shared/Button";
import Tag from "@shared/Tag";
import logo from "@assets/logo.png";

const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	const { user, isAuthenticated, logout, loading } = useAuth();

	const [userMenuOpen, setUserMenuOpen] = useState(false);

	const menuRef = useRef(null);

	// Close menu when clicking outside
	useEffect(() => {
		if (userMenuOpen) {
			const handleClickOutside = (event) => {
				if (menuRef.current && !menuRef.current.contains(event.target)) {
					setUserMenuOpen(false);
					console.log("Clicked outside");
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [userMenuOpen]);

	const navigationItems = () => {
		const publicItems = [
			{ label: "Nos services", href: "#our-services" },
			{ label: "Explorer", href: "#popular-content" },
			{ label: "Nos offres", href: "#our-offers" },
			{ label: "À propos", to: "/about" },
			{ label: "Contact", href: "#contact" },
		];

		if (!isAuthenticated) {
			return publicItems;
		}

		const userItems = [
			{ label: "Dashboard", to: "/dashboard" },
			{ label: "Mes Campagnes", to: "/campaigns" },
			{ label: "Explorer", to: "/explore" },
			{ label: "À propos", to: "/about" },
		];

		const adminItems = [
			{ label: "Dashboard Admin", to: "/admin/dashboard" },
			{ label: "Utilisateurs", to: "/admin/users" },
			{ label: "Campagnes", to: "/admin/campaigns" },
			{ label: "Système", to: "/admin/system" },
			{ label: "À propos", to: "/about" },
		];

		if (user?.role === "admin") {
			return adminItems;
		}

		return userItems;
	};

	const handleLogout = async () => {
		try {
			await logout();
			setUserMenuOpen(false);
		} catch (err) {
			console.error(err);
		}
	};

	const UserMenu = () => {
		return (
			<div className="relative" ref={menuRef}>
				<Button
					variant="ghost"
					size="none"
					onClick={() => setUserMenuOpen(!userMenuOpen)}
					className="flex items-center gap-2"
				>
					<div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold border border-gray-50">
						{user?.name?.charAt(0).toUpperCase() || "U"}
					</div>
					<span className="hidden md:block">{user?.name}</span>
					<BsChevronDown
						size={12}
						className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
					/>
				</Button>

				{userMenuOpen && (
					<div className="absolute right-0 top-full mt-2 bg-white/75 dark:bg-black/75 backdrop-blur-sm border border-gray-200 dark:border-gray-900 rounded-2xl shadow-lg z-50 min-w-[200px] px-3 py-2">
						<div className="border-b border-gray-500/25 space-y-1 p-3">
							<div className="text-xl font-medium">{user?.name}</div>
							<div className="text-sm text-gray-400 dark:text-gray-500">
								{user?.email}
							</div>
							{user?.role === "admin" && (
								<div className="text-center">
									<Tag>{user?.role}</Tag>
								</div>
							)}
						</div>

						<div className="py-1">
							<Link
								to="/dashboard"
								className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-gray-300/25 dark:hover:bg-gray-500/25 transition-colors"
								onClick={() => setUserMenuOpen(false)}
							>
								<BsSpeedometer2 size={14} />
								Dashboard
							</Link>

							<Link
								to="/profile"
								className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-gray-300/25 dark:hover:bg-gray-500/25 transition-colors"
								onClick={() => setUserMenuOpen(false)}
							>
								<BsPersonFill size={14} />
								Profil
							</Link>
						</div>

						<div className="border-t border-gray-500/25 py-1">
							<button
								onClick={handleLogout}
								className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
							>
								<BsBoxArrowRight size={14} />
								Se déconnecter
							</button>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="sticky top-0 w-full backdrop-blur-lg z-40">
			<div className="container flex items-center justify-between py-5 mx-auto">
				<div className="flex items-center gap-12">
					<Link to={"/"} className="text-2xl font-bold">
						<div className="flex items-center gap-2 py-1">
							<span>
								<img className="size-10" src={logo} alt="logo" />
							</span>
							<strong>PostNova</strong>
						</div>
					</Link>
					<nav>
						<ul className="flex items-center gap-4">
							{loading
								? [...Array(4)].map((_, i) => (
										<li
											key={i}
											className="h-4 w-24 bg-gray-500/10 rounded animate-pulse"
										></li>
									))
								: navigationItems().map((item, index) => (
										<li key={index}>
											{item.to ? (
												<Link
													to={item.to}
													className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
												>
													{item.label}
												</Link>
											) : (
												<a
													href={item.href}
													className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
												>
													{item.label}
												</a>
											)}
										</li>
									))}
						</ul>
					</nav>
				</div>
				<div className="flex items-center gap-2">
					{!loading && (
						<>
							<Button
								variant="outline"
								color="tertiary"
								size="none"
								circle
								className="p-3"
								onClick={() => toggleTheme()}
							>
								{theme == "light" ? (
									<BsMoonStarsFill size={16} />
								) : (
									<BsSunriseFill size={16} />
								)}
							</Button>
							{isAuthenticated ? (
								<UserMenu />
							) : (
								<Button as={Link} to={"/login"} circle color="neutral">
									Se connecter
								</Button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
