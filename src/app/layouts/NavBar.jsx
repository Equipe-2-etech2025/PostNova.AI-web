import React from "react";
import { Link } from "react-router";
import { BsMoonStarsFill, BsSunriseFill } from "react-icons/bs";
import useTheme from "@hooks/useTheme";
import Button from "@shared/Button";
import logo from "@assets/logo.png";

const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="sticky top-0 w-full backdrop-blur-lg z-50">
			<div className="container flex items-center justify-between py-5 mx-auto">
				<Link to={"/"} className="text-2xl font-bold">
					<div className="flex items-center gap-2">
						<span>
							<img className="size-10" src={logo} alt="logo" />
						</span>
						<strong>PostNova</strong>
					</div>
				</Link>
				<nav>
					<ul className="flex items-center gap-5">
						<li>
							<a href="#">A propos</a>
						</li>
						<li>
							<a href="#our-services">Nos services</a>
						</li>
						<li>
							<a href="#our-offers">Nos offres</a>
						</li>
					</ul>
				</nav>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						color="tertiary"
						className="px-4 py-3"
						onClick={() => toggleTheme()}
					>
						{theme == "light" ? (
							<BsMoonStarsFill size={16} />
						) : (
							<BsSunriseFill size={16} />
						)}
					</Button>
					<Button as={Link} to={"/login"} circle variant="solid" color="neutral">
						Se connecter
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
