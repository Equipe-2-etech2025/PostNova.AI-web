import React from "react";
import { Outlet } from "react-router";
import useAuth from "@hooks/useAuth";
import NavBar from "@layouts/NavBar";

const MainLayout = () => {
	const { loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="space-y-3 animate-pulse">
					<div className="w-12 h-12 border-6 border-gray-500 border-y-gray-500/10 rounded-full mx-auto animate-spin"></div>
					<p className="animate-bounce">Chargement...</p>
				</div>
			</div>
		);
	}
	
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
