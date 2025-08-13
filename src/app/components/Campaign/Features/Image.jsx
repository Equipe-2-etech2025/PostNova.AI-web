import React from "react";
import { BsFullscreen, BsFullscreenExit, BsMagic, BsPencil } from "react-icons/bs";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";
import galaxy from "@assets/galaxy.png";

const Image = ({ previewActive = false, onTogglePreview = () => {}}) => {

	return (
		<div className="flex h-full gap-8 p-8">
			<div className="h-full flex-1/2 flex justify-center overflow-auto">
				<div className={`relative ${previewActive ? "h-full" : "w-full"} rounded-2xl overflow-hidden mx-auto`}>
					<img src={galaxy} className="size-full object-cover" />
					<div className="absolute top-4 right-4">
						<Button
							variant="solid"
							size="none"
							color="tertiary"
							circle
							className="p-2"
							onClick={onTogglePreview}
						>
							{previewActive ? <BsFullscreenExit /> : <BsFullscreen /> }
						</Button>
					</div>
				</div>
			</div>
			<div className={`${previewActive ? "flex-0" : "flex-1/2"} space-y-6 overflow-scroll`}>
				<div>
					<h1 className="text-center text-3xl font-bold mb-2">Image</h1>
				</div>
				<div className="space-y-4">
					<SectionBlock
						title={"Prompt"}
						icon={<BsMagic />}
						action={
							<Button color="neutral" circle size="none" className="p-2">
								<BsPencil size={12} />
							</Button>
						}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
						consequatur nisi voluptas omnis necessitatibus placeat accusantium
						asperiores excepturi dolorum facilis aspernatur quibusdam vero fugit ?
					</SectionBlock>
				</div>
			</div>
		</div>
	);
};

export default Image;
