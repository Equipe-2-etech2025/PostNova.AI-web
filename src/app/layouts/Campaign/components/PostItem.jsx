import React from "react";
import { useContentFormatter } from "../../../../hooks/useContentFormatter";

const PostItem = ({ post, index, refreshKey }) => {
	const { formatContent, formatHashtags } = useContentFormatter();

	return (
		<div
			key={`${post.id}-${refreshKey}`}
			className="p-4 bg-white dark:bg-gray-900 shadow-sm mb-4 rounded-lg"
		>
			<strong className="text-lg font-medium">{post.platform}</strong>

			<p
				className="text-lg leading-relaxed mt-2"
				dangerouslySetInnerHTML={{
					__html: formatContent(post.content),
				}}
			></p>

			{/* Affichage des hashtags */}
			{post.hashtags && (
				<div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
					{formatHashtags(post.hashtags).map((tag, i) => (
						<span key={i} className="mr-2">
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default PostItem;
