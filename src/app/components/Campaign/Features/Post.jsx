import React, { useState, useEffect } from "react";
import { useNotification } from "@hooks/useNotification";
import MessageNotification from "@shared/MessageNotification";
import SectionBlock from "@layouts/SectionBlock";
import { BsMagic, BsPencil } from "react-icons/bs";
import { promptService } from "@services/promptService";

import PostHeader from "./componentsPosts/PostHeader";
import PostContent from "./componentsPosts/PostContent";
import PostActions from "./componentsPosts/PostActions";

const Post = ({ postData, onSuccess }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [currentContent, setCurrentContent] = useState(postData?.content);
	const [promptData, setPromptData] = useState(null);
	const [loading, setLoading] = useState(false);
	const { notification, hideNotification } = useNotification();

	useEffect(() => {
		if (postData?.prompt_id) {
			fetchPromptData(postData.prompt_id);
		}
	}, [postData]);

	const fetchPromptData = async (promptId) => {
		setLoading(true);
		try {
			const result = await promptService.getById(promptId);
			if (result.success) {
				const prompt = result.data?.data || result.data;
				setPromptData(prompt);
			} else {
				console.error("Erreur lors de la récupération du prompt:", result.message);
				console.error("Détails de l'erreur:", result);
			}
		} catch (error) {
			console.error("Erreur inattendue:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	const handleUpdateContent = (newContent) => {
		setCurrentContent(newContent);
		setIsEditing(false);

		if (onSuccess) {
			onSuccess();
		}
	};

	const formatPromptDate = (dateString) => {
		if (!dateString) return "";
		return new Date(dateString).toLocaleDateString("fr-FR", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<>
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={hideNotification}
				autoHide
				duration={5000}
				position="top-center"
				showProgressBar
			/>

			<div className="w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl p-6">
				<div className="space-y-6">
					<PostHeader
						socialId={postData?.social_id}
						createdAt={postData?.created_at}
						onEdit={handleEdit}
						isEditing={isEditing}
					/>

					<PostContent
						content={currentContent}
						hashtags={postData?.hashtags}
						postId={postData?.id}
						onUpdate={handleUpdateContent}
						isEditing={isEditing}
						onEdit={handleEdit}
						onCancelEdit={handleCancelEdit}
					/>

					<PostActions content={currentContent} />
				</div>

				<div className="mt-6 space-y-4">
					<SectionBlock title="Prompt" icon={<BsMagic />}>
						{loading ? (
							<div className="text-gray-500 dark:text-gray-400 italic">
								Chargement du prompt...
							</div>
						) : promptData ? (
							<div className="space-y-3">
								<div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
									{promptData.content}
								</div>
								<div className="flex justify-end">
									<span className="text-xs text-gray-500 dark:text-gray-400">
										Créé le {formatPromptDate(promptData.created_at)}
									</span>
								</div>
							</div>
						) : (
							<div className="text-gray-500 dark:text-gray-400 italic">
								Aucun prompt associé à ce post
							</div>
						)}
					</SectionBlock>
				</div>
			</div>
		</>
	);
};

export default Post;
