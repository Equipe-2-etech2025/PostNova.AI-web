import React from "react";
import { Outlet } from "react-router";
import NavBar from "@layouts/NavBar";

const MainLayout = () => {
	return (
		<div className="min-h-screen">
			<NavBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
