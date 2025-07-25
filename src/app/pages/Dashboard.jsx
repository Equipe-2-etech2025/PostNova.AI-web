import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import NavBar from "../../components/NavBar";

const Dashboard = () => {
	const { user, logout } = useAuth();
	const [campaigns, setCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simuler le chargement des campagnes
		setTimeout(() => {
			setCampaigns([
				{
					id: 1,
					name: "Campagne été 2024",
					status: "active",
				},
				{
					id: 2,
					name: "Lancement produit",
					status: "draft",
				},
			]);
			setLoading(false);
		}, 1000);
	}, []);

	const handleLogout = async () => {
		await logout();
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-[#1c1b23] flex items-center justify-center">
				<div className="text-white">
					Chargement du dashboard...
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#1c1b23] text-white">
			{/* Header */}
			<header className="bg-[#2e2d3b] p-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					PostNova.AI
				</h1>
				<div className="flex items-center space-x-4">
					<span>
						Bonjour,{" "}
						{user?.name}
					</span>
					<Button
						onClick={
							handleLogout
						}
						variant="secondary"
					>
						Déconnexion
					</Button>
				</div>
			</header>

			{/* Main content */}
			<main className="p-8">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold mb-8">
						Dashboard
					</h2>

					{/* Stats cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="bg-[#2e2d3b] p-6 rounded-lg">
							<h3 className="text-lg font-semibold mb-2">
								Campagnes
								actives
							</h3>
							<p className="text-3xl font-bold text-[#4335C4]">
								{
									campaigns.filter(
										(
											c
										) =>
											c.status ===
											"active"
									)
										.length
								}
							</p>
						</div>
						<div className="bg-[#2e2d3b] p-6 rounded-lg">
							<h3 className="text-lg font-semibold mb-2">
								Brouillons
							</h3>
							<p className="text-3xl font-bold text-yellow-400">
								{
									campaigns.filter(
										(
											c
										) =>
											c.status ===
											"draft"
									)
										.length
								}
							</p>
						</div>
						<div className="bg-[#2e2d3b] p-6 rounded-lg">
							<h3 className="text-lg font-semibold mb-2">
								Total
							</h3>
							<p className="text-3xl font-bold text-green-400">
								{
									campaigns.length
								}
							</p>
						</div>
					</div>

					{/* Campaigns list */}
					<div className="bg-[#2e2d3b] rounded-lg p-6">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-xl font-semibold">
								Mes
								Campagnes
							</h3>
							<Button>
								Nouvelle
								Campagne
							</Button>
						</div>

						{campaigns.length >
						0 ? (
							<div className="space-y-4">
								{campaigns.map(
									(
										campaign
									) => (
										<div
											key={
												campaign.id
											}
											className="flex justify-between items-center p-4 bg-[#1c1b23] rounded-lg"
										>
											<div>
												<h4 className="font-semibold">
													{
														campaign.name
													}
												</h4>
												<span
													className={`inline-block px-2 py-1 rounded text-xs ${
														campaign.status ===
														"active"
															? "bg-green-600/20 text-green-400"
															: "bg-yellow-600/20 text-yellow-400"
													}`}
												>
													{campaign.status ===
													"active"
														? "Active"
														: "Brouillon"}
												</span>
											</div>
											<div className="space-x-2">
												<button className="text-[#4335C4] hover:text-[#5a4fd4]">
													Modifier
												</button>
												<button className="text-red-400 hover:text-red-300">
													Supprimer
												</button>
											</div>
										</div>
									)
								)}
							</div>
						) : (
							<div className="text-center py-8 text-gray-400">
								<p>
									Aucune
									campagne
									trouvée
								</p>
								<Button className="mt-4">
									Créer
									votre
									première
									campagne
								</Button>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
