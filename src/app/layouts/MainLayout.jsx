import React from "react";
import { Outlet } from "react-router";
import useAuth from "@hooks/useAuth";
import NavBar from "@layouts/NavBar";
import Spinner from "@components/Spinner";

const MainLayout = () => {
	const { loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="space-y-3 animate-pulse">
					<Spinner />
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
