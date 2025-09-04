import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import Button from "@shared/Button";
import { landingPageService } from "@services/landingPageService";
import { processTemplate } from "@shared/templateUtils";
import * as LandingPageLayout from "@components/Features/LandingPage";

const LandingPage = ({
	landingPageId,
	previewActive = false,
	onTogglePreview,
}) => {
	const [content, setContent] = useState(null);

	const [loading, setLoading] = useState(true);
	const [iframeLoaded, setIframeLoaded] = useState(false);
	const [selectedSection, setSelectedSection] = useState("hero");

	const iframeRef = useRef(null);

	const availableSections = [
		{ id: "hero", label: "Hero" },
		...(content?.sections || []).map((section, index) => ({
			id: section.id || `section-${index + 1}`,
			label: `Section ${index + 1}`,
		})),
		{ id: "footer", label: "Footer" },
	];

	const TEXT_LIMITS = {
		title: 100,
		subtitle: 200,
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
			if (content?.content?.template?.html && content?.content?.template?.data) {
				const processedHTML = processTemplate(
					content.content.template.html,
					content.content.template.data
				);

				return (
					processedHTML ||
					`
						<div style="display: flex; justify-content: center; align-items: center; height: 90vh">
							<p style="color: #f39c12;">Template vide après traitement</p>
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

			const keys = path.split(".");
			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				// Si c'est un tableau (ex: sections[1])
				if (key.includes("[")) {
					const arrayKey = key.split("[")[0];
					const index = parseInt(key.match(/\[(\d+)\]/)[1], 10);
					current[arrayKey] = [...current[arrayKey]];
					current = current[arrayKey][index];
				} else {
					current[key] = { ...current[key] };
					current = current[key];
				}
			}

			const lastKey = keys[keys.length - 1];
			current[lastKey] = value;

			return updated;
		});
	};

	const getLengthError = useCallback((text, maxLength) => {
		return text?.length > maxLength;
	}, []);

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

			setIframeLoaded(false);
		}
	}, [generateHTML]);

	return (
		<div className="h-full flex gap-8 p-8">
			<div className="relative flex-1/2">
				<div className="h-full rounded-2xl mx-auto">
					<iframe ref={iframeRef} className="size-full rounded-2xl" />
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
			<div className={`${previewActive ? "flex-0" : "flex-1/4"} overflow-scroll`}>
				<div className="sticky top-0 py-1 z-20">
					<h1 className="text-center text-3xl font-bold mb-2">Landing page</h1>
				</div>
				<div className="flex flex-wrap gap-2 my-4 p-2">
					{availableSections.map((section) => (
						<Button
							key={section.id}
							variant={selectedSection === section?.id ? "solid" : "outline"}
							color={selectedSection === section?.id ? "primary" : "neutral"}
							size="sm"
							className="flex items-center gap-2"
							onClick={() => setSelectedSection(section?.id)}
							disabled={loading}
						>
							{section?.icon}
							{section?.label}
						</Button>
					))}
				</div>
				{selectedSection === "hero" && content && (
					<LandingPageLayout.HeroSection
						content={content.content.template.data}
						handleChange={handleChange}
						getLengthError={getLengthError}
						TEXT_LIMITS={TEXT_LIMITS}
					/>
				)}
			</div>
		</div>
	);
};

export default LandingPage;
