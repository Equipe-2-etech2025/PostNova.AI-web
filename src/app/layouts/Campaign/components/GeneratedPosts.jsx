import React from "react";
import PostItem from "./PostItem";

const GeneratedPosts = ({
	generatedPosts,
	onRegenerate,
	isRegenerating,
	editingPostId,
	refreshKey,
}) => {
	if (generatedPosts.length === 0) return null;

	return (
		<div className="w-full max-h-[60vh] overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mt-6">
			<h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
				Posts générés :
			</h3>
			{generatedPosts.map((post, idx) => (
				<div key={`${post.id}-${refreshKey}`}>
					<PostItem
						key={`${post.id}-${refreshKey}`}
						post={post}
						index={idx}
						onRegenerate={onRegenerate}
						isRegenerating={isRegenerating && editingPostId === (post.id || idx)}
						isNew={!post.id}
					/>
				</div>
			))}
		</div>
	);
};

export default GeneratedPosts;
