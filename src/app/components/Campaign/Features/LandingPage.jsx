import React, { useRef, useState } from "react";
import {
	BsFileEarmarkDiff,
	BsFullscreen,
	BsFullscreenExit,
	BsMagic,
	BsPencil,
} from "react-icons/bs";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";
import { Card } from "@shared/Card";
import { InputForm, TextareaForm } from "@shared/Input";

const LandingPage = ({ previewActive = false, onTogglePreview = () => {}}) => {
	const [content, setContent] = useState({
		colors: {
			primary: "#E41B17",
			secondary: "#FFFFFF",
			text: "#333333",
		},
		campany: "Coca cola",
		hero: {
			title: "Savourez le Moment",
			subtitle: "Coca-Cola, le goût inimitable depuis 1886",
			cta: {
				text: "Découvrir nos produits",
				link: "/",
			},
		},
		sections: [
			{
				title: "Notre Histoire",
				text:
					"Depuis plus d'un siècle, Coca-Cola rafraîchit le monde et inspire le bonheur.",
			},
			{
				title: "Nos Produits",
				text:
					"Découvrez notre gamme : Coca-Cola Original, Zero Sugar, Cherry et bien plus.",
			},
			{
				title: "Engagement Durable",
				text:
					"Nous travaillons pour un futur plus vert avec des emballages recyclables et moins de plastique.",
			},
		],
		footer: "© 2025 Coca-Cola Company. Tous droits réservés.",
	});

	const html = `
<body>
<style>
    /* 🎯 Variables globales */
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

    /* 🎯 Hero / Cover */
    .hero {
      min-height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: url('https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat;
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

    /* 🎯 Sections */
    .sections {
      padding: 60px 20px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 40px;
      max-width: 1200px;
      margin: auto;
    }

    section {
      text-align: center;
	  padding: 24px 0;
    }

    section h2 {
      font-size: 1.8rem;
      color: var(--color-primary);
      margin-bottom: 10px;
    }

    section p {
      font-size: 1rem;
      color: #666;
      max-width: 400px;
      margin: auto;
    }

    /* 🎯 Footer */
    footer {
      background-color: var(--color-primary);
      color: var(--color-secondary);
      text-align: center;
      padding: 15px;
      font-size: 0.9rem;
	  margin-top: 24px;
    }

    /* Responsive */
    @media (min-width: 768px) {
      .sections {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  </style>
  <!-- 🎯 Hero -->
  <section class="hero">
    <h1>${content.hero.title}</h1>
    <p>${content.hero.subtitle}</p>
    <button><a href="${content.hero.cta.link}">${content.hero.cta.text}</a></button>
  </section>

  <!-- 🎯 Sections -->
	<section>
		<h2>${content.sections[0].title}</h2>
		<p>${content.sections[0].text}</p>
	</section>
	<section>
		<h2>${content.sections[1].title}</h2>
		<p>${content.sections[1].text}</p>
	</section>
	<section>
		<h2>${content.sections[2].title}</h2>
		<p>${content.sections[2].text}</p>
    </section>

  <!-- 🎯 Footer -->
  <footer>
    © 2025 ${content.campany}. Tous droits réservés.
  </footer>

</body>
</html>
`;
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

	return (
		<div className="h-full flex gap-8 p-8">
			<div className="relative flex-1/2">
				<div className="h-full rounded-2xl mx-auto overflow-scroll">
					<iframe ref={iframeRef} srcDoc={html} className="size-full" />
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
				<div className="sticky top-0 bg-white dark:bg-[#111] py-1">
					<h1 className="text-center text-3xl font-bold mb-2">Landing page</h1>
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
					<SectionBlock title={"Les contenus"} icon={<BsFileEarmarkDiff />}>
						<div className="space-y-2">
							{content?.sections.map((sec, i) => (
								<Card key={i}>
									<div className="space-y-2">
										<h3 className="font-semibold">Section {i + 1}</h3>
										<div className="space-y-2">
											<div>
												<label>Titre :</label>
											</div>
											<InputForm
												type="text"
												value={sec.title}
												onChange={(e) =>
													handleChange(`sections[${i}].title`, e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<div>
												<label>Paragraphe :</label>
											</div>
											<TextareaForm
												value={sec.text}
												onChange={(e) =>
													handleChange(`sections[${i}].text`, e.target.value)
												}
											/>
										</div>
									</div>
								</Card>
							))}
						</div>
					</SectionBlock>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
