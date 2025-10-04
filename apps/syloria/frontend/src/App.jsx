/*
  SYLORIA® – Landing Page (Maquette v2.1)
  -------------------------------------------------------
  ▶️ Mise à jour suite à tes demandes du dernier message.

  ✅ Changements par rapport à v2 :
    - Header: sections = <Hero/>, <Audience/>, <About/>, <Process/>, <Portfolio/>, <Tagline/>, <Contact/>
    - Audience: phrases « solution » en <strong>gras</strong>
    - About: suppression du libellé « À propos », cartes services avec image + flip « Plus de détails » (+ service Agilité & formation)
    - Process: présentation en LIGNE (style comme la capture) avec numéros XL en dégradé
    - Portfolio: bouton « Voir le projet » → OUVRE un lien si disponible (cat. Web), sinon MODALE superposée (esc/overlay/croix)
    - Animations d’apparition au scroll (component <Reveal/>)

  📁 Assets à prévoir (remplacez les commentaires)
    - /public/hero-bg.jpg
    - /public/portrait-lucas.jpg
    - /public/service-embedded.png
    - /public/service-webapi.png
    - /public/service-cyber.png
    - /public/service-agile.png
    - /public/portfolio/*
*/

import { useEffect, useMemo, useState, useRef } from 'react'

// ——————————————————————————————————————————
// 🎨 Palette / Thème
// ——————————————————————————————————————————
const brand = {
  main: '#2D0A4E',
  blue: '#1E90FF',
  coral: '#A83A65',
  night: '#0B0F1A',
  cloud: '#E9ECF2',
  violet: '#5A3E8C',
}

const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

// ——————————————————————————————————————————
// 👀 Animation d’apparition au scroll
// ——————————————————————————————————————————
function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setShow(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShow(true); io.disconnect() }
    }, { threshold: 0.12 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${className} transition-all duration-700 will-change-transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {children}
    </div>
  )
}

// ——————————————————————————————————————————
// 🔝 HEADER + NAV (sections demandées)
// ——————————————————————————————————————————
function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const links = [
    { id: 'audience',  label: 'Nos clients ?' },
    { id: 'about',     label: 'À propos de nous' },
    { id: 'process',   label: 'Méthode' },
    { id: 'portfolio', label: 'Réalisations' },
    { id: 'contact',   label: 'Contact' },
  ];

  const NavLinks = ({ onClick }) => (
    <>
      {links.map((l) => (
        <a key={l.id} href={`#${l.id}`} onClick={onClick} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">{l.label}</a>
      ))}
    </>
  )

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-syloria.png" alt="Syloria" className="h-8 w-auto"/>
          <span className="text-lg font-semibold">SYLORIA®</span>
        </div>
        <nav className="hidden md:flex items-center gap-2" aria-label="Navigation principale">
          <NavLinks />
        </nav>
        <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50" aria-label="Ouvrir le menu" onClick={() => setOpen((v) => !v)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </Container>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <Container className="py-3 flex flex-col gap-2">
            <NavLinks onClick={() => setOpen(false)} />
          </Container>
        </div>
      )}
    </header>
  )
}

// ——————————————————————————————————————————
// 🦸 1) HERO / ACCROCHE (fix mobile + desktop)
// ——————————————————————————————————————————
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center" aria-label="Accueil">
      {/* Fond (image ou gradient) */}
      <img src="/bg-syloria.png" alt="Fond Syloria" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="absolute inset-0 -z-10 bg-black/25" />

      <Container>
        {/* -> espace haut/bas responsive pour header & vague */}
        <Reveal className="text-center text-white pt-24 sm:pt-16 md:pt-8 lg:pt-6 pb-28 sm:pb-24 md:pb-20">
          {/* Bloc marque */}
          <div className="inline-flex flex-col items-center mb-12 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug tracking-wide">− SYLORIA® −</h1>
            <p className="mt-2 text-xs tracking-widest uppercase font-semibold text-white/80">
              Systèmes embarqués • Web/API • Sécurité
            </p>
          </div>

          {/* Titre + pitch + CTA */}
          <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Une équipe tech indépendante qui transforme vos idées en solutions fiables
          </h2>

          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:opacity-90"
              style={{ backgroundColor: brand.coral }}
            >
              Lancez votre projet dès aujourd’hui !
            </a>
          </div>
        </Reveal>
      </Container>

      {/* Vague bas de section — reste collée en bas */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-full h-[80px] -mb-[1px]">
        <svg viewBox="0 0 1240 80" className="w-full h-full" preserveAspectRatio="none">
          <path fill={brand.cloud} d="M0,64L60,53.3C120,43,240,21,360,21.3C480,21,600,43,720,53.3C840,64,960,64,1080,58.7C1200,53,1320,43,1380,37.3L1440,32V80H0Z" />
        </svg>
      </div>
    </section>
  );
}



