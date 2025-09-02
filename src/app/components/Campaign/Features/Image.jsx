import React from "react";
import { BsFullscreen, BsFullscreenExit, BsMagic } from "react-icons/bs";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";

const ImagePreview = ({
	previewActive = false,
	onTogglePreview = () => {},
	imageSrc,
	imageAlt,
	creationDate,
	promptText,
}) => {
	return (
		<div className="flex h-full gap-8 p-8">
			{/* Image */}
			<div className="flex-1 flex justify-center items-center overflow-auto">
				<div
					className={`relative ${previewActive ? "h-full" : "w-full"} rounded-2xl overflow-hidden mx-auto`}
				>
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-full h-auto max-h-full object-contain"
					/>
					<div className="absolute top-4 right-4">
						<Button
							variant="solid"
							size="none"
							color="tertiary"
							circle
							className="p-2"
							onClick={onTogglePreview}
						>
							{previewActive ? <BsFullscreenExit /> : <BsFullscreen />}
						</Button>
					</div>
				</div>
			</div>

			{/* Informations */}
			<div
				className={`${previewActive ? "flex-0" : "flex-1"} space-y-6 overflow-auto`}
			>
				<h1 className="text-center text-3xl font-bold mb-2">Détails de l'image</h1>

				<div className="space-y-4">
					<SectionBlock title="Informations" icon={<BsMagic />}>
						<div className="grid grid-cols-1 gap-4">
							<div>
								<p className="text-sm text-gray-500">Date de création</p>
								<p>{creationDate}</p>
							</div>
						</div>
					</SectionBlock>

					<SectionBlock title="Prompt" icon={<BsMagic />}>
						<p>{promptText}</p>
					</SectionBlock>
				</div>
			</div>
		</div>
	);
};

export default ImagePreview;
