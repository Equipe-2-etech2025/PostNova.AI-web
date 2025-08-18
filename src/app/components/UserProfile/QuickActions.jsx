import React from "react";
import { BsPlus, BsFileEarmark, BsCreditCard } from "react-icons/bs";
import { Card } from "@shared/Card";
import { Link } from "react-router";

const QuickActions = () => {
	return (
		<section className="mb-12">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card styles="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600">
					<div className="flex items-center gap-3 text-white">
						<BsPlus size={20} />
						<span className="font-semibold">Créer une nouvelle campagne</span>
					</div>
				</Card>
				<Link to="/templates">
					<Card styles="p-4 hover:shadow-lg transition-shadow cursor-pointer">
						<div className="flex items-center gap-3">
							<BsFileEarmark size={20} className="text-blue-500" />
							<span className="font-semibold">Explorer les modèles</span>
						</div>
					</Card>
				</Link>
				<Card styles="p-4 hover:shadow-lg transition-shadow cursor-pointer">
					<div className="flex items-center gap-3">
						<BsCreditCard size={20} className="text-green-500" />
						<span className="font-semibold">Mes factures</span>
					</div>
				</Card>
			</div>
		</section>
	);
};

export default QuickActions;