// ——————————————————————————————————————————
// 👥 2) Pour qui ? (segmentation cibles)
// ——————————————————————————————————————————
function Audience() {
  const items = [
    {
      t: '🚀 Entrepreneur',
      d: (
        <>Passez de l’idée au prototype fonctionnel avec des outils simples et adaptés à vos moyens.</>
      ),
      bullets: [
        <strong key="1">Création rapide de MVP (API, mini-site, formulaire)</strong>,
        <strong key="2">Bonnes pratiques cybersécurité (sauvegarde, authentification)</strong>,
        <strong key="3">Conseils techniques clairs pour prendre les bonnes décisions</strong>,
      ],
    },
    {
      t: '🌱 Startup',
      d: (
        <>Vous avez une idée et une petite équipe ? Nous posons un socle technique solide pour faire évoluer rapidement votre projet.</>
      ),
      bullets: [
        <strong key="1">MVP clé en main (API, backend robuste)</strong>,
        <strong key="2">Bases embarquées & edge-ready (STM32, ROS2)</strong>,
        <strong key="3">Solutions IoT de bout en bout (objet → données → tableau de bord)</strong>,
      ],
    },
    {
      t: '⚙️ TPE-PME industrielle',
      d: (
        <>Nous concevons vos produits avec une logique d’évolutivité native : modularité, tests et documentation inclus dès le départ.</>
      ),
      bullets: [
        <strong key="1">Firmware embarqué (STM32, ROS2, drivers)</strong>,
        <strong key="2">Dashboards & bancs de test pour la production (Python, Qt)</strong>,
        <strong key="3">Projets IoT industriels (capteurs, supervision)</strong>,
        <strong key="4">Accompagnement agile avec reporting clair</strong>,
      ],
    },
    {
      t: '🎯 Responsable produit',
      d: (
        <>Nous transformons votre vision en livrables techniques clairs et exploitables.</>
      ),
      bullets: [
        <strong key="1">Alignement besoin ↔ technique (évite les incompréhensions)</strong>,
        <strong key="2">APIs robustes documentées (FastAPI/Django + Swagger)</strong>,
        <strong key="3">Suivi agile (sprint, priorisation, reporting)</strong>,
        <strong key="4">CI/CD intégré pour des déploiements fiables</strong>,
      ],
    },
  ];

  return (
    <section id="audience" className="py-16" style={{backgroundColor: brand.cloud}}>
      <Container>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nos clients</h2>
          <p className="mt-3 text-gray-700">Entrepreneurs, startups, TPE‑PME industrielles, responsables produit : Nous adaptons notre accompagnement à votre contexte métier et vos contraintes opérationnelles.</p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <Reveal key={i}>
              <article className="bg-white rounded-2xl p-6 shadow ring-1 ring-gray-200 flex flex-col">
                <header className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{it.t}</h3>
                  <a href="#contact" className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full text-white" style={{background: brand.coral}} aria-label={`Contacter pour profil ${it.t}`}>
                    <span className="text-xl">»»</span>
                  </a>
                </header>
                <p className="mt-3 text-gray-700">{it.d}</p>
                <ul className="mt-3 text-sm text-gray-700 list-disc list-inside space-y-1">
                  {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ——————————————————————————————————————————
// 🧭 3) ABOUT (flip + images)
// ——————————————————————————————————————————
function About() {
  const [flipped, setFlipped] = useState({});
  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  const services = [
    { t: 'Systèmes embarqués', img: '/Electronic_logo.png', details: 'STM32, ROS2, FreeRTOS, drivers capteurs, bus CAN/UART/SPI, conception PCB (KiCad), intégration capteurs/microprocesseur.' },
    { t: 'Web & APIs backend', img: '/Web_logo.png',        details: 'APIs sécurisées (FastAPI/Django), Swagger/OpenAPI, authentification, CI/CD légère, observabilité et métriques.' },
    ];

  const [showProfile, setShowProfile] = useState(false);

  return (
    <section id="about" className="py-20" style={{ backgroundColor: brand.main }}>
      <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-left">
              {/* <img src="/portrait-lucas.jpg" alt="Fondateur" className="hidden" /> */}
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Une équipe tech réactive portée par 2 ingénieurs
              </h2>
              <p className="mt-4 text-white/90" style={{ textAlign: 'justify' }}>
                Fondée par Lucas Baquey (Ingénieur Mines Saint-Étienne), SYLORIA® est une micro-agence freelance basée en Nouvelle-Aquitaine.
                Nous sommes 2 ingénieurs complémentaires (Embarqué/API & Cybersécurité/IT) qui livrent des résultats concrets sans lourdeur de structure.
              </p>
              <p className="mt-4 text-white/90" style={{ textAlign: 'justify' }}>
                Aujourd’hui, nous concentrons nos services sur l’<strong>embarqué</strong> et le <strong>web/API</strong>, avec une même promesse :
                des livrables propres, documentés et transmis avec pédagogie.
                Nous travaillons en itérations courtes, avec transparence sur les risques, les coûts et les délais.
              </p>
              <button
                onClick={() => setShowProfile(true)}
                className="mt-6 inline-flex rounded-xl px-6 py-3 font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: brand.coral }}>
                Découvrir le profil de Lucas
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6">
            {services.map((s, i) => (
              <Reveal key={i}>
                {/* Conteneur flip */}
                <div
                  className={`flip-card ${flipped[i] ? 'is-flipped' : ''}`}
                  style={{ height: 260, maxWidth: 320, margin: "0 auto" }}
                >
                  <div className="flip-card-inner">
                    {/* Face avant */}
                    <div className="flip-card-front flex flex-col items-center justify-center p-4">
                      <img
                        src={s.img}
                        alt=""
                        className="w-[120px] h-[120px] object-contain"
                      />
                      <h3 className="font-semibold text-gray-900 text-center mt-3">
                        {s.t}
                      </h3>
                      <button
                        onClick={() => toggle(i)}
                        className="mt-3 text-sm font-medium text-white px-3 py-2 rounded-lg"
                        style={{ backgroundColor: brand.violet }}
                      >
                        Plus de détails
                      </button>
                    </div>

                    {/* Face arrière */}
                    <div className="flip-card-back flex flex-col items-center justify-center p-4">
                      <p className="text-sm text-gray-800 text-center">{s.details}</p>
                      <button
                        onClick={() => toggle(i)}
                        className="mt-4 text-sm font-medium text-white px-3 py-2 rounded-lg"
                        style={{ backgroundColor: brand.violet }}
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Styles flip (robustes, basés sur ton mécanisme) */}
      <style>{`
        .flip-card { perspective: 1000px; position: relative; border-radius: 1rem; }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d; transition: transform .6s;
          border-radius: 1rem;
        }
        .flip-card.is-flipped .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back {
          position: absolute; inset: 0; display:flex; flex-direction:column;
          align-items:center; justify-content:center; padding:1.25rem;
          background:#fff; border-radius:1rem; box-shadow: 0 1px 2px rgba(0,0,0,.06);
          backface-visibility:hidden; -webkit-backface-visibility:hidden;
        }
        .flip-card-back { transform: rotateY(180deg); }
      `}</style>

      {showProfile && (
      <div role="dialog" aria-modal="true" className="fixed inset-0 z-[200]">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProfile(false)} />
        <div className="relative z-[210] mx-auto my-8 w-[min(900px,92vw)]">
          <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 flex flex-col max-h-[85vh] overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Mon profil</h3>
              <button
                onClick={() => setShowProfile(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Fermer">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg space-y-8">

              {/* Haut : photo + résumé */}
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                <img src="/portrait-lucas.jpg" alt="Photo de Lucas Baquey"
                    className="w-40 h-40 rounded-full object-cover ring-4 ring-violet-200 shadow-md"/>
                <div className="text-gray-800 space-y-4">
                  <p className="text-xl font-bold">
                    Lucas Baquey – Ingénieur développeur freelance (Backend & Systèmes embarqués)
                  </p>
                  <p>
                    Passionné par la convergence entre électronique embarquée et développement back-end,
                    j’accompagne startups, PME industrielles et équipes produit dans la conception de
                    solutions techniques fiables et documentées.
                  </p>
                </div>
              </div>

              {/* Parcours */}
              <div className="space-y-4 text-gray-800">
                <p className="font-semibold text-lg">Parcours & expériences clés</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Fondateur de SYLORIA® (2025)</strong> : micro-agence de consulting tech spécialisée
                      en systèmes embarqués (STM32, ROS2, FreeRTOS), back-end Python (Django, FastAPI) et
                      dès 2026, pôle cybersécurité.</li>
                  <li><strong>3 ans chez Shark Robotics</strong> : développement embarqué sous ROS2 et STM32,
                      création de bancs de tests automatisés, mise en place de pratiques agiles (Scrum Master).</li>
                </ul>
              </div>

              {/* Compétences */}
              <div className="space-y-4 text-gray-800">
                <p className="font-semibold text-lg">Compétences techniques principales</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Backend Python :</strong> Django, FastAPI, PostgreSQL, déploiement sécurisé Linux/VPS.</li>
                  <li><strong>Systèmes embarqués :</strong> Kicad, STM32/ESP32, bus CAN/UART/SPI, drivers capteurs, ROS2, FreeRTOS.</li>
                  <li><strong>Méthodologies :</strong> Agile/Scrum, TDD, documentation et suivi de projet clair.</li>
                </ul>
                <p>
                  Je privilégie les itérations courtes, une communication transparente et une
                  documentation complète, afin de livrer rapidement des solutions robustes et
                  maintenables.
                </p>
                <p>📍 Basé à <strong>Bordeaux</strong>, j’interviens en mode <strong>hybride </strong> 
                  sur des projets en <strong>Nouvelle-Aquitaine</strong> et en <strong>remote</strong> au niveau national.</p>
              </div>

              {/* Liens de contact */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-4 border-t">
                <a href="https://www.linkedin.com/in/lucas-baquey/"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                  <img src="/linkedin_logo.png" alt="" className="w-5 h-5"/> LinkedIn
                </a>

                <a href="https://github.com/lucas33620/"  
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900">
                  <img src="/github_logo.png" alt="" className="w-5 h-5"/> GitHub
                </a>

                <a href="tel:+33625558878"   
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700">
                  <img src="/phone_logo.png" alt="" className="w-5 h-5"/> Téléphone
                </a>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => setShowProfile(false)}
                className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    </section>
  );
}

// ——————————————————————————————————————————
// 🛠️ 4) PROCESS (gradient violet → night, padding + justification)
// ——————————————————————————————————————————
function Process() {
  const steps = [
    { n: '01', t: '1er échange gratuit (30 min)', d: 'Échange avec nous pour comprendre les enjeux métier et valider la faisabilité à haut niveau. Résultat : premières pistes et cadrage initial avant un diagnostic technique approfondi.' },
    { n: '02', t: 'Proposition claire & chiffrée', d: "Plan d’action et devis transparents : livrables, planning et modalités (mission courte, pack, régie). Critères de succès mesurables et hypothèses validées." },
    { n: '03', t: 'Conception & développement', d: "Itérations courtes (Agile). Nous travaillons main dans la main avec vous : revues fréquentes et feedback continu. Documentation au fil de l’eau pour garantir la maintenabilité." },
    { n: '04', t: 'Validation & transfert', d: 'Livraison de code propre, schémas/PCB et API documentée. Session de passation pédagogique (démos, check-lists).' },
    { n: '05', t: 'Suivi & amélioration', d: 'Support à la demande : audits, optimisations, industrialisation, montée en charge, avec des ajustements guidés par le terrain.' },
  ];

  return (
    <section
      id="process"
      className="pt-20 pb-36" // ➜ plus d’espace en bas
      style={{ background: `linear-gradient(180deg, ${brand.main} 0%, ${brand.night} 90%)` }}
    >
      <Container>
        <Reveal className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Notre process</h2>
        </Reveal>

        <ol className="space-y-8">
          {steps.map((s, i) => (
            <Reveal key={i}>
              <li className="grid grid-cols-[88px,1fr] gap-6 items-start">
                <div className="select-none leading-none">
                  <span className="block text-[56px] sm:text-[68px] font-extrabold" style={{ color: brand.coral }}>
                    {s.n}
                  </span>
                </div>

                <div className="text-white/95">
                  <h3 className="text-xl font-bold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm sm:text-base" style={{ textAlign: 'justify' }}>
                    {s.d}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// ——————————————————————————————————————————
// 🧩 5) PORTFOLIO (cartes taille uniforme + modal)
// ——————————————————————————————————————————
function Portfolio() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    if (active) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const projects = useMemo(() => ([
    {
      id: 1,
      title: 'Module Capteur Environnemental (BME280) — PCB 30×30 mm',
      cat: 'Embarqué',
      cover: '/projet_capteur_environnemental/capteur environnemental_coté_filigrame.png',
      description: 'Conception d’un module capteur environnemental I²C : schéma, PCB KiCad, BOM, Gerbers, rendu 3D. Intégration dans une carte principale de surveillance pour serres/agriculture connectée',
      objectives: ['Adressage I2C configurable', 'Alim 5V→3.3V + protections', 'DRC validé et contraintes mécaniques respectées : PCB 30 × 30 mm, 4 fixations M2.'],
      solutions: ['Choix du capteur BME280 pour compacité et précision' , 'implémentation en I²C.', 'Alimentation : LDO 3.3 V + condensateurs de découplage', 'Sérigraphie claire'],
      results: ['Gerbers conformes aux fabricants (JLCPCB / PCBWay) prêts à la fabrication', 'BOM générée automatiquement', 'Rendu 3D prêt'],
      images: ['/projet_capteur_environnemental/capteur environnemental_coté_filigrame.png', '/projet_capteur_environnemental/capteur environnemental_face_filigrame.png'],
    },
    {
      id: 2,
      title: 'Refonte Web multilingue — Alam Raya',
      cat: 'Web',
      cover: '/projet_alam_raya/AlamRaya_website.png',
      description: 'Refonte du site vitrine en plateforme multilingue, responsive et optimisée SEO, orientée conversion.',
      objectives: ['Moderniser et clarifier', 'SEO local + international', 'Formulaire + WhatsApp'],
      solutions: ['Django + Tailwind', 'Traductions dynamiques', 'Leaflet.js pour cartes de projets'],
      results: ['Performance élevée', 'Meilleure visibilité', 'Navigation mobile-first'],
      link: 'https://www.alamrayabali.com/',
    },
    {
    id: 2,
    title: "Contrôleur BLDC 24 V / 6 A avec télémétrie CAN — STM32G431",
    cat: "Embarqué",
    cover: "/projet_bldc_can/bldc_can_cover.png",
    description:
      "Carte de contrôle moteur BLDC triphasé (DRV8313) avec retour courant/puissance (INA228), température NTC et communication CAN (TCAN1051). Microcontrôleur STM32G431, alimentation buck 24 V → 3.3 V. Schéma, PCB KiCad 2 couches, BOM, Gerbers et rendus 3D prêts fabrication.",
    objectives: [
      "Pilotage BLDC 3 phases en PWM (TIM1) jusqu’à 6 A (10 A crête)",
      "Communication CAN 2.0B (500 kbps–1 Mbps) avec télémétrie (I, V, W, °C, status)",
      "Mesure de courant haute précision (INA228) et NTC proche du driver",
      "Connectique industrielle (Molex 431604302) et debug SWD + UART",
      "Contraintes mécaniques 100 × 100 mm, 4 fixations M3"
    ],
    solutions: [
      "MCU STM32G431 (PWM avancé, ADC, CAN natif) + transceiver TCAN1051",
      "Driver BLDC DRV8313 avec découplages VCP/CPH-CPL/VM selon recommandations",
      "Shunt 16 mΩ / 2 W en Kelvin + filtrage, lecture via INA228 en I²C",
      "Alim buck LM61495 24 V → 3.3 V, CBOOT 100 nF, routage boucle chaude minimisée",
      "Protection inversion +24 V par diode Schottky de puissance (série)",
      "Cage de Faraday locale autour du quartz (via-fence + zones GND top/bottom)"
    ],
    results: [
      "Gerbers conformes (JLCPCB) + BOM/CPL prêtes à l’assemblage",
      "DRC/ERC validés, règles de largeur pistes puissance (5 mm @ 6 A)",
      "Rendus 3D haute résolution pour présentations client",
      "Plan de test bring-up : alims, SWD, UART, PWM à vide, CAN, moteur en charge",
      "Profil CAN documenté (IDs, périodicités, échelles) prêt à l’intégration"
    ],
    images: [
      "/projet_bldc_can/bldc_can_cover.png"
    ]
  }

  ]), []);

  const cats = ['Tous', ...Array.from(new Set(projects.map(p => p.cat)))];
  const [filter, setFilter] = useState('Tous');
  const visible = projects.filter(p => filter === 'Tous' || p.cat === filter);

  return (
    <section id="portfolio" className="py-16" style={{ backgroundColor: brand.cloud }}>
      <Container>
        <Reveal className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nos réalisations</h2>
          <p className="mt-3 text-gray-700">Cliquez pour ouvrir la fiche détaillée (objectifs, solutions, résultats, images) ou visiter le site si disponible.</p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="Filtrer par catégorie">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm border ${filter === c ? 'text-white border-transparent' : 'text-gray-900 border-gray-300'}`}
              style={{ backgroundColor: filter === c ? brand.main : 'transparent' }}>
              {c}
            </button>
          ))}
        </div>

        {/* cartes uniformes */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {visible.map((p) => (
            <Reveal key={p.id}>
              <figure className="bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm grid grid-rows-[auto,1fr,auto] min-h-[480px]">
                {/* Media height constant */}
                <div className="aspect-[16/9] bg-gray-100">
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                </div>

                {/* Texte clampé pour garder la même hauteur */}
                <figcaption className="p-4">
                  <h3 className="font-semibold text-gray-900 title--clamp-2">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-700 text--clamp-3">{p.description}</p>
                </figcaption>

                <div className="p-4 pt-0">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer"
                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
                       style={{ backgroundColor: brand.coral }}>
                      Voir le projet
                    </a>
                  ) : (
                    <button onClick={() => setActive(p)}
                            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
                            style={{ backgroundColor: brand.coral }}>
                      Voir le projet
                    </button>
                  )}
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Modale (inchangée) */}
      {active && !active.link && (
        <div role="dialog" aria-modal="true" aria-labelledby="project-title" className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className="relative z-[210] mx-auto my-8 w-[min(1000px,92vw)]">
            <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 flex flex-col max-h-[85vh] overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h3 id="project-title" className="text-xl font-semibold text-gray-900">{active.title}</h3>
                <button onClick={() => setActive(null)} className="rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Fermer" title="Fermer">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 space-y-5">
                    <p className="text-gray-700">{active.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900">Objectifs</h4>
                      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">{active.objectives?.map((li, i) => <li key={i}>{li}</li>)}</ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Solutions techniques</h4>
                      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">{active.solutions?.map((li, i) => <li key={i}>{li}</li>)}</ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Résultats & performances</h4>
                      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">{active.results?.map((li, i) => <li key={i}>{li}</li>)}</ul>
                    </div>
                  </div>
                  <div className="p-6 grid gap-4 content-start bg-gray-50">
                    {active.images?.slice(0,2).map((src, i) => (
                      <div key={i} className="rounded-xl overflow-hidden ring-1 ring-gray-200 bg-white">
                        <img src={src} alt={`${active.title} visuel ${i+1}`} className="w-full h-auto object-cover"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <a href="#contact" className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90" style={{ backgroundColor: brand.coral }}>Discuter de projet similaire</a>
                <button onClick={() => setActive(null)} className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clamp CSS pour uniformiser la hauteur des cartes */}
      <style>{`
        .title--clamp-2 {
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .text--clamp-3 {
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
      `}</style>
    </section>
  );
}


// ——————————————————————————————————————————
// ✨ 6) PHRASE FINALE + CTA
// ——————————————————————————————————————————
function Tagline() {
  return (
    <section id="tagline" className="py-20 text-center" style={{backgroundColor: brand.night}}>
      <Container>
        <Reveal>
          <h3 className="text-3xl sm:text-5xl font-bold text-white">Transformons vos <span className="underline decoration-white/40">visions</span> en <span className="underline decoration-white/40">réalisations concrètes</span>.</h3>
          <p className="mt-4 text-white/85 max-w-3xl mx-auto">Prenons 30 minutes pour comprendre votre contexte, prioriser vos objectifs et définir un premier plan d’action réaliste. Vous repartez avec des prochaines étapes claires.</p>
          <a href="#contact" className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90" style={{backgroundColor: brand.coral}}>Discutons de votre projet</a>
        </Reveal>
      </Container>
    </section>
  )
}
// ——————————————————————————————————————————
// ✉️ 7) CONTACT
// ——————————————————————————————————————————
function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [showPrivacy, setShowPrivacy] = useState(false) 

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = { 
      name: e.target.name.value, 
      email: e.target.email.value, 
      company: e.target.company.value, 
      service: e.target.service.value, 
      other: e.target.other?.value || "" 
    }
    try {
      const res = await fetch(`${window.location.origin}/api/contact`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data) 
      })
      if (!res.ok) { alert('Erreur serveur.'); return }
      setSubmitted(true)
      e.target.reset()
      setTimeout(() => setSubmitted(false), 6000)
      setSelectedService("")
    } catch { 
      alert('Impossible de contacter le serveur.') 
    }
  }

  return (
    <section id="contact" className="py-20" style={{backgroundColor: brand.cloud}}>
      <Container>
        <Reveal className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Être contacté</h2>
          <p className="mt-3 text-gray-700">
            Sélectionnez le sujet qui vous intéresse et laissez-nous vos coordonnées. 
            Nous revenons rapidement vers vous.
          </p>
        </Reveal>

        <Reveal>
          <form
            onSubmit={onSubmit}
            className="mx-auto max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-gray-200"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom</label>
                <input id="name" name="name" required className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Votre nom"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="nom@entreprise.com"/>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-900">Entreprise</label>
                <input id="company" name="company" className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Nom de votre société (optionnel)"/>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-900">Je suis intéressé par :</label>
                <select 
                  id="service" 
                  name="service" 
                  required 
                  className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0"
                  onChange={(e) => setSelectedService(e.target.value)}
                  value={selectedService}
                >
                  <option value="">— Choisissez une option —</option>
                  <option value="Systèmes embarqués">Systèmes embarqués</option>
                  <option value="Web & APIs backend">Web & APIs backend</option>
                  <option value="Informations supplémentaires">Informations supplémentaires</option>
                  <option value="Autre">Autre (à préciser)</option>
                </select>
              </div>
              {selectedService === "Autre" && (
                <div className="sm:col-span-2">
                  <label htmlFor="other" className="block text-sm font-medium text-gray-900">Précisez votre besoin</label>
                  <input id="other" name="other" className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Votre besoin"/>
                </div>
              )}
            </div>

            {/* ✅ Bouton + lien ouvrant la modale */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:opacity-90"
                style={{backgroundColor: brand.coral}}
              >
                Envoyer ma demande
              </button>
              <p className="text-xs text-gray-700">
                En envoyant, vous acceptez notre{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-blue-600 hover:underline"
                >
                  Politique de confidentialité
                </button>.
              </p>
            </div>

            {submitted && (
              <p className="mt-4 text-sm font-medium text-green-700">
                Merci, nous revenons rapidement vers vous.
              </p>
            )}
          </form>
        </Reveal>
        
        {/*Affichage overlay*/}
        {showPrivacy && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[200]">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPrivacy(false)}
            />
            <div className="relative z-[210] mx-auto my-8 w-[min(900px,92vw)]">
              <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 flex flex-col max-h-[85vh] overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Politique de confidentialité – Formulaire de contact
                  </h3>
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="rounded-lg p-2 hover:bg-gray-100"
                    aria-label="Fermer"
                  >
                    ✕
                  </button>
                </div>

                {/* Contenu scrollable */}
                <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-white to-gray-50 space-y-8 text-gray-800">

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Responsable du traitement</h4>
                    <p className="space-y-1">
                      <span className="block"><strong>SYLORIA®</strong> – Société par actions simplifiée</span>
                      <span className="block">SIREN : 989 239 884 — SIRET (siège) : 989 239 884 00012 — TVA : FR08989239884</span>
                      <span className="block">NAF / APE : 6202A — Conseil en systèmes et logiciels informatiques</span>
                      <span className="block">Date de création : 15 juillet 2025</span>
                      <span className="block">Adresse : 585 route de Marsas, 33620 Laruscade, France</span>
                      <span className="block">Email de contact (RGPD & général) : <a href="mailto:contact@syloria.fr" className="text-blue-600 hover:underline">contact@syloria.fr</a></span>
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Données collectées</h4>
                    <p>Lorsque vous remplissez ce formulaire, nous recueillons :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>votre nom,</li>
                      <li>votre adresse email,</li>
                      <li>le nom de votre société (facultatif),</li>
                      <li>le sujet de votre intérêt (ex. « Systèmes embarqués »),</li>
                      <li><strong>le contenu de votre message</strong>,</li>
                      <li><strong>des données techniques</strong> (date/heure, journaux serveur et adresse IP, aux seules fins de sécurité et d’acheminement).</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Finalités et bases légales</h4>
                    <p>Vos données sont traitées afin de :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>répondre à votre demande d’information ou de devis,</li>
                      <li>vous recontacter pour un suivi commercial directement lié à votre demande.</li>
                    </ul>
                    <p>
                      Base légale : <strong>intérêt légitime</strong> (article 6(1)(f) du RGPD). Aucune décision automatisée ni profilage.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Durées de conservation</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Demandes et échanges commerciaux : <strong>2 ans après le dernier contact</strong>.</li>
                      <li>Journaux techniques (logs/IP) : <strong>6 à 12 mois</strong> maximum.</li>
                      <li>Des obligations légales spécifiques peuvent imposer d’autres durées.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Destinataires & sous-traitants</h4>
                    <p className="mb-2">
                      Les informations sont destinées aux équipes internes de <strong>SYLORIA®</strong>. Lorsque cela est nécessaire, nous faisons appel à des prestataires agissant en notre nom.
                    </p>  
                    <p className="mt-2">
                      Des <strong>accords de sous-traitance (DPA)</strong> sont mis en place avec nos prestataires, conformément à l’article 28 du RGPD.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Transferts hors Union européenne</h4>
                    <p>
                      Certains outils (ex. <strong>Notion</strong>) sont fournis par des sociétés établies aux <strong>États-Unis</strong>. Le cas échéant, les transferts sont encadrés par des
                      <strong> Clauses Contractuelles Types (SCC)</strong> et/ou le <strong>Data Privacy Framework</strong>. Vous pouvez obtenir des informations sur ces garanties en nous écrivant.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Vos droits</h4>
                    <p>Conformément au RGPD, vous disposez des droits :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>d’accès,</li>
                      <li>de rectification,</li>
                      <li>d’effacement,</li>
                      <li>de limitation,</li>
                      <li>d’opposition (notamment à la prospection),</li>
                      <li>de portabilité.</li>
                    </ul>
                    <p className="mt-2">
                      Pour exercer vos droits : <a href="mailto:contact@syloria.fr" className="text-blue-600 hover:underline"><strong>contact@syloria.fr</strong></a>.
                      Nous répondons sous <strong>1 mois</strong> (délai prolongeable en cas de complexité).
                    </p>
                    <p>
                      Vous pouvez également adresser une réclamation à la&nbsp;
                      <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CNIL</a>.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Sécurité</h4>
                    <p>
                      Mesures techniques et organisationnelles : chiffrement TLS, contrôle d’accès, sauvegardes, authentification multifacteur, journalisation et durcissement des services.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Statistiques de visite – Google Analytics (mode « cookieless »)</h4>
                    <p>
                      Ce site utilise <strong>Google Analytics 4</strong> en mode <strong>sans cookies</strong> (<em>cookieless</em>) pour produire des statistiques agrégées d’audience.
                      Aucun cookie <code>_ga</code> ni identifiant persistant n’est déposé sur votre appareil.
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Des <strong>données techniques</strong> (ex. informations de navigation, adresse IP tronquée) peuvent être transmises à Google afin de générer des rapports d’audience.</li>
                      <li><strong>Base légale</strong> : intérêt légitime pour la seule mesure d’audience, sans reciblage publicitaire.</li>
                      <li><strong>Transferts</strong> : les données peuvent être traitées aux <strong>États-Unis</strong> (SCC/DPF en place).</li>
                      <li>Vous pouvez <strong>vous opposer</strong> à cette mesure d’audience en nous écrivant à <a href="mailto:contact@syloria.fr" className="text-blue-600 hover:underline">contact@syloria.fr</a>.</li>
                    </ul>
                    <p className="mt-2">
                      Politique de confidentialité de Google :&nbsp;
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        https://policies.google.com/privacy
                      </a>.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-lg mb-2">Sources & mises à jour</h4>
                    <p className="space-y-1">
                      <span className="block">Sources : RCS • INSEE • RNES • HAL (extraits d’identification d’entreprise).</span>
                      <span className="block">Dernière mise à jour : <strong>03/10/2025</strong>.</span>
                    </p>
                  </section>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-end">
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

// ——————————————————————————————————————————
// ✉️ 8) FOOTER
// ——————————————————————————————————————————
function Modal({ title, onClose, children }) {  
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-[200]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[210] mx-auto my-8 w-[min(900px,92vw)]">
        <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 flex flex-col max-h-[85vh] overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 id="modal-title" className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Fermer">✕</button>
          </div>
          <div className="overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Footer({
  brand = { main: "#0f172a", blue: "#3b82f6" }, // fallback safe
}) {
  const [showLegal, setShowLegal] = useState(false);
  return (
    <footer className="py-10" style={{ backgroundColor: brand.main }}>
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white/90">
          {/* Bloc identifiant */}
          <div className="flex items-center gap-3">
            <img src="/logo-syloria.png" alt="SYLORIA®" className="h-8 w-auto" />
            <div>
              <p className="font-semibold text-white">SYLORIA® - marque déposée à l’INPI France</p>
              <p className="text-sm text-white/80">SAS • Gironde, Nouvelle-Aquitaine, France</p>
            </div>
          </div>

          {/* Liens + boutons légaux */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm text-white/80">
            <a href="mailto:contact@syloria.fr" className="hover:text-white">contact@syloria.fr</a>
            <span className="hidden sm:inline">•</span>

            <a
              href="https://www.linkedin.com/company/syloria/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
            <span className="hidden sm:inline">•</span>

            {/* Mentions légales */}
            <button
              type="button"
              onClick={() => setShowLegal(true)}
              className="underline underline-offset-2 hover:text-white"
            >
              Mentions légales
            </button>
            <span className="hidden sm:inline">•</span>

            {/* CGV (à venir) */}
            <button
              type="button"
              onClick={() => setShowCGV(true)}
              className="underline underline-offset-2 hover:text-white"
              aria-describedby="cgv-soon"
            >
              CGV
            </button>

            <span className="hidden sm:inline">•</span>
            <span>© {new Date().getFullYear()} — Tous droits réservés</span>
          </div>
        </div>
      </Container>

        {/* style focus var si besoin */}
      <style>{`:root{--focus:${brand.blue}}`}</style>

      {/* Modale Mentions légales */}
      {showLegal && (
        <Modal title="Mentions légales" onClose={() => setShowLegal(false)}>
          <div className="p-6 space-y-6 text-gray-800">
            <section>
              <p className="text-sm text-gray-600">
                Dernière mise à jour : <strong>03/10/2025</strong>
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Éditeur du site</h4>
              <p className="space-y-1">
                <span className="block"><strong>SYLORIA®</strong> — Société par actions simplifiée</span>
                <span className="block">SIREN : 989 239 884 — SIRET (siège) : 989 239 884 00012 — TVA : FR08989239884</span>
                <span className="block">NAF / APE : 6202A — Conseil en systèmes et logiciels informatiques</span>
                <span className="block">Adresse : 585 route de Marsas, 33620 Laruscade, France</span>
                <span className="block">Date de création : 15 juillet 2025</span>
                <span className="block">
                  Email :{" "}
                  <a href="mailto:contact@syloria.fr" className="text-blue-600 hover:underline">
                    contact@syloria.fr
                  </a>
                </span>
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Directeur de la publication</h4>
              <p>Baquey Lucas — Président de SYLORIA®.</p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Hébergement</h4>
              <p className="space-y-1">
                <span className="block"><strong>Hébergeur :</strong> OVH SAS (OVHcloud)</span>
                <span className="block">Adresse : 2 rue Kellermann, 59100 Roubaix, France</span>
                <span className="block">Téléphone : +33 9 72 10 10 07</span>
                <span className="block">
                  Site :{" "}
                  <a
                    href="https://www.ovhcloud.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    ovhcloud.com
                  </a>
                </span>
                <span className="block">
                  Contact :{" "}
                  <a href="mailto:support@ovhcloud.com" className="text-blue-600 hover:underline">
                    support@ovhcloud.com
                  </a>
                </span>
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Propriété intellectuelle</h4>
              <p>
                Le site et l’ensemble de ses contenus (textes, images, illustrations, logos, marques, codes) sont
                protégés par le droit de la propriété intellectuelle et restent la propriété exclusive de SYLORIA®
                ou de leurs titulaires respectifs. Toute reproduction, représentation, modification ou redistribution,
                totale ou partielle, est interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Responsabilité</h4>
              <p>
                Les informations publiées sur ce site le sont à titre informatif. Malgré nos soins, SYLORIA® ne peut garantir
                l’exactitude, la complétude ou l’actualisation permanente des contenus. Les liens vers des sites tiers sont
                fournis à titre de commodité ; SYLORIA® n’exerce aucun contrôle sur ces sites et décline toute responsabilité
                quant à leurs contenus.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Données personnelles</h4>
              <p>
                Pour nos engagements RGPD (finalités, bases légales, droits, durées), voir la{" "}
                <a href="/politique-de-confidentialite" className="text-blue-600 hover:underline">
                  Politique de confidentialité
                </a>.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Cookies & mesure d’audience</h4>
              <p>
                Le site ne dépose pas de cookies de suivi. Une mesure d’audience sans cookie est opérée via Google
                Analytics 4 en mode “cookieless”, telle que décrite dans la{" "}
                <a href="/politique-de-confidentialite" className="text-blue-600 hover:underline">
                  Politique de confidentialité
                </a>.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Crédits</h4>
              <div className="space-y-2 text-sm">
                <p>© SYLORIA® — sauf mention contraire.</p>
                <p>Icônes / logos de la page : ressources gratuites (licence Flaticon / Freepik) :  </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <a
                      href="https://www.flaticon.com/fr/icones-gratuites/la-cyber-securite"
                      title="la cyber-sécurité icônes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      La cyber-sécurité — icônes créées par Freepik — Flaticon
                    </a>
                  </li>
                  <li>
                    Agile_logo : auteur <strong>katemangostar</strong> / Freepik
                  </li>
                  <li>
                    Electronic_logo : auteur <strong>macrovector</strong> / Freepik
                  </li>
                  <li>
                    Web_logo : auteur <strong>Freepik</strong> (libre / Freepik)
                  </li>
                  <li>
                    <a
                      href="https://www.flaticon.com/fr/icones-gratuites/telephone"
                      title="téléphone icônes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Téléphone — icônes créées par Freepik — Flaticon
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.flaticon.com/fr/icones-gratuites/github"
                      title="github icônes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub — icônes créées par Freepik — Flaticon
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.flaticon.com/fr/icones-gratuites/linkedin"
                      title="linkedin icônes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn — icônes créées par Freepik — Flaticon
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Signalement de contenu illicite</h4>
              <p>
                Pour signaler un contenu manifestement illicite, écrivez à{" "}
                <a href="mailto:contact@syloria.fr" className="text-blue-600 hover:underline">
                  contact@syloria.fr
                </a>{" "}
                en précisant l’URL et la nature du contenu.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Droit applicable</h4>
              <p>
                Les présentes mentions légales sont régies par le droit français. À défaut de résolution amiable, les tribunaux
                compétents du ressort du siège de SYLORIA® seront seuls compétents.
              </p>
            </section>
          </div>
        </Modal>
      )}
    </footer>
  );
}


export default function App() {
  return (
    <div className="font-sans antialiased text-gray-900">
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Audience />
        <About />
        <Process />
        <Portfolio />
        <Tagline />
        <Contact />
      </main>
      <Footer brand={brand} />
    </div>
  );
}
