import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from "react";
import {
	BsArrowCounterclockwise,
	BsArrowRepeat,
	BsFullscreen,
	BsFullscreenExit,
	BsSave,
} from "react-icons/bs";
import { useNotification } from "@hooks/useNotification";
import SectionBlock from "@layouts/SectionBlock";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import { processTemplate } from "@shared/templateUtils";
import { landingPageService } from "@services/landingPageService";
import * as LandingPageLayout from "@components/Features/LandingPage";
import DownloadButton from "@components/Campaign/Features/componentsPosts/DownloadButton";
import DeleteButton from "@components/Campaign/Features/componentsPosts/DeleteButton";
import Spinner from "@components/Spinner";

const LandingPage = ({
	landingPageId,
	previewActive = false,
	onTogglePreview,
	onLandingPageDeleted,
}) => {
	const [content, setContent] = useState(null);
	const [originalContent, setOriginalContent] = useState(null);

	const [loading, setLoading] = useState(true);
	const [iframeLoaded, setIframeLoaded] = useState(false);
	const [selectedSection, setSelectedSection] = useState("hero");

	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { notification, hideNotification, showSuccess, showError } =
		useNotification();

	const iframeRef = useRef(null);

	useEffect(() => {
		if (!originalContent && content) {
			setOriginalContent(JSON.parse(JSON.stringify(content)));
		}
	}, [content, originalContent]);

	const hasContentChanged = useMemo(() => {
		if (!originalContent || !content) return false;
		return JSON.stringify(content) !== JSON.stringify(originalContent);
	}, [content, originalContent]);

	const availableSections = [
		{ id: "hero", label: "Hero" },
		...(content?.content?.template?.data?.sections || []).map(
			(section, index) => ({
				id: section?.id || `section-${index + 1}`,
				label: `Section ${index + 1}`,
			})
		),
		{ id: "footer", label: "Footer" },
	];

	const TEXT_LIMITS = {
		title: 100,
		subtitle: 300,
		text: 500,
		buttonText: 30,
		url: 200,
		columnTitle: 60,
		columnText: 300,
	};

	const generateHTML = useCallback(() => {
		if (!landingPageId) {
			return `
				<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 90vh;">
					<p style="margin-top: 20px; color: #999;">Pas de contenu</p>
				</div>
			`;
		}

		if (loading) {
			return `
				<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 90vh;">
					<p style="margin-top: 20px; color: #999;">Chargement...</p>
				</div>
			`;
		}

		if (!content) {
			return `
				<div style="display: flex; justify-content: center; align-items: center; height: 90vh;">
					<p style="color: #999;">Aucun contenu disponible</p>
				</div>
			`;
		}

		if (content) {
			// if (content?.content?.template?.html && content?.content?.template?.data) {
			if (content?.content?.html) {
				const processedHTML = processTemplate(
					// content.content.template.html,
					// content.content.template.data
					content.content.html,
					null
				);

				return (
					processedHTML ||
					`
						<div style="display: flex; justify-content: center; align-items: center; height: 90vh">
							<p style="color: #f39c12;">Landing page vide après traitement</p>
						</div>
					`
				);
			}

			return `
				<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 90vh padding: 20px;">
					<h3 style="color: #9b59b6;">Structure de données reçue :</h3>
					<pre style="background: #f5f5f5; padding: 15px; border-radius: 8px; max-width: 80%; overflow: auto; font-size: 12px;">
                        ${JSON.stringify(content, null, 2)}
					</pre>
				</div>
			`;
		}

		return `
			<div style="display: flex; justify-content: center; align-items: center; height: 90vh; font-family: Arial, sans-serif;">
				<p style="color: #999;">Aucun contenu disponible</p>
			</div>
		`;
	}, [content, loading]);

	const handleChange = (path, value) => {
		setContent((prev) => {
			const updated = { ...prev };
			let current = updated;

			// Naviguer vers content.template.data pour les modifications
			if (!current.content) current.content = {};
			if (!current.content.template) current.content.template = {};
			if (!current.content.template.data) current.content.template.data = {};

			current = current.content.template.data;

			// On parcourt toutes les clés sauf la dernière
			const keys = path.split(".");
			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				// Si c'est un tableau (ex: sections[1])
				if (key.includes("[")) {
					const arrayKey = key.split("[")[0];
					const index = parseInt(key.match(/\[(\d+)\]/)[1], 10);
					if (!current[arrayKey]) current[arrayKey] = [];
					current[arrayKey] = [...current[arrayKey]];
					current = current[arrayKey][index];
				} else {
					if (!current[key]) current[key] = {};
					current[key] = { ...current[key] };
					current = current[key];
				}
			}

			// Mise à jour de la clé finale
			const lastKey = keys[keys.length - 1];
			current[lastKey] = value;

			// Forcer le rechargement de l'iframe
			setIframeLoaded(false);

			return updated;
		});
	};

	const handleSave = async () => {
		if (!content || !landingPageId) return;

		try {
			const res = await landingPageService.update(landingPageId, {
				content: {
					template: {
						...content.content.template,
						data: content.content.template.data,
					},
				},
			});

			if (res.success) {
				showSuccess("Landing page sauvegardée avec succès", {
					duration: 5000,
					position: "top-center",
				});
				// Mettre à jour l'original content après sauvegarde réussie
				setOriginalContent(JSON.parse(JSON.stringify(content)));
			} else {
				showError("Erreur lors de la sauvegarde", {
					duration: 5000,
					position: "top-center",
				});
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			showError("Erreur lors de la sauvegarde", {
				duration: 5000,
				position: "top-center",
			});
		}
	};

	const handleDownloadFile = () => {
		if (!content || !landingPageId) return;

		const fileContent = processTemplate(
			content.content.template.html,
			content.content.template.data
		);

		const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "landing-page.html";
		link.click();

		URL.revokeObjectURL(link.href);
	};

	const handleCancel = useCallback(() => {
		if (originalContent) {
			setContent(JSON.parse(JSON.stringify(originalContent)));
			setIframeLoaded(false);
		}
	}, [originalContent]);

	const getLengthError = useCallback((text, maxLength) => {
		return text?.length > maxLength;
	}, []);

	const handleDeleteClick = () => {
		setShowDeleteConfirm(true);
	};

	const handleConfirmDelete = async () => {
		if (content) {
			try {
				setIsDeleting(true);
				const res = await landingPageService.delete(landingPageId);
				if (res.success) {
					showSuccess("Page supprimée avec succès", {
						duration: 5000,
						position: "top-center",
					});
					onLandingPageDeleted();
				} else {
					showError(res.data.message || "Erreur lors de la suppression", {
						duration: 5000,
						position: "top-center",
					});
				}
				setShowDeleteConfirm(false);
			} catch (error) {
				showError(error.message || "Erreur lors de la suppression", {
					duration: 5000,
					position: "top-center",
				});
				console.error("Erreur lors de la suppression:", error);
			} finally {
				setIsDeleting(false);
				setContent(null);
			}
		}
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	useEffect(() => {
		const fetchContent = async () => {
			try {
				setLoading(true);
				const res = await landingPageService.getOne(landingPageId);
				if (!res.success) {
					setContent(undefined);
					return;
				}
				setContent(res.data);
			} catch (err) {
				setContent(undefined);
			} finally {
				setLoading(false);
			}
		};

		if (landingPageId) {
			fetchContent();
		}
	}, [landingPageId]);

	useEffect(() => {
		if (iframeRef.current) {
			const iframe = iframeRef.current;
			iframe.onload = () => {
				setIframeLoaded(true);
			};
			const doc = iframe.contentDocument || iframe.contentWindow.document;
			doc.open();
			doc.write(
				`<!DOCTYPE html><html><head><title>Preview</title></head><body>${generateHTML()}</body></html>`
			);
			doc.close();
		}
	}, [generateHTML, content, landingPageId]);

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
			<div className="h-full flex flex-col gap-6 px-6 py-8">
				<div className="relative flex-1/2">
					<div className="h-full rounded-2xl mx-auto">
						<iframe ref={iframeRef} className="size-full rounded-2xl" />
						<div
							className={`absolute top-4 right-4 transform transition-transform duration-200 ${loading ? "scale-0" : "scale-100"}`}
						>
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
				<div
					className={`${previewActive ? "flex-0 overflow-hidden" : "flex flex-col"} transition-all ease-in-out duration-300`}
				>
					{(!loading && content) ? (
						<div className="text-end space-x-2 space-y-1 relative mt-3">
							{!hasContentChanged ? (
								<>
									<DownloadButton onClick={handleDownloadFile} />
									<DeleteButton onClick={handleDeleteClick} />
								</>
							) : (
								<>
									<Button
										variant="outline"
										color="secondary"
										className="flex items-center color:danger gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
										onClick={handleSave}
									>
										<span className="text-sm">Enregistrer</span>
										<BsSave />
									</Button>
									<Button
										variant="outline"
										color="neutral"
										className="flex items-center color:danger gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
										onClick={handleCancel}
									>
										<span className="text-sm">Annuler</span>
										<BsArrowCounterclockwise />
									</Button>
								</>
							)}
						</div>
					) : (
						<Spinner />
					)}
				</div>

				{showDeleteConfirm && (
					<div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
							<h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								Êtes-vous sûr de vouloir supprimer cette page ? Cette action est
								irréversible.
							</p>
							<div className="flex gap-3 justify-end">
								<Button
									variant="outline"
									color="neutral"
									onClick={handleCancelDelete}
									disabled={isDeleting}
								>
									Annuler
								</Button>
								<Button
									variant="solid"
									color="danger"
									onClick={handleConfirmDelete}
									disabled={isDeleting}
									className={`flex items-center gap-2 ${isDeleting ? "opacity-70 cursor-not-allowed" : ""}`}
								>
									{isDeleting ? (
										<>
											<BsArrowRepeat className="animate-spin" size={16} />
											Suppression...
										</>
									) : (
										"Supprimer"
									)}
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default LandingPage;
