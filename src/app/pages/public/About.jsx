import React, { useMemo, useState } from "react";

import Button from "@shared/Button";
import { Textarea } from "@components/components/ui/textarea";
import { Badge } from "@components/components/ui/badge";
import { Card } from "@shared/Card";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/components/ui/tabs";
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

function classNames(...cn) {
  return cn.filter(Boolean).join(" ");
}

const ToggleRow = ({ label, enabled, onChange, Icon }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
      <span>{Icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <Switch checked={enabled} onCheckedChange={onChange} />
  </div>
);

const AssetCard = ({ type, title, thumb, meta }) => (
  <Card className="overflow-hidden hover:shadow-xl transition rounded-2xl">
    <div className="aspect-video w-full overflow-hidden">
      <img src={thumb} alt={title} className="w-full h-full object-cover" />
    </div>
    <CardHeader className="pb-2">
      <CardTitle className="text-base flex items-center gap-2">
        {type === "video" && "🎬"} {type === "post" && "📝"} {type === "landing" && "🌐"} {title}
      </CardTitle>
      <CardDescription>{meta}</CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-between">
      <Badge variant="outline" className="rounded-full">IA</Badge>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" title="Partager">🔗</Button>
        <Button size="icon mr-4">⬇️</Button>
      </div>
    </CardFooter>
  </Card>
);

const Hero = ({ onTry }) => (
  <section className="relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-4">✅ Produit propulsé par IA</div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">{brand.name}</h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg">{brand.tagline}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full" size="lg" onClick={onTry}>Voir une démo</Button>
          </div>
          <div className="mt-6 flex gap-3 items-center text-sm">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>+3 200 équipes nous font confiance</span>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl ring-1 ring-slate-200 shadow-2xl overflow-hidden transition hover:scale-105">
            <img src={sampleImages.landing} alt="Hero preview" className="w-full h-80 md:h-[28rem] object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureSection = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-6">
        {featureBullets.map((f, i) => (
          <Card key={i} className="rounded-2xl">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg">{f.icon}</div>
              <CardTitle className="text-base">{f.title}</CardTitle>
              <CardDescription>{f.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Playground = () => {
  const [prompt, setPrompt] = useState("Lancer un nouveau cours en ligne pour débutants, public: freelances & étudiants, objectif: 200 préinscriptions.");
  const [targets, setTargets] = useState({ tiktok: true, linkedin: true, twitter: true, landing: true });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const assets = useMemo(() => {
    if (!done) return [];
    const list = [];
    if (targets.tiktok) list.push({ type: "video", title: "TikTok 15s – Hook ‘3 erreurs React’", thumb: sampleImages.tiktok, meta: "9:16 • Sous-titres auto • 15 s" });
    if (targets.linkedin) list.push({ type: "post", title: "Post LinkedIn – Story + CTA", thumb: sampleImages.linkedin, meta: "Format 700–1 100 caractères" });
    if (targets.twitter) list.push({ type: "post", title: "Thread X (5 tweets) – Conseils", thumb: sampleImages.twitter, meta: "Ton éducatif + hashtags" });
    if (targets.landing) list.push({ type: "landing", title: "Landing ‘React Kickstart’", thumb: sampleImages.landing, meta: "Section héros + preuve sociale + FAQ" });
    return list;
  }, [done, targets]);
  return (
    <section className="py-16 md:py-24" id="playground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <Card className="lg:col-span-1 rounded-2xl sticky top-6">
            <CardHeader>
              <CardTitle>De votre prompt à la campagne</CardTitle>
              <CardDescription>Décrivez votre offre, public, objectif et ton.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea value={prompt} readOnly className="min-h-[200px] resize-none" />
              <div className="space-y-2">
                <div className="text-sm font-medium">Cibles</div>
                <div className="divide-y">
                  <ToggleRow label="TikTok" Icon="🎬" enabled={!!targets.tiktok} onChange={(v) => setTargets((t) => ({ ...t, tiktok: v }))} />
                  <ToggleRow label="LinkedIn" Icon="📝" enabled={!!targets.linkedin} onChange={(v) => setTargets((t) => ({ ...t, linkedin: v }))} />
                  <ToggleRow label="X (Twitter)" Icon="📝" enabled={!!targets.twitter} onChange={(v) => setTargets((t) => ({ ...t, twitter: v }))} />
                  <ToggleRow label="Landing page" Icon="🌐" enabled={!!targets.landing} onChange={(v) => setTargets((t) => ({ ...t, landing: v }))} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-3">
              <Button className="rounded-full" onClick={handleGenerate} disabled={loading}>
                {loading ? "⏳ Génération…" : "🚀 Générer la campagne"}
              </Button>
            </CardFooter>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="assets">
              <TabsList className="rounded-full">
                <TabsTrigger value="assets" className="rounded-full">Résultats</TabsTrigger>
                <TabsTrigger value="workflow" className="rounded-full">Workflow</TabsTrigger>
              </TabsList>

              <TabsContent value="assets" className="mt-6">
                {loading && <div className="flex items-center gap-3 p-4 rounded-xl ring-1 ring-slate-200">⏳ Assemblage des clips, écriture des posts et création de la landing…</div>}

                {!loading && done && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assets.map((a, i) => <AssetCard key={i} {...a} />)}
                  </div>
                )}

                {!loading && !done && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((s) => (
                      <Card key={s} className="rounded-2xl overflow-hidden ring-1 ring-dashed ring-slate-200">
                        <div className="aspect-video w-full" />
                        <CardHeader>
                          <CardTitle className="text-base">Aucun résultat (encore)</CardTitle>
                          <CardDescription>Renseignez un prompt et cliquez sur « Générer ».</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="workflow" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {["Analyse du prompt", "Écriture & montage", "Export & publication"].map((step, i) => (
                    <Card key={i} className="rounded-2xl">
                      <CardHeader>
                        <Badge variant="secondary" className="rounded-full w-fit">Étape {i + 1}</Badge>
                        <CardTitle className="text-lg mt-2">{step}</CardTitle>
                        <CardDescription>
                          {i === 0 && "Compréhension de l’audience, ton, objectifs, persona et canaux."}
                          {i === 1 && "Génération du script, B-rolls, sous-titres, hooks et variations de posts."}
                          {i === 2 && "Exports optimisés, calendrier de publication et page d’atterrissage prête."}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => (
  <section className="py-16 md:py-24" id="pricing">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Tarifs simples, croissance rapide</h2>
        <p>Choisissez un plan et lancez votre production de contenu dès aujourd’hui.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <Card key={t.name} className={classNames("rounded-2xl border", t.highlight ? "border-slate-900 shadow-2xl" : "border-slate-200")}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.name} {t.highlight && <Badge className="rounded-full">Populaire</Badge>}
              </CardTitle>
              <div className="mt-2 text-3xl font-extrabold">{t.price} <span className="text-base font-medium">{t.period}</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {t.points.map((p) => <li key={p} className="flex items-center gap-2">✅ {p}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
const Footer = () => (
  <footer className="py-10 border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{brand.name}</span>
        </div>
        <div className="text-sm">© {new Date().getFullYear()} Postnova.AI, Inc. Tous droits réservés.</div>
      </div>
    </div>
  </footer>
);