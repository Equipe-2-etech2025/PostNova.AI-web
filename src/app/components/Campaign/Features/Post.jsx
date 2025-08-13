import React, { useRef } from "react";
import { BsCalendar2, BsCopy, BsMagic, BsPencil, BsShare } from "react-icons/bs";
import { useNotification } from "@hooks/useNotification";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import SectionBlock from "@layouts/SectionBlock";

const Post = () => {
	const postContentRef = useRef();
	const { notification, hideNotification, showSuccess, showError } =
		useNotification();

	const handleCopyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(postContentRef.current.innerText);
			showSuccess("Publication copié dans le clipboard", {
				duration: 5000,
				position: "top-center",
			});
		} catch (err) {
			console.error("Erreur lors de la copie :", err.message);
			showError("Une erreur est survenue lors de la copie", {
				duration: 5000,
				position: "top-center",
			});
		}
	};

	return (
		<>
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={hideNotification}
				autoHide={true}
				duration={5000}
				position="top-center"
				showProgressBar={true}
			/>
			<div className="flex flex-col gap-8 p-8">
				<div className="h-full flex-1/2 space-y-6 overflow-y-scroll">
					<div className="text-center">
						<h3 className="text-3xl font-bold mb-2">Publication</h3>
						<span className="text-2xl">Facebook</span>
					</div>
					<div className="w-2/3 rounded-2xl space-y-3 mx-auto">
						<p ref={postContentRef} className="text-lg leading-relaxed">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis beatae,
							eum iste quasi doloremque illum inventore ducimus officia consectetur
							cupiditate. Minima quo illum sapiente recusandae eos, cumque temporibus
							quia quasi deleniti sit vel quaerat facilis beatae atque rerum eum
							explicabo nisi maxime enim quod. Delectus ducimus sit error veniam
							voluptatum rem omnis velit maiores, ipsam facere, laudantium tempora
							repudiandae illo reprehenderit at qui animi maxime cupiditate non
							veritatis distinctio adipisci accusantium? Doloremque corporis porro
							deserunt fugiat illum itaque. Enim, sint sit dolor alias magnam, quia
							dolores obcaecati fuga eaque qui illum saepe veritatis officiis
							praesentium assumenda esse inventore ullam distinctio.
						</p>
						<div className="flex items-center gap-2">
							<BsCalendar2 /> 
							<p>
								<strong>Généré le</strong> : {new Date().toDateString()}
							</p>
						</div>
						<div className="text-end space-x-2">
							<Button
								variant="outline"
								className="flex items-center gap-2"
								onClick={handleCopyToClipboard}
							>
								<span>Copier</span>
								<BsCopy />
							</Button>
							<Button
								variant="outline"
								color="secondary"
								className="flex items-center gap-2"
							>
								<span>Partager</span>
								<BsShare />
							</Button>
						</div>
					</div>
				</div>
				<div className="flex-1/4">
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
		</>
	);
};

export default Post;
