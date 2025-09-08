import React, { useEffect, useState } from "react";
import { getAllInvoices } from "@services/adminInvoiceService";

const AdminInvoice = () => {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const res = await getAllInvoices();

			if (res.success) {
				setRows(res.data);
			} else {
				setErrMsg(res.message || "Erreur de chargement.");
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="p-6 bg-white-100 min-h-screen flex flex-col items-center">
			<div className="w-full max-w-6xl">
				<h1 className="text-2xl font-bold mb-6 text-white-600 text-center">
					📑 Factures des utilisateurs
				</h1>

				{errMsg ? (
					<div className="mb-4 p-3 rounded border border-red-300 bg-red-50 text-red-700">
						{errMsg}
					</div>
				) : null}

				{loading ? (
					<div className="p-4 bg-white rounded-lg shadow text-center">
						Chargement des factures...
					</div>
				) : (
					<div className="overflow-x-auto bg-white shadow-lg rounded-lg">
						<table className="w-full border-collapse text-sm">
							<thead className="bg-gray-500/15 text-white-300">
								<tr>
									<th className="py-3 px-4 text-center">Utilisateur</th>
									<th className="py-3 px-4 text-center">Montant</th>
									<th className="py-3 px-4 text-center">Date de paiement</th>
									<th className="py-3 px-4 text-center">Date d’expiration</th>
									<th className="py-3 px-4 text-center">Référence</th>
								</tr>
							</thead>
							<tbody>
								{rows.length > 0 ? (
									rows.map((inv, idx) => (
										<tr key={inv.id ?? idx} className="border-b hover:bg-gray-50">
											<td className="py-2 px-4 text-center text-gray-700">
												{inv.username}
											</td>
											<td className="py-2 px-4 font-medium text-gray-700 text-center">
												{inv.amount} {inv.currency}
											</td>
											<td className="py-2 px-4 text-gray-600 text-center">
												{new Date(inv.created_at).toLocaleDateString("fr-FR")}
											</td>
											<td className="py-2 px-4 text-gray-600 text-center">
												{new Date(inv.expiration_date).toLocaleDateString("fr-FR")}
											</td>
											<td className="py-2 px-4 text-gray-700 text-center">
												{inv.transaction_reference || "—"}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={5} className="py-6 text-center text-gray-500">
											Aucune facture disponible.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminInvoice;
