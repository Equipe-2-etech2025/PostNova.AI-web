import React, { useRef } from "react";
import CopyButton from "./CopyButton";
import ShareButton from "./ShareButton";

const PostActions = ({ content }) => {
	const contentRef = useRef();

	return (
		<>
			<div
				ref={contentRef}
				className="hidden"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			<div className="text-end space-x-2 relative mt-3">
				<ShareButton contentRef={contentRef} />
				<CopyButton contentRef={contentRef} />
				
			</div>
		</>
	);
};

export default PostActions;
