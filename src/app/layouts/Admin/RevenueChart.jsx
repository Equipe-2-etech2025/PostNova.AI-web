import React from "react";
import { Card } from "@shared/Card";

const RevenueChart = ({ data, isLoading = false }) => {
	if (isLoading) {
		return (
			<Card>
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Revenus mensuels</h3>
					<div className="h-64 bg-gray-500/10 rounded animate-pulse"></div>
				</div>
			</Card>
		);
	}

	// Test Bar chart
	const maxValue = data ? Math.max(...data.map((item) => item.value)) : 0;

	return (
		<Card>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Revenus mensuels</h3>
					<span className="text-sm text-gray-500">
						Total:{" "}
						{data
							? data.reduce((sum, item) => sum + item.value, 0).toLocaleString()
							: 0}
						€
					</span>
				</div>

				{data && data.length > 0 ? (
					<div className="space-y-3">
						<div className="flex items-end justify-between gap-2 h-40">
							{data.map((item, i) => (
								<div key={i} className="flex-1 flex flex-col items-center">
									<div
										className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-full min-h-[4px] transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
										style={{
											height: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
										}}
										title={`${item.month}: ${item.value.toLocaleString()}€`}
									></div>
								</div>
							))}
						</div>
						<div className="flex justify-between text-xs text-gray-500">
							{data.map((item, i) => (
								<span key={i} className="text-center">
									{item.month}
								</span>
							))}
						</div>
						<div className="border-t pt-3">
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span className="text-gray-500">Moyenne mensuelle:</span>
									<span className="ml-2 font-medium">
										{Math.round(
											data.reduce((sum, item) => sum + item.value, 0) / data.length
										).toLocaleString()}
										€
									</span>
								</div>
								<div>
									<span className="text-gray-500">Meilleur mois:</span>
									<span className="ml-2 font-medium text-green-600">
										{Math.max(...data.map((item) => item.value)).toLocaleString()}€
									</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="text-center py-8 text-gray-500">
						Aucune donnée de revenus disponible
					</div>
				)}
			</div>
		</Card>
	);
};

export default RevenueChart;
