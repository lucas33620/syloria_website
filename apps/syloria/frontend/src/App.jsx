/*
  Syloria – Landing Page (Maquette v2.1)
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
    { id: 'audience',  label: 'Pour qui ?' },
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
          <span className="text-lg font-semibold">Syloria</span>
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
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug tracking-wide">− SYLORIA −</h1>
            <p className="mt-2 text-xs tracking-widest uppercase font-semibold text-white/80">
              Systèmes embarqués • Web/API • Cybersécurité/IT
            </p>
          </div>

          {/* Titre + pitch + CTA */}
          <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Micro-agence tech qui transforme vos idées en solutions fiables
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-white/90 text-lg">
            De l’idée à la mise en production, nous accompagnons PME, startups et industriels avec une approche claire,
            humaine et documentée. Objectif : livrer vite, proprement, et durablement.
          </p>
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
      t: 'Entrepreneur',
      d: (
        <>Passez de l’idée au prototype fonctionnel avec des outils clairs et adaptés à vos moyens : mini-site, formulaire, MVP API.</>
      ),
      bullets: [
        <strong key="1">Création de MVP (API, formulaire, mini-site)</strong>,
        <strong key="2">Bonnes pratiques cyber (backup, auth)</strong>,
        <strong key="3">Conseils & support technique</strong>,
      ],
    },
    {
      t: 'Startup',
      d: (
        <>Vous avez une idée, une équipe réduite et besoin d’un socle technique solide pour avancer sans dette ?</>
      ),
      bullets: [
        <strong key="1">MVP techniques clés en main (API, backend)</strong>,
        <strong key="2">Embarqués & edge-ready (STM32, ROS2)</strong>,
        <strong key="3">IoT : device → data → dashboard</strong>,
      ],
    },
    {
      t: 'TPE-PME industrielle',
      d: (
        <>Nous modernisons vos produits et valorisons vos données terrain en respectant vos contraintes.</>
      ),
      bullets: [
        <strong key="1">Firmware embarqué (STM32, ROS2, drivers)</strong>,
        <strong key="2">Dashboards & bancs de tests (Python, Qt)</strong>,
        <strong key="3">Projets IoT industriels (capteurs, supervision)</strong>,
        <strong key="4">Accompagnement agile & reporting</strong>,
      ],
    },
    {
      t: 'Responsable produit',
      d: (
        <>Nous transformons votre vision en livrables techniques clairs, documentés et déployables.</>
      ),
      bullets: [
        <strong key="1">Alignement besoin ↔ technique</strong>,
        <strong key="2">APIs robustes (FastAPI/Django + Swagger)</strong>,
        <strong key="3">Suivi de sprint, priorisation</strong>,
        <strong key="4">Intégration CI/CD (GitLab/GitHub)</strong>,
      ],
    },
  ]

  return (
    <section id="audience" className="py-16" style={{backgroundColor: brand.cloud}}>
      <Container>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Pour qui ?</h2>
          <p className="mt-3 text-gray-700">Entrepreneurs, startups, TPE‑PME industrielles, responsables produit : nous adaptons notre accompagnement à votre contexte, pour livrer vite et bien.</p>
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
    { t: 'Systèmes embarqués', img: '/Electronic_logo.png', details: 'STM32, ROS2, FreeRTOS, drivers capteurs, bus CAN/UART/SPI, conception PCB (KiCad), intégration capteurs/actuateurs.' },
    { t: 'Web & APIs backend', img: '/Web_logo.png',        details: 'APIs sécurisées (FastAPI/Django), Swagger/OpenAPI, authentification, CI/CD légère, observabilité et métriques.' },
    { t: 'Cybersécurité / IT', img: '/Cyber_logo.png',      details: 'Audits de code, durcissement, bonnes pratiques OWASP/ANSSI, tests automatisés, qualité logicielle, revue d’architecture.' },
    { t: 'Agilité & formation',img: '/Agile_logo.png',      details: 'Kick-off, cadrage backlog, facilitation de sprints, KPI, ateliers de formation (clean code, Git, CI/CD, sécurité applicative).' },
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
                Une micro-agence réactive, documentée et pédagogique
              </h2>
              <p className="mt-4 text-white/90" style={{ textAlign: 'justify' }}>
                Fondée par Lucas Baquey (Ingénieur Mines Saint-Étienne), Syloria est une micro-agence Freelance basée en Nouvelle-Aquitaine.
                Nous sommes 2 indépendants complémentaires (embarqué & cybersécurité/IT) qui livrent des résultats concrets sans lourdeur de structure.
              </p>
              <p className="mt-4 text-white/90" style={{ textAlign: 'justify' }}>
                Notre promesse : des livrables propres, documentés et transmis avec pédagogie (pas de boîte noire).
                Itérations courtes et transparence sur les risques, coûts et délais.
              </p>
              <button
                onClick={() => setShowProfile(true)}
                className="mt-6 inline-flex rounded-xl px-6 py-3 font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: brand.coral }}>
                Découvrir mon profil
              </button>
            </div>
          </Reveal>


          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <Reveal key={i}>
                {/* Conteneur flip */}
                <div className={`flip-card ${flipped[i] ? 'is-flipped' : ''}`} style={{ height: 260 }}>
                  <div className="flip-card-inner">
                    {/* Face avant */}
                    <div className="flip-card-front">
                      <div className="mb-3 flex items-center justify-center">
                      <img
                        src={s.img}
                        alt=""
                        className="w-[120px] h-[120px] object-contain"
                        style={{ minWidth: '120px', minHeight: '120px' }}
                      />
                    </div>
                      <h3 className="font-semibold text-gray-900 text-center">{s.t}</h3>
                      <button
                        onClick={() => toggle(i)}
                        className="mt-3 text-sm font-medium text-white px-3 py-2 rounded-lg"
                        style={{ backgroundColor: brand.violet }}
                      >
                        Plus de détails
                      </button>
                    </div>

                    {/* Face arrière */}
                    <div className="flip-card-back">
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
                  <li><strong>Fondateur de Syloria (2025)</strong> : micro-agence de consulting tech spécialisée
                      en systèmes embarqués (STM32, ROS2, FreeRTOS), back-end Python (Django, FastAPI) et,
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
                <p>📍 Basé à <strong>Bordeaux</strong>, j’interviens en <strong>remote</strong> ou en mode hybride
                  sur des projets nationaux.</p>
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
    { n: '01', t: 'Diagnostic gratuit (30 min)', d: 'Échange avec Lucas pour évaluer la faisabilité, comprendre les enjeux métier et définir une vision produit claire. Résultat : cadrage initial et premiers risques identifiés.' },
    { n: '02', t: 'Proposition claire & chiffrée', d: 'Devis transparent avec livrables, planning et modalités (mission courte, pack, régie). Critères de succès mesurables et hypothèses validées.' },
    { n: '03', t: 'Conception & développement', d: 'Itérations courtes (Agile), TDD quand pertinent, revues fréquentes. Documentation au fil de l’eau pour garantir la maintenabilité.' },
    { n: '04', t: 'Validation & transfert', d: 'Livraison de code propre, schémas/PCB, API documentée. Session de passation pédagogique (démos, check-lists).' },
    { n: '05', t: 'Suivi & amélioration', d: 'Support à la demande : audits, optimisations, industrialisation, montée en charge. Ajustements guidés par le terrain.' },
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
      description: 'Conception d’un module capteur environnemental I2C : schéma, PCB KiCad, BOM, Gerbers, rendu 3D.',
      objectives: ['Adressage I2C configurable', 'Alim 5V→3.3V + protections', 'DRC validé, 4 fixations M2'],
      solutions: ['Choix BME280, routage optimisé', 'LDO + protection', 'Sérigraphie claire et connectique simple'],
      results: ['Gerbers conformes JLC/PCBWay', 'BOM auto', 'Rendu 3D prêt client'],
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
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = { name: e.target.name.value, email: e.target.email.value, company: e.target.company.value, message: e.target.message.value }
    try {
      const res = await fetch(`${window.location.origin}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) { alert('Erreur serveur.'); return }
      setSubmitted(true); e.target.reset(); setTimeout(() => setSubmitted(false), 6000)
    } catch { alert('Impossible de contacter le serveur.') }
  }

  return (
    <section id="contact" className="py-20" style={{backgroundColor: brand.cloud}}>
      <Container>
        <Reveal className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact</h2>
          <p className="mt-3 text-gray-700">Racontez‑nous votre contexte et vos objectifs. Nous revenons rapidement avec une première proposition d’accompagnement.</p>
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} className="mx-auto max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-gray-200">
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">Message</label>
                <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Décrivez votre projet (objectifs, délais, contraintes)…"/>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:opacity-90" style={{backgroundColor: brand.coral}}>Envoyer ma demande</button>
              <p className="text-xs text-gray-700">En envoyant, vous acceptez notre mention RGPD.</p>
            </div>
            {submitted && <p className="mt-4 text-sm font-medium text-green-700">Merci, nous revenons rapidement vers vous.</p>}
          </form>
        </Reveal>
      </Container>
    </section>
  )
}

// ——————————————————————————————————————————
// 🦶 FOOTER
// ——————————————————————————————————————————
function Footer() {
  return (
    <footer className="py-10" style={{backgroundColor: brand.main}}>
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white/90">
          <div className="flex items-center gap-3">
            <img src="/logo-syloria.png" alt="Syloria" className="h-8 w-auto"/>
            <div>
              <p className="font-semibold text-white">Syloria</p>
              <p className="text-sm text-white/80">SAS • Gironde, Nouvelle‑Aquitaine, France</p>
            </div>
          </div>
          <div className="text-sm text-white/85">
            <a href="mailto:contact@syloria.eu" className="hover:text-white">contact@syloria.eu</a>
            <span className="mx-2">•</span>
            <a href="https://www.linkedin.com/company/syloria/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <span className="mx-2">•</span>
            <span>© {new Date().getFullYear()} — Tous droits réservés</span>
          </div>
        </div>
      </Container>
      <style>{`:root{--focus:${brand.blue}}`}</style>
    </footer>
  )
}

// ——————————————————————————————————————————
// APP ROOT
// ——————————————————————————————————————————
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
      <Footer />
    </div>
  )
}
