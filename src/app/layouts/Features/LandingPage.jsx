import React, {
	useEffect,
	useRef,
	useState,
	useCallback,
	useMemo,
} from "react";
import {
	BsFullscreen,
	BsFullscreenExit,
	BsPlus,
	BsTrash,
} from "react-icons/bs";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";
import * as LandingPageLayout from "@components/Features/LandingPage";

const LandingPage = ({ previewActive = false, onTogglePreview = () => {} }) => {
	const [selectedSection, setSelectedSection] = useState("hero");
	const [iframeLoaded, setIframeLoaded] = useState(false);

	const getTextColor = useCallback((backgroundColor) => {
		// Convert text color to RGB
		const hex = backgroundColor.replace("#", "");
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);

		// Calculer la luminance
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

		// Retourner noir ou blanc selon la luminance
		return luminance > 0.5 ? "#000000" : "#FFFFFF";
	}, []);

	// Text Length error message
	const getLengthError = useCallback((text, maxLength) => {
		if (text?.length > maxLength) return true;
		return false;
	}, []);

	const TEXT_LIMITS = {
		title: 100,
		subtitle: 200,
		text: 500,
		buttonText: 30,
		url: 200,
		columnTitle: 60,
		columnText: 300,
	};
	const [content, setContent] = useState({
		colors: {
			primary: "#E41B17",
			secondary: "#FFFFFF",
			text: "#222222",
		},
		company: "Coca cola",
		hero: {
			type: "hero",
			title: "Savourez le Moment",
			subtitle: "Coca-Cola, le goût inimitable depuis 1886",
			cta: {
				text: "Découvrir nos produits",
				link: "www.google.com",
			},
			backgroundImage:
				"https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			backgroundColor: "#E41B17",
		},
		sections: [
			{
				id: "section-1",
				type: "text-section",
				title: "Notre Histoire",
				text:
					"Depuis plus d'un siècle, Coca-Cola rafraîchit le monde et inspire le bonheur.",
				backgroundColor: "#FFFFFF",
			},
			{
				id: "section-2",
				type: "text-section",
				title: "Nos Produits",
				text:
					"Découvrez notre gamme : Coca-Cola Original, Zero Sugar, Cherry et bien plus.",
				backgroundColor: "#F8F8F8",
			},
			{
				id: "section-3",
				type: "cta-section",
				title: "Engagement Durable",
				text:
					"Nous travaillons pour un futur plus vert avec des emballages recyclables et moins de plastique.",
				cta: {
					text: "En savoir plus",
					link: "www.coca-cola.com/sustainability",
				},
				backgroundColor: "#F0F0F0",
			},
			{
				id: "section-4",
				type: "columns-section",
				title: "Nos Valeurs",
				columns: [
					{
						title: "Innovation",
						text: "Toujours à la pointe de la technologie",
					},
					{
						title: "Qualité",
						text: "Des produits d'excellence depuis 1886",
					},
					{
						title: "Durabilité",
						text: "Un engagement pour la planète",
					},
				],
				backgroundColor: "#FFFFFF",
			},
		],
		footer: {
			type: "footer",
			text: "© 2025 Coca-Cola Company. Tous droits réservés.",
			links: [
				{ text: "Mentions légales", link: "#" },
				{ text: "Politique de confidentialité", link: "#" },
			],
		},
	});

	const [originalContent, setOriginalContent] = useState(null);

	// Init original content
	useEffect(() => {
		if (!originalContent) {
			setOriginalContent(JSON.parse(JSON.stringify(content)));
		}
	}, [content, originalContent]);

	// Verify content changed
	const hasContentChanged = useMemo(() => {
		if (!originalContent) return false;
		return JSON.stringify(content) !== JSON.stringify(originalContent);
	}, [content, originalContent]);

	const availableSections = [
		{ id: "hero", label: "Hero" },
		{ id: "colors", label: "Couleurs" },
		...content.sections.map((section, index) => ({
			id: section.id,
			label: `Section ${index + 1}`,
		})),
		{ id: "footer", label: "Footer" },
	];

	const generateHTML = useCallback(() => {
		const renderSection = (section) => {
			const backgroundColor = section.backgroundColor || "#FFFFFF";
			const textColor = getTextColor(backgroundColor);

			const sectionStyle = `background-color: ${backgroundColor}; color: ${textColor};`;

			switch (section.type) {
				case "text-section":
					return `
						<section class="section text-section" data-id="${section.id}" style="${sectionStyle}">
							<h2>${section.title}</h2>
							<p>${section.text}</p>
						</section>
					`;
				case "cta-section":
					return `
						<section class="section cta-section" data-id="${section.id}" style="${sectionStyle}">
							<h2>${section.title}</h2>
							<p>${section.text}</p>
							<div class="cta-container">
								<a href="https://${section.cta.link}" target="_blank" class="cta-button">
									${section.cta.text}
								</a>
							</div>
						</section>
					`;
				case "columns-section":
					return `
						<section class="section columns-section" data-id="${section.id}" style="${sectionStyle}">
							<h2>${section.title}</h2>
							<div class="columns">
								${section.columns
									.map(
										(col) => `
									<div class="column">
										<h3>${col.title}</h3>
										<p>${col.text}</p>
									</div>
								`
									)
									.join("")}
							</div>
						</section>
					`;
				default:
					return `
						<section class="section" data-id="${section.id}" style="${sectionStyle}">
							<h2>${section.title || "Section"}</h2>
							<p>${section.text || ""}</p>
						</section>
					`;
			}
		};

		return `
<!DOCTYPE html>
<html>
<body>
<style>
    :root {
      --color-primary: ${content.colors.primary};
      --color-secondary: ${content.colors.secondary};
      --text-color: ${content.colors.text};
      --font-title: "Arial Black", sans-serif;
      --font-body: Arial, sans-serif;
    }

    body {
      margin: 0;
      font-family: var(--font-body);
      background-color: var(--color-secondary);
      color: var(--text-color);
    }

    .hero {
      min-height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: url('${content.hero.backgroundImage}') center/cover no-repeat;
      position: relative;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
    }

    .hero > * {
      position: relative;
      z-index: 1;
    }

    .hero h1 {
      font-family: var(--font-title);
      font-size: 3rem;
      color: var(--color-secondary);
      margin-bottom: 15px;
    }

    .hero p {
      font-size: 1.2rem;
      color: var(--color-secondary);
      max-width: 600px;
      margin-bottom: 20px;
    }

    .hero button {
      background-color: var(--color-secondary);
      color: var(--color-primary);
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 25px;
      cursor: pointer;
      transition: transform 0.2s, background-color 0.3s;
    }

    .hero a {
      text-decoration: none;
      color: var(--color-primary);
    }

    .hero button:hover {
      transform: scale(1.05);
      background-color: #f0f0f0;
    }

    .section {
      text-align: center;
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section h2 {
      font-size: 1.8rem;
      color: var(--color-primary);
      margin-bottom: 20px;
    }

    .section p {
      font-size: 1rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto 20px;
      line-height: 1.6;
    }

    .cta-section {
      background-color: #f8f8f8;
    }

    .cta-container {
      margin-top: 30px;
    }

    .cta-button {
      display: inline-block;
      background-color: var(--color-primary);
      color: var(--color-secondary);
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      transition: transform 0.2s;
    }

    .cta-button:hover {
      transform: scale(1.05);
    }

    .columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-top: 40px;
    }

    .column {
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .column h3 {
      color: var(--color-primary);
      margin-bottom: 15px;
    }

    footer {
      background-color: var(--color-primary);
      color: var(--color-secondary);
      text-align: center;
      padding: 40px 20px;
      margin-top: 60px;
    }

    .footer-links {
      margin-top: 20px;
    }

    .footer-links a {
      color: var(--color-secondary);
      text-decoration: none;
      margin: 0 15px;
      opacity: 0.8;
    }

    .footer-links a:hover {
      opacity: 1;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .columns { grid-template-columns: 1fr; }
    }
  </style>
  
  <section class="hero" data-id="hero">
    <h1>${content.hero.title}</h1>
    <p>${content.hero.subtitle}</p>
    <button><a href="https://${content.hero.cta.link}" target="_blank">${content.hero.cta.text}</a></button>
  </section>

  ${content.sections.map((section) => renderSection(section)).join("")}

  <footer data-id="footer">
    <p>${content.footer.text}</p>
    <div class="footer-links">
      ${content.footer.links
							.map(
								(link) => `
        <a href="${link.link}">${link.text}</a>
      `
							)
							.join("")}
    </div>
  </footer>

</body>
</html>
`;
	}, [content, getTextColor]);
	const iframeRef = useRef(null);

	const handleChange = (path, value) => {
		setContent((prev) => {
			const updated = { ...prev };
			let current = updated;

			// On parcourt toutes les clés sauf la dernière
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

			// Mise à jour de la clé finale
			const lastKey = keys[keys.length - 1];
			current[lastKey] = value;

			return updated;
		});
	};

	const addSection = useCallback((type = "text-section") => {
		setContent((prev) => {
			const updated = { ...prev };

			if (updated.sections.length >= 4) return prev;

			const newSectionId = `section-${Date.now()}`;

			let newSection = {
				id: newSectionId,
				type: type,
				title: "Nouvelle section",
				backgroundColor: "#FFFFFF",
			};

			// Section type
			switch (type) {
				case "text-section":
					newSection.text = "Contenu de la nouvelle section";
					break;
				case "cta-section":
					newSection.text = "Description de l'action";
					newSection.cta = {
						text: "Bouton d'action",
						link: "www.example.com",
					};
					break;
				case "columns-section":
					newSection.columns = [
						{
							title: "Colonne 1",
							text: "Description de la première colonne",
						},
						{
							title: "Colonne 2",
							text: "Description de la seconde colonne",
						},
					];
					break;
			}

			updated.sections = [...updated.sections, newSection];

			setIframeLoaded(false);

			return updated;
		});
	}, []);

	const removeSection = useCallback(
		(sectionIndex) => {
			setContent((prev) => {
				const updated = { ...prev };
				const removedSectionId = updated.sections[sectionIndex].id;

				// Remove section
				updated.sections = updated.sections.filter(
					(_, index) => index !== sectionIndex
				);

				if (selectedSection === removedSectionId) setSelectedSection("hero");

				setIframeLoaded(false);

				return updated;
			});
		},
		[selectedSection]
	);

	const handleSave = useCallback(() => {
		setOriginalContent(JSON.parse(JSON.stringify(content)));
		console.log("Content saved :", content);
	}, [content]);

	const handleCancel = useCallback(() => {
		if (originalContent) {
			setContent(JSON.parse(JSON.stringify(originalContent)));
			setIframeLoaded(false);
		}
	}, [originalContent]);

	const updateHTMLContent = useCallback(
		(doc) => {
			const heroTitle = doc.querySelector(".hero h1");
			const heroSubtitle = doc.querySelector(".hero p");
			const heroButton = doc.querySelector(".hero button a");

			if (heroTitle) heroTitle.textContent = content.hero.title;
			if (heroSubtitle) heroSubtitle.textContent = content.hero.subtitle;
			if (heroButton) {
				heroButton.textContent = content.hero.cta.text;
				heroButton.href = `https://${content.hero.cta.link}`;
			}

			const heroSection = doc.querySelector(".hero");
			if (heroSection && content.hero.backgroundImage) {
				heroSection.style.backgroundImage = `url('${content.hero.backgroundImage}')`;
			}

			if (doc.documentElement) {
				doc.documentElement.style.setProperty(
					"--color-primary",
					content.colors.primary
				);
				doc.documentElement.style.setProperty(
					"--color-secondary",
					content.colors.secondary
				);
				doc.documentElement.style.setProperty("--text-color", content.colors.text);
			}

			content.sections.forEach((section) => {
				const sectionElement = doc.querySelector(`[data-id="${section.id}"]`);

				if (sectionElement) {
					switch (section.type) {
						case "text-section": {
							const title = sectionElement.querySelector("h2");
							const text = sectionElement.querySelector("p");
							if (title) title.textContent = section.title;
							if (text) text.textContent = section.text;
							break;
						}

						case "cta-section": {
							const ctaTitle = sectionElement.querySelector("h2");
							const ctaText = sectionElement.querySelector("p");
							const ctaButton = sectionElement.querySelector(".cta-button");
							if (ctaTitle) ctaTitle.textContent = section.title;
							if (ctaText) ctaText.textContent = section.text;
							if (ctaButton) {
								ctaButton.textContent = section.cta.text;
								ctaButton.href = `https://${section.cta.link}`;
							}
							break;
						}

						case "columns-section": {
							const columnsTitle = sectionElement.querySelector("h2");
							if (columnsTitle) columnsTitle.textContent = section.title;

							const columnsContainer = sectionElement.querySelector(".columns");
							if (columnsContainer) {
								columnsContainer.innerHTML = section.columns
									.map(
										(col) => `
									<div class="column">
										<h3>${col.title}</h3>
										<p>${col.text}</p>
									</div>
								`
									)
									.join("");
							}
							break;
						}
					}
				}
			});

			const footerText = doc.querySelector("footer p");
			if (footerText) footerText.textContent = content.footer.text;

			const footerLinks = doc.querySelectorAll(".footer-links a");
			content.footer.links.forEach((link, index) => {
				if (footerLinks[index]) {
					footerLinks[index].textContent = link.text;
					footerLinks[index].href = link.link;
				}
			});
		},
		[content]
	);

	useEffect(() => {
		if (iframeRef.current && !iframeLoaded) {
			const iframe = iframeRef.current;
			iframe.onload = () => {
				setIframeLoaded(true);
			};
			const doc = iframe.contentDocument || iframe.contentWindow.document;
			doc.open();
			doc.write(generateHTML());
			doc.close();
		}
	}, [generateHTML, iframeLoaded]);

	useEffect(() => {
		if (iframeRef.current && iframeLoaded) {
			const iframe = iframeRef.current;
			const doc = iframe.contentDocument || iframe.contentWindow.document;

			updateHTMLContent(doc);

			// Save scroll position
			const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
			const scrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;

			// Reset Scroll position
			setTimeout(() => {
				if (doc.documentElement) {
					doc.documentElement.scrollTop = scrollTop;
					doc.documentElement.scrollLeft = scrollLeft;
				}
				if (doc.body) {
					doc.body.scrollTop = scrollTop;
					doc.body.scrollLeft = scrollLeft;
				}
			}, 0);
		}
	}, [content, iframeLoaded, updateHTMLContent]);

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
				<div className="sticky top-0 bg-white dark:bg-[#111] py-1 z-20">
					<h1 className="text-center text-3xl font-bold mb-2">Landing page</h1>
				</div>

				<div className="flex flex-wrap gap-2 my-4 p-2">
					{availableSections.map((section) => (
						<Button
							key={section.id}
							variant={selectedSection === section.id ? "solid" : "outline"}
							color={selectedSection === section.id ? "primary" : "neutral"}
							size="sm"
							className="flex items-center gap-2"
							onClick={() => setSelectedSection(section.id)}
						>
							{section.icon}
							{section.label}
						</Button>
					))}
				</div>

				{/* Gestion des sections */}
				<div className="my-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-1">
					{content.sections.length >= 4 ? (
						<p className="text-center text-sm text-red-500">
							Maximum de 4 sections atteint
						</p>
					) : (
						<>
							<h3 className="text-center">
								Ajouter une section ({content.sections.length}/4)
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								<Button
									color="secondary"
									size="sm"
									className="flex items-center gap-1"
									onClick={() => addSection("text-section")}
									disabled={content.sections.length >= 4}
								>
									<BsPlus size={14} />
									Texte
								</Button>
								<Button
									color="secondary"
									size="sm"
									className="flex items-center gap-1"
									onClick={() => addSection("cta-section")}
									disabled={content.sections.length >= 4}
								>
									<BsPlus size={14} />
									CTA
								</Button>
								<Button
									color="secondary"
									size="sm"
									className="flex items-center gap-1"
									onClick={() => addSection("columns-section")}
									disabled={content.sections.length >= 4}
								>
									<BsPlus size={14} />
									Colonnes
								</Button>
							</div>
						</>
					)}
				</div>

				<div className="space-y-4">
					{/* Hero  */}
					{selectedSection === "hero" && (
						<LandingPageLayout.HeroSection
							content={content}
							handleChange={handleChange}
							getLengthError={getLengthError}
							TEXT_LIMITS={TEXT_LIMITS}
						/>
					)}

					{/* Couleur edition */}
					{selectedSection === "colors" && (
						<LandingPageLayout.ColorsSection
							content={content}
							handleChange={handleChange}
						/>
					)}

					{/* Sections */}
					{content.sections.map(
						(section, index) =>
							selectedSection === section.id && (
								<SectionBlock
									key={section.id}
									title={`Section ${index + 1} - ${section.type
										.split("-")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}`}
									action={
										<Button
											variant="outline"
											color="danger"
											size="none"
											circle
											className="p-1"
											onClick={() => removeSection(index)}
										>
											<BsTrash />
										</Button>
									}
								>
									<div className="space-y-4">
										{section.type === "text-section" && (
											<LandingPageLayout.TextSectionEditor
												section={section}
												index={index}
												handleChange={handleChange}
												getLengthError={getLengthError}
												TEXT_LIMITS={TEXT_LIMITS}
											/>
										)}

										{section.type === "cta-section" && (
											<LandingPageLayout.CtaSectionEditor
												section={section}
												index={index}
												handleChange={handleChange}
												getLengthError={getLengthError}
												TEXT_LIMITS={TEXT_LIMITS}
											/>
										)}

										{section.type === "columns-section" && (
											<LandingPageLayout.ColumnsSectionEditor
												section={section}
												index={index}
												handleChange={handleChange}
												getLengthError={getLengthError}
												TEXT_LIMITS={TEXT_LIMITS}
											/>
										)}
									</div>
								</SectionBlock>
							)
					)}

					{/* Footer */}
					{selectedSection === "footer" && (
						<LandingPageLayout.FooterSection
							content={content}
							handleChange={handleChange}
							getLengthError={getLengthError}
							TEXT_LIMITS={TEXT_LIMITS}
						/>
					)}
				</div>

				{hasContentChanged && (
					<div className="sticky bottom-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 p-4 mt-6">
						<div className="flex gap-3 justify-center">
							<Button
								variant="solid"
								color="primary"
								size="md"
								className="flex items-center gap-2 px-6"
								onClick={handleSave}
							>
								Enregistrer
							</Button>
							<Button
								variant="outline"
								color="neutral"
								size="md"
								className="flex items-center gap-2 px-6"
								onClick={handleCancel}
							>
								Annuler la modification
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default LandingPage;
