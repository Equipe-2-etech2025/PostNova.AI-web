import React from "react";

import logo from "@assets/logo.png";
import { ButtonOutline } from "@shared/Button";
import { Link } from "react-router";

const NavBar = () => {
	return (
		<div className="sticky top-0 w-full backdrop-blur-lg z-50">
			<div className="container flex items-center justify-between py-5 mx-auto">
				<div className="flex items-center gap-2">
					<span>
						<img className="size-10" src={logo} alt="" />
					</span>
					<a className="text-2xl font-bold text-white cursor-pointer" href="#">
						<strong>PostNova</strong>
					</a>
				</div>
				<nav>
					<ul className="flex items-center gap-5 text-white">
						<li>
							<a href="#">A propos</a>
						</li>
						<li>
							<a href="#">Nos services</a>
						</li>
						<li>
							<a href="#">Nos offres</a>
						</li>
					</ul>
				</nav>
				<div>
					<Link to={"/login"}>
						<ButtonOutline color="blue" circle>
							Connexion
						</ButtonOutline>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
