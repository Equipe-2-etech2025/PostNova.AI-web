import React, { useState } from "react";
import { BsDownload, BsUpload, BsGear, BsBell } from "react-icons/bs";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";

const AdminTools = ({
	onExport,
	onBackup,
	onNotification,
	isLoading = false,
}) => {
	const [selectedExportType, setSelectedExportType] = useState("users");

	const exportTypes = [
		{ value: "users", label: "Utilisateurs" },
		{ value: "campaigns", label: "Campagnes" },
		{ value: "logs", label: "Logs système" },
	];

	const handleExport = () => {
		onExport?.(selectedExportType);
	};

	return (
		<SectionBlock title="Outils d'administration" icon={<BsGear />}>
			<div className="space-y-6 mt-4">
				{/* System status */}
				<div className="pb-4 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between text-sm">
						<span className="text-gray-500">Statut système:</span>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-green-600">Opérationnel</span>
						</div>
					</div>
				</div>

				{/* Export data */}
				<div className="space-y-3">
					<h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
						Export de données
					</h4>
					<div className="flex gap-2">
						<select
							value={selectedExportType}
							onChange={(e) => setSelectedExportType(e.target.value)}
							className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
							disabled={isLoading}
						>
							{exportTypes.map((type) => (
								<option key={type.value} value={type.value}>
									{type.label}
								</option>
							))}
						</select>
						<Button
							variant="outline"
							size="sm"
							onClick={handleExport}
							disabled={isLoading}
							className="flex items-center gap-2"
						>
							<BsDownload size={14} />
							Exporter
						</Button>
					</div>
				</div>

				{/* Save data */}
				<div className="space-y-3">
					<h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
						Sauvegarde système
					</h4>
					<div className="grid grid-cols-2 gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onBackup?.("database")}
							disabled={isLoading}
							className="flex items-center gap-2"
						>
							<BsUpload size={14} />
							Base de données
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onBackup?.("files")}
							disabled={isLoading}
							className="flex items-center gap-2"
						>
							<BsUpload size={14} />
							Fichiers
						</Button>
					</div>
				</div>

				{/* Notifications */}
				<div className="space-y-3">
					<h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
						Notifications système
					</h4>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onNotification?.()}
						disabled={isLoading}
						className="w-full flex items-center gap-2"
					>
						<BsBell size={14} />
						Envoyer notification
					</Button>
				</div>
			</div>
		</SectionBlock>
	);
};

export default AdminTools;
