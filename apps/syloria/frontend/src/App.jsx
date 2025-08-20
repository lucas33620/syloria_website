// SyloriaLanding.jsx
// Default export: React component ready to drop into a Vite+React+Tailwind app
// Tailwind palette is referenced via HEX (works even before extending the theme)
// Props allow swapping assets quickly: backgroundUrl, logoUrl.

import React, { useState } from "react";

const colors = {
  violet: "#2D0A4E",
  blue: "#1E90FF",
  coral: "#FF4D94",
  black: "#0A0A0A",
  gray: "#F5F5F5",
  white: "#FFFFFF",
};

function Container({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>{children}</div>
  );
}

function SectionTitle({ kicker, title, light = false }) {
  return (
    <div className="mb-8 text-center">
      {kicker && (
        <p className={`uppercase tracking-widest text-sm ${light ? "opacity-90" : "text-neutral-500"}`}>
          {kicker}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold ${light ? "text-white" : "text-black"}`}>{title}</h2>
    </div>
  );
}

function Hero({ backgroundUrl, logoUrl }) {
  return (
    <header
      className="relative overflow-hidden"
      style={{ backgroundColor: colors.violet }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay gradient for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(45,10,78,0.85) 0%, rgba(45,10,78,0.92) 35%, rgba(17,22,32,0.9) 100%)`,
        }}
      />

      <Container className="relative z-10 text-center text-white py-20 md:py-28">
        <div className="flex justify-center mb-8">
          {logoUrl && (
            <img src={logoUrl} alt="Syloria" className="h-16 w-16 md:h-20 md:w-20 drop-shadow" />
          )}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Expertise embarquée & sécurité, <span className="text-[var(--coral)]" style={{color: colors.coral}}>sans la lourdeur ESN</span>
        </h1>
        <p className="mt-5 text-lg md:text-xl max-w-3xl mx-auto opacity-95">
          STM32 • ROS2 • Django REST • CI/CD • Audits sécurité
        </p>
        <a href="#contact" className="inline-block mt-9 px-7 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition"
           style={{ backgroundColor: colors.coral, color: colors.white }}>
          Intéressé ? Être contacté
        </a>
      </Container>
    </header>
  );
}

function Why() {
  const items = [
    {
      title: "Micro-agence humaine",
      text: "Proximité, réactivité et visibilité totale sur l'avancement.",
      icon: "⚡",
    },
    {
      title: "Expertise rare",
      text: "Embarqué + backend + sécurité : une combinaison difficile à trouver.",
      icon: "🔒",
    },
    {
      title: "Documentation claire",
      text: "On transmet les savoirs, on ne livre pas une boîte noire.",
      icon: "📚",
    },
  ];
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <SectionTitle kicker="Pourquoi Syloria ?" title="Choisir l'efficacité sans compromis" />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((e, i) => (
            <div key={i} className="rounded-2xl p-6 border bg-white/90">
              <div className="text-3xl" aria-hidden>{e.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-neutral-600">{e.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PackCard({ name, desc, price, ctaHref = "#contact" }) {
  return (
    <div className="rounded-2xl p-6 border bg-white flex flex-col">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="mt-2 text-neutral-600 flex-1">{desc}</p>
      <div className="mt-4 text-sm text-neutral-700">dès <span className="text-lg font-semibold">{price}</span></div>
      <a href={ctaHref} className="mt-6 inline-block text-center px-5 py-3 rounded-xl font-semibold shadow hover:scale-[1.01] transition"
         style={{ backgroundColor: colors.coral, color: colors.white }}>
        Discuter du pack
      </a>
    </div>
  );
}

function Packs() {
  const packs = [
    { name: "Pack Embarqué Express", desc: "POC STM32/ROS2 en 4 semaines", price: "2 500 €" },
    { name: "Pack API Sécurisée", desc: "Déploiement Django REST & CI/CD", price: "3 000 €" },
    { name: "Pack Audit Cybersécurité", desc: "Audit code + rapport", price: "1 500 €" },
    { name: "Pack Agile Flash", desc: "Diagnostic + sprint coaching", price: "2 000 €" },
  ];
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: colors.violet }}>
      <Container>
        <SectionTitle light kicker="Nos offres packagées" title="Aller vite, bien, et en sécurité" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packs.map((p, i) => (
            <PackCard key={i} {...p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Founder({ logoUrl }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <SectionTitle kicker="Qui sommes-nous" title="Lucas Baquey" />
            <p className="text-neutral-700">
              Ingénieur Mines Saint‑Étienne, 3 ans d’expérience Shark Robotics. Spécialisé en systèmes embarqués et cybersécurité. Basé en Nouvelle‑Aquitaine, disponible en remote.
            </p>
            <a href="#contact" className="inline-block mt-8 px-6 py-3 rounded-xl font-semibold shadow"
               style={{ backgroundColor: colors.coral, color: colors.white }}>
              Être contacté
            </a>
          </div>
          <div className="justify-self-center">
            {logoUrl ? (
              <img src={logoUrl} alt="Syloria" className="h-28 w-28 md:h-36 md:w-36" />
            ) : (
              <div className="h-36 w-36 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${colors.blue}, ${colors.violet})` }} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ ok: false, err: "" });

  const submit = async (e) => {
    e.preventDefault();
    setState({ ok: false, err: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur d’envoi");
      setForm({ name: "", email: "", message: "" });
      setState({ ok: true, err: "" });
    } catch (e) {
      setState({ ok: false, err: e.message });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20" style={{ backgroundColor: colors.gray }}>
      <Container>
        <SectionTitle title="Être contacté" />
        <form onSubmit={submit} className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <input className="border rounded-lg p-3" placeholder="Nom" required
                   value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            <input type="email" className="border rounded-lg p-3" placeholder="Email" required
                   value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          </div>
          <textarea className="border rounded-lg p-3 w-full mt-4" rows={6} placeholder="Votre message" required
                    value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} />
          <button className="mt-4 px-6 py-3 rounded-xl font-semibold" style={{ backgroundColor: colors.coral, color: colors.white }}>
            Envoyer
          </button>
          {state.ok && <p className="mt-3 text-green-700">Merci, nous vous recontactons rapidement.</p>}
          {state.err && <p className="mt-3 text-red-700">{state.err}</p>}
        </form>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-sm" style={{ backgroundColor: colors.violet, color: colors.white }}>
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="opacity-90">© {new Date().getFullYear()} SASU Syloria – contact@syloria.eu</p>
        <div className="flex items-center gap-5 opacity-90">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="underline">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="underline">GitHub</a>
        </div>
      </Container>
    </footer>
  );
}

export default function SyloriaLanding() {
  // Replace with your asset URLs (served from /public or CDN)
  const backgroundUrl = "/bg-syloria.png"; // e.g. the wavy image you shared
  const logoUrl = "/logo-syloria.png"; // your transparent logo

  return (
    <main className="font-inter">
      <Hero backgroundUrl={backgroundUrl} logoUrl={logoUrl} />
      <Why />
      <Packs />
      <Founder logoUrl={logoUrl} />
      <ContactForm />
      <Footer />
    </main>
  );
}

// --- Notes d'intégration ---
// 1) Place tes assets dans /public :
//    public/bg-syloria.png  -> l'image de fond (16:9).
//    public/logo-syloria.png -> le logo transparent.
// 2) Tailwind : ajoute Inter/Poppins via Google Fonts dans index.html.
// 3) SEO index.html : Title + meta description fournis dans le guide.
// 4) Le formulaire POST vers /api/contact (reverse proxy Nginx -> service Node + Brevo).
