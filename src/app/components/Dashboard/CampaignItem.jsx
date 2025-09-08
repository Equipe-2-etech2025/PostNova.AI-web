import React from "react";
import {
	BsBoxArrowInUpRight,
	BsCalendar,
	BsGlobe2,
	BsEye,
	BsFileEarmarkText,
	BsHeart,
	BsImage,
	BsShare,
} from "react-icons/bs";
import { Link } from "react-router";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import Tag from "@shared/Tag";

const CampaignItem = ({
	id,
	name,
	status,
	createdAt,
	publicationNumber,
	imageNumber,
	landingPageNumber,
	views,
	likes,
	share,
}) => {
	const getStatusColor = (englishStatus) => {
		const statusColorMap = {
			created: "blue",
			processing: "orange",
			pending: "yellow",
			completed: "green",
			failed: "red",
		};
		return statusColorMap[englishStatus] || "gray";
	};
	
	const translateStatus = (englishStatus) => {
		const statusTranslations = {
			created: "Créée",
			processing: "En traitement",
			pending: "En attente",
			completed: "Terminée",
			failed: "Échouée",
		};
		return statusTranslations[englishStatus] || englishStatus;
	};

	const formatPromptDate = (dateString) => {
		if (!dateString) return "";
		return new Date(dateString).toLocaleDateString("fr-FR", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<Card>
			<div className="flex items-center justify-between gap-6">
				<div className="flex items-center gap-2">
					<h5 className="text-xl font-bold">
						<Link to={"/campaign/" + id}>{name}</Link>
					</h5>
					<Tag color="green">{translateStatus(status)}</Tag>
				</div>
				<Button as={Link} circle to={"/campaign/" + id}>
					<BsBoxArrowInUpRight />
				</Button>
			</div>
			<div>
				<div className="flex items-center gap-2 text-gray-500">
					<BsCalendar />
					<span>{formatPromptDate(createdAt)}</span>
				</div>
			</div>
			<div className="bg-gray-200 dark:bg-[var(--color-black)]/10 flex items-center justify-around text-sm p-4 mt-4 rounded-lg">
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<BsGlobe2 size={16} className="text-red-400" />
						<span className="ml-1">{publicationNumber}</span>
					</div>
					<span className="text-sm text-gray-500">Publications</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<BsImage size={16} className="text-blue-500" />
						<span className="ml-1">{imageNumber}</span>
					</div>
					<span className="text-sm text-gray-500">Image</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<BsFileEarmarkText size={16} className="text-green-600" />
						<span className="ml-1">{landingPageNumber}</span>
					</div>
					<span className="text-sm text-gray-500">Landing page</span>
				</div>
			</div>
			<div className="flex items-center justify-end gap-4 mt-2">
				<div className="flex items-center gap-4 text-gray-400 text-sm">
					<div className="flex items-center gap-2">
						<BsEye />
						<span>{views}</span>
					</div>
					<div className="flex items-center gap-2">
						<BsHeart />
						<span>{likes}</span>
					</div>
					<div className="flex items-center gap-2">
						<BsShare />
						<span>{share}</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CampaignItem;
