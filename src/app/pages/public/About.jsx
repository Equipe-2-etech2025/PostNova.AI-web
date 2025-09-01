import React, { useState, useMemo } from "react";

// ==================== Données ====================
const sampleImages = {
  video: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop",
  tiktok: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
  linkedin: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop",
  twitter: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1600&auto=format&fit=crop",
  landing: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
};

const brand = {
  name: "Postnova.AI",
  tagline:
    "Transformez un simple prompt en une campagne complète – vidéos courtes, posts LinkedIn & X, et landing page – prêtes à publier en < 1 min.",
};

const featureBullets = [
  { icon: "🎬", title: "Clips courts auto-montés", text: "TikTok, Reels, Shorts en formats 9:16 avec sous-titres, découpes dynamiques et musique libre de droit." },
  { icon: "📝", title: "Posts percutants", text: "Accroches AIDA, variations de ton et hashtags pertinents pour LinkedIn et X (Twitter)." },
  { icon: "🌐", title: "Landing page clé en main", text: "Section héros, preuve sociale, FAQ, CTA et intégration newsletter, exportable en HTML/React." },
  { icon: "⚡", title: "< 60 s, grâce à l’IA", text: "Pipeline accéléré, templates optimisés et rendu CDN pour une livraison quasi-instantanée." },
];

const tiers = [
  { name: "Starter", price: "$0", period: "illimité", points: ["2 campagnes", "Exports MP4 & PNG", "1 marque"] },
  { name: "Pro", price: "$49", period: "/mo", points: ["Illimité", "Montage vidéo avancé", "3 marques"] },
];

const testimonials = [
  { name: "Nathan", role: "Back-end developer, Greenly", quote: "On a divisé par 10 le temps de production social. Les clips et les posts sortent prêts à publier.", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop" },
  { name: "Tahiry Houlder", role: "Front-end developer, Studio K", quote: "Une solution simple, rapide, et qui s’intègre parfaitement à notre workflow.", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=800&auto=format&fit=crop" },
  { name: "Andhi Kenah", role: "Full-stack developer, Studio K", quote: "La landing auto-générée convertit mieux que nos pages faites à la main. Un must pour les lancements.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" },
  { name: "Lisa", role: "Ingénieur DevOps, Greenly", quote: "J’ai pu lancer une campagne complète en 30 minutes. Incroyable gain de temps.", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop" },
];

// ==================== Composants ====================

// Switch simple
const Switch = ({ checked, onCheckedChange }) => (
  <button
    type="button"
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-white-200"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

// Carte de contenu
const AssetCard = ({ type, title, thumb, meta }) => (
  <div className="overflow-hidden rounded-2xl border shadow hover:shadow-lg transition">
    <div className="aspect-video w-full overflow-hidden">
      <img src={thumb} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="text-base font-semibold flex items-center gap-2">
        {type === "video" && "🎬"} {type === "post" && "📝"} {type === "landing" && "🌐"} {title}
      </h3>
      <p className="text-sm text-white-600">{meta}</p>
    </div>
  </div>
);

// Hero
const Hero = ({ onTry }) => (
  <section className="py-16 bg-white-50">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-4">✅ Produit propulsé par IA</div>
        <h1 className="text-3xl md:text-5xl font-extrabold">{brand.name}</h1>
        <p className="mt-4 text-white-600">{brand.tagline}</p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full" onClick={onTry}>
          Voir une démo
        </button>
      </div>
      <div>
        <img src={sampleImages.landing} alt="Hero preview" className="w-full h-80 object-cover rounded-2xl shadow-xl" />
      </div>
    </div>
  </section>
);

// Feature Section
const FeatureSection = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
      {featureBullets.map((f, i) => (
        <div key={i} className="border rounded-2xl p-4 hover:shadow-md transition">
          <div className="text-2xl mb-2">{f.icon}</div>
          <h3 className="font-semibold">{f.title}</h3>
          <p className="text-sm text-white-600">{f.text}</p>
        </div>
      ))}
    </div>
  </section>
);

// Playground
const Playground = () => {
  const [prompt, setPrompt] = useState("Lancer un nouveau cours de programmation en ligne pour débutants...");
  const [targets, setTargets] = useState({ tiktok: true, linkedin: true, twitter: true, landing: true });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const assets = useMemo(() => {
    if (!done) return [];
    const list = [];
    if (targets.tiktok) list.push({ type: "video", title: "TikTok 15s – Hook React", thumb: sampleImages.tiktok, meta: "9:16 • Sous-titres auto" });
    if (targets.linkedin) list.push({ type: "post", title: "Post LinkedIn – Story + CTA", thumb: sampleImages.linkedin, meta: "700–1 100 caractères" });
    if (targets.twitter) list.push({ type: "post", title: "Thread X – Conseils", thumb: sampleImages.twitter, meta: "Ton éducatif" });
    if (targets.landing) list.push({ type: "landing", title: "Landing ‘React Kickstart’", thumb: sampleImages.landing, meta: "Section héros + FAQ" });
    return list;
  }, [done, targets]);

  const handleGenerate = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  return (
    <section className="py-16" id="playground">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
        {/* Prompt + Switch */}
        <div className="lg:col-span-1 p-4 border rounded-2xl sticky top-6">
          <h3 className="font-semibold mb-2">De votre prompt à la campagne</h3>
          <textarea
            value={prompt}
            readOnly
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[200px] resize-none"
          />
          <div className="mt-4 space-y-2">
            {Object.keys(targets).map((key) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize">{key}</span>
                <Switch
                  checked={targets[key]}
                  onCheckedChange={(v) => setTargets({ ...targets, [key]: v })}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-full"
            disabled={loading}
          >
            {loading ? "⏳ Génération…" : "🚀 Générer la campagne"}
          </button>
        </div>

        {/* Résultats */}
        <div className="lg:col-span-2">
          {loading && <div className="p-4 border rounded-md">⏳ Assemblage des clips, posts et landing…</div>}
          {!loading && done && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((a, i) => <AssetCard key={i} {...a} />)}
            </div>
          )}
          {!loading && !done && <div className="text-white-400">Aucun résultat (encore)</div>}
        </div>
      </div>
    </section>
  );
};

// Pricing
const Pricing = () => (
  <section className="py-16 bg-white-50">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-10">Tarifs simples, croissance rapide</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="border rounded-2xl p-6 hover:shadow-md transition w-80"
          >
            <h3 className="text-xl font-semibold text-left">{t.name}</h3>
            <p className="text-3xl font-bold my-2 text-left">
              {t.price} <span className="text-base font-normal">{t.period}</span>
            </p>
            <ul className="text-sm space-y-1 text-left">
              {t.points.map((p) => (
                <li key={p}>✅ {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);


// Testimonials
const Testimonials = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="border rounded-2xl p-4 shadow hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-2">
            <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
            <div>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-white-500">{t.role}</p>
            </div>
          </div>
          <p className="text-white-700">“{t.quote}”</p>
        </div>
      ))}
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="py-10 border-t text-center">
    <div className="text-sm">© {new Date().getFullYear()} {brand.name}, Tous droits réservés.</div>
  </footer>
);

// ==================== Page About ====================
export default function About() {
  const onTry = () => {
    const el = document.querySelector("#playground");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero onTry={onTry} />
      <FeatureSection />
      <Playground />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}
