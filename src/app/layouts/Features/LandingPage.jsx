import React, { useEffect, useState } from "react";
import { handleCopyToClipboard } from "@shared/copyToClipboard";
import { useNotification } from "@hooks/useNotification";
import Button from "@shared/Button";
import { BsCheck, BsCopy } from "react-icons/bs";
import MessageNotification from "@shared/MessageNotification";

const LandingPage = ({
	data,
}) => {
	const { notification, hideNotification, showSuccess, showError } =
		useNotification();

	const [isCopied, setIsCopied] = useState(false);

	const iframeRef = React.useRef(null);

	useEffect(() => {
		if (iframeRef.current) {
			iframeRef.current.srcdoc = data;
		}
	}, [data]);

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
			<div className="flex flex-col h-full">
				<div className="text-center">
					<h3 className="text-3xl font-bold mb-2">Landing Page</h3>
				</div>

				<div className="h-full bg-green-50">
					<iframe ref={iframeRef} className="size-full rounded-2xl" />
				</div>

				<div className="text-end space-x-2 relative mt-3">
					<div className="inline-flex items-center gap-2">
						<Button
							variant="outline"
							className={`flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
								isCopied
									? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
									: ""
							}`}
							onClick={() =>
								handleCopyToClipboard(
									iframeRef.current.contentWindow.document.body.innerHTML,
									setIsCopied,
									showSuccess,
									showError
								)
							}
						>
							{isCopied ? (
								<>
									<BsCheck className="text-white" />
									<span>Copié !</span>
								</>
							) : (
								<>
									<span>Copier</span>
									<BsCopy />
								</>
							)}
						</Button>

						{isCopied && (
							<span className="text-sm text-green-500 font-medium animate-fade-in">
								✓ Copié !
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingPage;
