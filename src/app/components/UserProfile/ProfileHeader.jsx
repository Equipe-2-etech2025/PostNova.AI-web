import React from "react";
import { BsCameraFill, BsTrophy, BsGear, BsKey, BsPerson } from "react-icons/bs";
import Button from "@shared/Button";
import { Link } from "react-router";

const ProfileHeader = ({ user, profileImage, onImageUpload, getInitials, tarif }) => {
	return (
		<section className="text-center mb-12">
			<div className="flex justify-center mb-6">
				<div className="relative">
					<div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
						{profileImage ? (
							<img
								src={profileImage}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						) : (
							getInitials(user?.name)
						)}
					</div>
					{/* <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 rounded-full p-2 cursor-pointer transition-colors">
						<BsCameraFill className="text-white text-sm" />
						<input
							type="file"
							className="hidden"
							accept="image/*"
							onChange={onImageUpload}
						/>
					</label> */}
				</div>
			</div>

			<div className="flex items-center justify-center gap-3 mb-2">
				<h1 className="text-3xl font-bold">{user?.name || "Utilisateur"}</h1>

				{/* Badge tarif (PRO ou FREE) */}
				{tarif?.tarif.name === "Pro" ? (
					<span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
						<BsTrophy className="text-white" />
						PRO
					</span>
				) : (
					<span className="bg-gray-600 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
						<BsPerson className="text-white" />
						FREE
					</span>
				)}
			</div>

			<p className="text-gray-500 dark:text-gray-400 mb-4">
				{user?.email || "utilisateur@gmail.com"}
			</p>

			<div className="flex flex-wrap justify-center gap-3">
				<Link to="/changePassword">
					<Button variant="outline">
						<BsKey className="mr-2" />
						Changer mot de passe
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default ProfileHeader;
