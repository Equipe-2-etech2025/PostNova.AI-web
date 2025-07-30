import React from "react";
import {
	BsBoxArrowInUpRight,
	BsCalendar,
	BsCameraVideo,
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
	videoNumber,
	imageNumber,
	landingPageNumber,
	views,
	likes,
	share,
}) => {
	return (
		<Card styles={"w-full rounded-xl space-y-2"}>
			<div className="flex items-center justify-between gap-6">
				<div className="flex items-center gap-2">
					<h5 className="text-xl font-bold">
						<Link to={"/campaign/" + id}>{name}</Link>
					</h5>
					<Tag color="green">{status}</Tag>
				</div>
				<a href="#">
					<Button circle>
						<BsBoxArrowInUpRight />
					</Button>
				</a>
			</div>
			<div>
				<div className="flex items-center gap-2 text-gray-500">
					<BsCalendar />
					<span>{createdAt}</span>
				</div>
			</div>
			<div className="bg-[var(--color-black)]/50 flex items-center justify-around text-sm p-4 mt-4 rounded-lg">
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<BsCameraVideo size={16} className="text-red-400" />
						<span className="ml-1">{videoNumber}</span>
					</div>
					<span className="text-sm text-gray-400">Videos</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<BsImage size={16} className="text-blue-500" />
						<span className="ml-1">{imageNumber}</span>
					</div>
					<span className="text-sm text-gray-400">Image</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<BsFileEarmarkText size={16} className="text-green-600" />
						<span className="ml-1">{landingPageNumber}</span>
					</div>
					<span className="text-sm text-gray-400">Landing page</span>
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
