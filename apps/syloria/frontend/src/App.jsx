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
    - /public/portrait-lucas.png
    - /public/service-embedded.png
    - /public/service-webapi.png
    - /public/service-cyber.png
    - /public/service-agile.png
    - /public/portfolio/*
*/

import { useEffect, useMemo, useState, useRef } from 'react'
import ArticlesSection from "./ArticlesSection";
import Container from "./Container";
import { brand } from "./brand";


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
    { id: 'audience',  label: 'Profils de clients' },
    { id: 'about',     label: 'À propos' },
    { id: 'process',   label: 'Méthode' },
    { id: 'portfolio', label: 'Réalisations' },
    { id: 'ArticlesSection', label: 'Articles' },
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
              Systèmes embarqués • API • Sécurité
            </p>
          </div>

          {/* Titre + pitch + CTA */}
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Du concept à la mise en production : <br />
            on construit pas à pas votre solution
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
      t: '⚙️ PME / ETI industrielles',
      d: (
        <>
          Vous développez des équipements avec électronique embarquée et cherchez 
          un renfort pour structurer cartes et firmwares en vue de l’industrialisation.
        </>
      ),
      bullets: [
        <strong key="1">
          Conception / refonte de cartes & firmwares STM32 orientés production
          (CEM, tests, maintenance long terme)
        </strong>,
        <strong key="2">
          Architectures temps réel structurées (FreeRTOS, ROS2) avec
          documentation claire pour vos équipes internes
        </strong>,
        <strong key="3">
          Chaîne complète quand pertinent : firmware embarqué → API →
          dashboard de supervision
        </strong>,
      ],
    },
    {
      t: '🤝 ESN & agences tech',
      d: (
        <>
          Vous devez livrer des projets embarqués / industriels pour vos
          clients et il vous manque une expertise STM32 / ROS2 ciblée.
        </>
      ),
      bullets: [
        <strong key="1">
          Prise en charge d’un sous-système embarqué (drivers bas niveau, BMS,
          brique ROS2 et migrations, module API)
        </strong>,
        <strong key="2">
          Intégration fluide dans vos équipes : Git, revues de code, CI,
          tickets, rituels agiles
        </strong>,
        <strong key="3">
          Livrables propres et transférables : code testé, documentation,
          handover clair vers vos équipes ou votre client final
        </strong>,
      ],
    },
    {
      t: '🏭 Startups / scale-up industrielles & robotiques',
      d: (
        <>
          Votre prototype fonctionne en labo et vous devez le transformer en
          version industrialisable, fiable et maintenable.
        </>
      ),
      bullets: [
        <strong key="1">
          Passage du POC au produit : structuration du firmware
          (drivers&nbsp;/ logique métier&nbsp;/ configuration)
        </strong>,
        <strong key="2">
          Renforcement de la robustesse terrain : watchdog, logs, modes dégradés / safety, stratégie de tests.
        </strong>,
        <strong key="3">
          Support à l’industrialisation : bancs de test simples, outils de
          validation et de diagnostic pour la production
        </strong>,
      ],
    },
    {
      t: '🎓 Centres de formation & écoles d’ingénieurs',
      d: (
        <>
          Vous cherchez un intervenant externe pour des modules très concrets
          en systèmes embarqués, proches des attentes de l’industrie.
        </>
      ),
      bullets: [
        <strong key="1">
          Formations & TD orientés industrie : STM32, FreeRTOS, ROS2, bonnes
          pratiques CEM...
        </strong>,
        <strong key="2">
          TP et projets fil rouge sur cartes d’évaluation (Nucleo, etc.)
          autour de cas industriels réalistes
        </strong>,
        <strong key="3">
          Encadrement de projets : du cahier des charges au
          prototype fonctionnel et testé
        </strong>,
      ],
    },
  ];

  return (
    <section id="audience" className="py-16" style={{backgroundColor: brand.cloud}}>
      <Container>
        <Reveal className="text-center mb-10 max-w-3xl mx-auto">

          {/* Barre décorative */}
          <div
            className="h-1.5 w-24 mx-auto rounded-full mb-8"
            style={{ backgroundColor: brand.deep }}
          />

          {/* Titre */}
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center">
            Profils de clients
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Je travaille en direct avec des entrepreneurs, des startups et des équipes techniques industrielles, en adaptant mon accompagnement à votre contexte et à vos contraintes opérationnelles.
          </p>

          {/* Timeline */}
          <ol className="mt-16 space-y-12 max-w-4xl mx-auto">
            {/* tes items… */}
          </ol>

        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          {items.map((it, i) => (
            <Reveal key={i}>
              <article className="bg-white rounded-2xl p-6 shadow ring-1 ring-gray-200 flex flex-col h-full">
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
// 🔥 1) ZONE TAMPON (transition Clients → About)
// ——————————————————————————————————————————
function AboutTransition() {
  return (
    <div
      style={{
        height: "120px",
        background: `linear-gradient(
          to bottom,
          ${brand.cloud} 0%,
          ${brand.deep} 100%
        )`
      }}
    />
  );
}

// —————————————————————————————————————————— 
// 🧭 3) ABOUT — Version Premium Clean (texte blanc lisible)
// ——————————————————————————————————————————
function About() {
  const [showProfile, setShowProfile] = useState(false);

  const services = [
    { 
      title: "Systèmes embarqués",
      icon: "/Electronic_logo.png",
      desc: "STM32, ROS2, FreeRTOS, drivers capteurs, protocoles CAN/UART/SPI, conception PCB KiCad, validations, tests et intégration industrielle."
    },
    { 
      title: "APIs backend",
      icon: "/Web_logo.png",
      desc: "APIs sécurisées (FastAPI/Django), authentification, base de données, CI/CD, observabilité, monitoring, déploiement Linux optimisé."
    }
  ];

  return (
    <section
      id="about"
      className="py-24"
      style={{ backgroundColor: brand.deep }}
    >
      <Container>

        {/* ———————— 1) HEADER ———————— */}
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Photo + infos rapides */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <img
                src="/portrait-lucas.png"
                alt="Lucas Baquey"
                className="w-44 h-44 rounded-2xl object-cover shadow-lg ring-1 ring-white/30"
              />

              <h3 className="text-2xl font-bold text-white mt-5">
                Lucas Baquey
              </h3>
              <p className="text-white/80">Ingénieur freelance — Embarqué & APIs</p>

              <button
                onClick={() => setShowProfile(true)}
                className="mt-6 inline-flex rounded-xl px-6 py-3 font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: brand.coral }}
              >
                Découvrir mon profil
              </button>
            </div>

            {/* Texte principal */}
             <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Votre spécialiste embarqué & APIs
              </h2>

              <p className="mt-5 text-white/85 text-justify leading-relaxed">
                J’exerce sous ma structure <strong>SYLORIA®</strong>, dédiée au développement embarqué 
                (STM32, ROS2), au firmware bas niveau et aux APIs backend exploitant les données terrain.
                Mon approche est simple&nbsp;: expertise maîtrisée, communication directe et livrables 
                opérationnels. Je conçois des modules fiables et maintenables avec avec des tests, des bonnes pratiques 
                et une transparence à chaque étape.
                <br /><br />
                Mon objectif&nbsp;: <strong>réduire vos risques</strong>, 
                <strong> accélérer votre mise en production </strong> 
                <strong>et garantir un transfert clair, soutenu par des revues régulières.</strong>
              </p>
            </div>
          </div>
        </Reveal>


        {/* ———————— 2) SERVICES (cartes premium) ———————— */}
        <Reveal>
          <div className="mt-16 grid sm:grid-cols-2 gap-8">

            {services.map((s, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-white/10 hover:shadow-md transition"
              >
                <img
                  src={s.icon}
                  alt=""
                  className="w-24 h-24 object-contain mx-auto sm:mx-0"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center sm:text-left">
                  {s.title}
                </h3>
                <p className="mt-2 text-gray-700 text-sm text-center sm:text-left leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}

          </div>
        </Reveal>

      </Container>

      {/* ———————— MODALE PROFIL ———————— */}
      {showProfile && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProfile(false)}
          />
          <div className="relative z-[210] mx-auto my-8 w-[min(900px,92vw)]">
            <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 max-h-[85vh] overflow-hidden flex flex-col">

              <div className="px-6 py-4 border-b flex justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Mon profil</h3>
                <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 text-gray-800 space-y-8 leading-relaxed">
                {/* Ton contenu exact conservé */}
                {/* Haut : photo + résumé */}
                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                  <img
                    src="/portrait-lucas.png"
                    alt="Photo de Lucas Baquey"
                    className="w-40 h-40 rounded-full object-cover ring-4 ring-violet-200 shadow-md"
                  />

                  <div className="text-gray-800 space-y-4">
                    <p className="text-xl font-bold">
                      Lucas Baquey – Ingénieur développeur freelance (Systèmes embarqués & APIs)
                    </p>
                    <p>
                      Passionné par la convergence entre électronique embarquée et développement back-end, j’accompagne
                      startups, PME industrielles et équipes produit dans la conception de solutions techniques fiables
                      et documentées.
                    </p>
                  </div>
                </div>

                {/* Parcours */}
                <div className="space-y-4 text-gray-800">
                  <p className="font-semibold text-lg">Parcours & expériences clés</p>

                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Fondateur de SYLORIA® (2025)</strong> : structure de consulting tech spécialisée en systèmes
                      embarqués (STM32, ROS2, FreeRTOS), back-end Python (Django, FastAPI).
                    </li>
                    <li>
                      <strong>3 ans chez Shark Robotics</strong> : développement embarqué sous ROS2 et STM32 (BMS), création de
                      bancs de tests automatisés, mise en place de pratiques agiles (Scrum Master).
                    </li>
                  </ul>
                </div>

                {/* Compétences */}
                <div className="space-y-4 text-gray-800">
                  <p className="font-semibold text-lg">Compétences techniques principales</p>

                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Backend Python :</strong> Django, FastAPI, PostgreSQL, déploiement sécurisé Linux/VPS.
                    </li>
                    <li>
                      <strong>Systèmes embarqués :</strong> Kicad, STM32/ESP32, bus CAN/UART/SPI, drivers capteurs, ROS2, FreeRTOS.
                    </li>
                    <li>
                      <strong>Méthodologies :</strong> Agile/Scrum, TDD, documentation et suivi de projet clair.
                    </li>
                  </ul>

                  <p>
                    Je privilégie les itérations courtes, une communication transparente et une documentation complète, afin de
                    livrer rapidement des solutions robustes et maintenables.
                  </p>

                  <p>
                    📍 Basé à <strong>Bordeaux</strong>, j’interviens en mode <strong>hybride</strong> sur des projets en
                    <strong> Nouvelle-Aquitaine</strong> et en <strong>remote</strong> au niveau national.
                  </p>
                </div>

                {/* Liens de contact */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-4 border-t">
                  <a
                    href="https://www.linkedin.com/in/lucas-baquey/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                  >
                    <img src="/linkedin_logo.png" alt="" className="w-5 h-5" />
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/lucas33620/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900"
                  >
                    <img src="/github_logo.png" alt="" className="w-5 h-5" />
                    GitHub
                  </a>

                  <a
                    href="tel:+33625558878"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                  >
                    <img src="/phone_logo.png" alt="" className="w-5 h-5" />
                    Téléphone
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// ——————————————————————————————————————————
// 🛠️ 4) PROCESS — Version Premium
// ——————————————————————————————————————————
function Process() {
  const steps = [
    {
      title: "1er échange gratuit (30 min)",
      desc: "On clarifie vos enjeux, le contexte technique et la faisabilité. À l’issue : premières pistes, risques identifiés, cadrage macro."
    },
    {
      title: "Proposition claire & chiffrée",
      desc: "Plan d’action, livrables, planning, modalités (mission courte, pack, régie). Critères de succès mesurables et hypothèses validées."
    },
    {
      title: "Conception & développement",
      desc: "Itérations courtes. Avancement transparent, revues fréquentes, documentation continue pour assurer la maintenabilité."
    },
    {
      title: "Validation & transfert",
      desc: "Code propre, schémas/PCB et API documentée. Sessions de passation pédagogique, check-lists, démonstrations."
    },
    {
      title: "Suivi & amélioration",
      desc: "Support post-livraison : optimisations, industrialisation, montée en charge, ajustements selon vos retours terrain."
    }
  ];

  return (
    <section
      id="process"
      className="py-28 relative"
      style={{
        background: `linear-gradient(180deg, ${brand.deep} 0%, ${brand.night} 100%)`
      }}
    >

      <Container>

        {/* Titre + barre premium */}
        <Reveal className="max-w-4xl mx-auto">

          {/* Barre décorative */}
          <div
            className="h-1.5 w-24 mx-auto rounded-full mb-8"
            style={{ backgroundColor: brand.coral }}
          />

          {/* Titre */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">
            Mon process
          </h2>

          {/* Timeline */}
          <ol className="mt-16 space-y-12 max-w-4xl mx-auto">
            {/* tes items… */}
          </ol>

        </Reveal>

        {/* Steps premium */}
        <ol className="relative border-l border-white/10 ml-6 space-y-10">

          {steps.map((s, i) => (
            <Reveal key={i}>
              <li className="relative pl-10">

                {/* Point coral premium */}
                <span
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: brand.coral,
                    left: "-7px",
                    top: "6px",
                  }}
                />

                {/* Texte */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                  {s.title}
                </h3>

                <p className="mt-2 text-white/80 text-sm sm:text-base leading-relaxed">
                  {s.desc}
                </p>
              </li>
            </Reveal>
          ))}

        </ol>

      </Container>
    </section>
  );
}


// ——————————————————————————————————————————
// 🧩 5) PORTFOLIO — Engineering Showcase Premium
// ——————————————————————————————————————————
function Portfolio() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Smart Cold-Chain Node (SCN) — Nœud de surveillance chaîne du froid",
        cat: "Embarqué",
        client: "INTERNE",
        cover: "/projet_scn/smart_cold_chain_node_cover.jpg",
        description:
          "Nœud IoT industriel pour surveiller la chaîne du froid (température, humidité, porte, tension) avec journalisation FRAM SPI, communication CAN et simulation FreeRTOS sous Keil.",
        objectives: [
          "Acquisition périodique T°, HR, tension et contact porte (1 Hz)",
          "Journalisation robuste sur FRAM SPI avec ring buffer RAM et CRC",
          "Communication CAN (250 kbps) et UART CLI pour maintenance",
          "Gestion d’alarmes (buzzer, LED, relais) et modes RUN/DEGRADED/SAFE",
          "Simulation logicielle complète sous Keil µVision (drivers mock, Event Recorder)",
        ],
        solutions: [
          "Architecture multitâche sous FreeRTOS (tasks, queues, timers, watchdog)",
          "MCU STM32F429ZI + capteur T/H I²C (SHT31/HDC1080) + FRAM SPI (MB85RS256B)",
          "Implémentation CAN propriétaire léger (frames télémétrie, alarmes, config)",
          "CLI UART 115200 bauds : commandes de diagnostic et configuration persistante",
          "Builds distincts SIM/HW (Keil + CubeIDE) avec CI GitHub et tests unitaires Ceedling",
        ],
        results: [
          "Système validé en simulation et sur Nucleo-F429ZI",
          "Journal FRAM persistant et vérifié après coupure / watchdog reset",
          "Trames CAN et UART stables sur 24 h (jitter <10 ms)",
          "CI GitHub : build, unit tests, analyse statique et documentation Doxygen automatisés",
          "Release v1.0 avec code source MIT, README, schémas, captures et artefacts (.elf/.hex)",
        ],
        images: ["/projet_scn/smart_cold_chain_node_cover.jpg"],
        link: "https://github.com/lucas33620/Smart-Cold-Chain-Node",
      },

      {
        id: 2,
        title: "Refonte Web multilingue ",
        cat: "Web",
        client: "ALAM RAYA BALI",
        cover: "/projet_alam_raya/AlamRaya_website.png",
        description:
          "Refonte du site vitrine en plateforme multilingue, responsive et optimisée SEO, orientée conversion.",
        objectives: [
          "Moderniser l’image et clarifier l’offre",
          "Optimiser le SEO local + international",
          "Simplifier la prise de contact (formulaire + WhatsApp)",
        ],
        solutions: [
          "Stack Django + Tailwind CSS avec templates réutilisables",
          "Traductions dynamiques et gestion des langues propre",
          "Intégration Leaflet.js pour les cartes de projets",
        ],
        results: [
          "Performance élevée (Core Web Vitals)",
          "Meilleure visibilité sur les requêtes ciblées",
          "Navigation mobile-first adaptée aux visiteurs internationaux",
        ],
        link: "https://www.alamrayabali.com/",
      },
      {
        id: 3,
        title:
          "Contrôleur BLDC 24 V / 6 A avec télémétrie CAN — STM32G431",
        cat: "Embarqué",
        client: "INTERNE",
        cover: "/projet_bldc_can/Schema_BLDC.png",
        description:
          "Carte de contrôle moteur BLDC triphasé (DRV8313) avec télémétrie CAN, mesure de courant INA228, NTC et contraintes mécaniques industrielles.",
        objectives: [
          "Pilotage BLDC 3 phases en PWM (TIM1) jusqu’à 6 A (10 A crête)",
          "CAN 2.0B (500 kbps–1 Mbps) avec télémétrie (I, V, W, °C, status)",
          "Mesure de courant haute précision via shunt 16 mΩ + INA228",
          "Connectique industrielle et debug SWD + UART",
          "Contraintes mécaniques 100 × 100 mm, 4 fixations M3",
        ],
        solutions: [
          "MCU STM32G431 (PWM avancé, ADC, CAN natif) + transceiver TCAN1051",
          "Driver BLDC DRV8313 avec découplages et routage conforme datasheet",
          "Shunt 16 mΩ / 2 W en Kelvin + filtrage pour INA228 en I²C",
          "Alim buck LM61495 24 V → 3.3 V, minimisation des boucles chaudes",
          "Protection inversion +24 V par diode Schottky de puissance",
          "Cage de Faraday locale autour du quartz (via-fence, zones GND top/bottom)",
        ],
        results: [
          "Gerbers conformes (JLCPCB) + BOM/CPL prêts à l’assemblage",
          "DRC/ERC validés, règles de largeur de pistes puissance respectées",
          "Rendus 3D haute résolution pour support client",
          "Plan de bring-up : alims, SWD, UART, PWM, CAN, essais en charge",
          "Profil CAN documenté (IDs, périodicités, échelles) prêt pour intégration",
        ],
        images: ["/projet_bldc_can/Schema_BLDC.png"],
      },
      {
        id: 4,
        title: "Module Capteur Environnemental (BME280) — PCB 30×30 mm",
        cat: "Embarqué",
        client: "INTERNE",
        cover:
          "/projet_capteur_environnemental/capteur environnemental_coté_filigrame.png",
        description:
          "Module capteur environnemental I²C compact (BME280), pensé pour une intégration en carte principale dans un contexte agriculture connectée / serres.",
        objectives: [
          "Adressage I²C configurable",
          "Alimentation 5 V → 3.3 V + protections",
          "Contraintes mécaniques 30 × 30 mm, 4 fixations M2",
        ],
        solutions: [
          "Choix du capteur BME280 pour compacité/précision",
          "Alimentation LDO 3.3 V + découplages proches du capteur",
          "Implémentation I²C avec possibilité de chaînage sur bus",
          "Sérigraphie claire (repères, broches, direction du flux d’air)",
        ],
        results: [
          "Gerbers conformes JLCPCB / PCBWay",
          "BOM générée automatiquement",
          "Rendus 3D prêts pour documentation client",
        ],
        images: [
          "/projet_capteur_environnemental/capteur environnemental_coté_filigrame.png",
          "/projet_capteur_environnemental/capteur environnemental_face_filigrame.png",
        ],
      },
    ],
    []
  );

  const cats = ["Tous", ...Array.from(new Set(projects.map((p) => p.cat)))];
  const [filter, setFilter] = useState("Tous");
  const visible = projects.filter(
    (p) => filter === "Tous" || p.cat === filter
  );

  return (
    <section
      id="portfolio"
      className="py-28 relative"
      style={{ backgroundColor: brand.cloud }}
    >
      <Container>
        {/* Barre premium + titre */}
        <Reveal className="text-center mb-10 max-w-3xl mx-auto">
          <div
            className="h-1.5 w-24 mx-auto rounded-full mb-8"
            style={{ backgroundColor: brand.main }}
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Mon portfolio technique
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Une sélection de projets embarqués, électroniques et web.  
            Cliquez sur un projet pour explorer les objectifs, l’architecture
            et les résultats obtenus.
          </p>
        </Reveal>

        {/* Filtres premium */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-10"
          role="tablist"
          aria-label="Filtrer par catégorie"
        >
          {cats.map((c) => {
            const isActive = filter === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(c)}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium border transition",
                  isActive
                    ? "text-white border-transparent shadow-sm"
                    : "text-gray-800 border-gray-300 bg-white/70 hover:bg-white",
                ].join(" ")}
                style={{
                  backgroundColor: isActive ? brand.main : undefined,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Cartes grand format */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
          {visible.map((p) => (
            <Reveal key={p.id}>
              <figure className="bg-white rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition flex flex-col min-h-[520px]">

              {/* IMAGE FIXE */}
              <div className="w-full h-[220px] bg-gray-100 overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* TEXTE FIXE */}
              <div className="p-5 flex flex-col flex-grow">

                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{
                    backgroundColor: `${brand.main}15`,
                    color: brand.main,
                  }}
                >
                  {p.cat}
                </span>
                
                {/* Badge client */}
                <h3 className="font-semibold text-gray-900 title--clamp-2">
                  {p.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Client : <span className="text-gray-900 font-semibold">{p.client}</span>
                </p>


                <p className="mt-2 text-sm text-gray-700 text--clamp-3">
                  {p.description}
                </p>

                {/* BOUTON MAINTENU EN BAS */}
                <div className="mt-auto pt-4">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition"
                      style={{ backgroundColor: brand.coral }}
                    >
                      Voir le projet
                    </a>
                  ) : (
                    <button
                      onClick={() => setActive(p)}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition"
                      style={{ backgroundColor: brand.coral }}
                    >
                      Voir le projet
                    </button>
                  )}
                </div>

              </div>

            </figure>

            </Reveal>
          ))}
        </div>
      </Container>

      {/* Modale (léger polish, même logique) */}
      {active && !active.link && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          className="fixed inset-0 z-[200]"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
          <div className="relative z-[210] mx-auto my-8 w-[min(1000px,92vw)]">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl ring-1 ring-black/10 flex flex-col max-h-[85vh] overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h3
                  id="project-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  {active.title}
                </h3>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Fermer"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 space-y-5">
                    <p className="text-gray-700">{active.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Objectifs
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                        {active.objectives?.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Solutions techniques
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                        {active.solutions?.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Résultats & performances
                      </h4>
                      <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                        {active.results?.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6 grid gap-4 content-start bg-gray-50">
                    {active.images?.slice(0, 3).map((src, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden ring-1 ring-gray-200 bg-white"
                      >
                        <img
                          src={src}
                          alt={`${active.title} visuel ${i + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition"
                  style={{ backgroundColor: brand.coral }}
                >
                  Discuter de projet similaire
                </a>
                <button
                  onClick={() => setActive(null)}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200"
                >
                  Fermer
                </button>
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



function Tagline() {
  return (
    <section 
      id="tagline" 
      className="py-28 text-center relative"
      style={{ backgroundColor: brand.night }}
    >
      {/* Soft top fade for transition */}
      <div className="absolute inset-x-0 top-0 h-10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] pointer-events-none"></div>

      <Container>
        <Reveal className="max-w-4xl mx-auto">

          {/* Decorative bar */}
          <div 
            className="h-1.5 w-24 mx-auto rounded-full mb-8"
            style={{ backgroundColor: brand.coral }}
          />

          {/* Title */}
          <h3 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Transformons vos <span className="underline decoration-white/40">visions</span> 
            <br className="hidden sm:block"/>
            en <span className="underline decoration-white/40">réalisations concrètes</span>.
          </h3>

          {/* Subtitle */}
          <p className="mt-6 text-white/85 text-lg max-w-3xl mx-auto leading-relaxed">
            Prenons 30 minutes pour comprendre votre contexte, prioriser vos objectifs et définir 
            un premier plan d’action réaliste. Vous repartez avec des prochaines étapes claires.
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="mt-10 inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:opacity-90 transition"
            style={{
              background: `linear-gradient(90deg, ${brand.coral}, ${brand.violet})`
            }}
          >
            Discutons de votre projet
          </a>

        </Reveal>
      </Container>
    </section>
  );
}


// ——————————————————————————————————————————
// ✨ 7) Articles
// ——————————————————————————————————————————


// ——————————————————————————————————————————
// ✉️ 8) CONTACT — Version PREMIUM Syloria®
// ——————————————————————————————————————————
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      company: e.target.company.value,
      service: e.target.service.value,
      other: e.target.other?.value || "",
    };

    try {
      const res = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        alert("Erreur serveur.");
        return;
      }

      if (!window.__syloriaConvFired && window.gtag) {
        window.__syloriaConvFired = true;
        window.gtag("event", "conversion", {
          send_to: "AW-17624979967/8lJCCMLK_6gbEP-zn9RB",
        });
      }

      setSubmitted(true);
      e.target.reset();
      setTimeout(() => setSubmitted(false), 6000);
      setSelectedService("");
    } catch {
      alert("Impossible de contacter le serveur.");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 relative"
      style={{ backgroundColor: brand.cloud }}
    >
      {/* Soft fade top */}
      <div className="absolute inset-x-0 top-0 h-10 shadow-[0_-10px_35px_rgba(0,0,0,0.08)] pointer-events-none"></div>

      <Container>
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          {/* Decorative premium bar */}
          <div
            className="h-1.5 w-24 mx-auto rounded-full mb-8"
            style={{ backgroundColor: brand.main }}
          />

          {/* Title + baseline */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Être contacté
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Dites-nous ce dont vous avez besoin.  
            Nous revenons vers vous rapidement avec un premier échange clair et constructif.
          </p>
        </Reveal>

        <Reveal>
          {/* Premium form container */}
          <form
            onSubmit={onSubmit}
            className="mx-auto max-w-2xl bg-white rounded-2xl p-8 shadow-xl ring-1 ring-gray-200"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0"
                  placeholder="nom@entreprise.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-900">
                  Entreprise
                </label>
                <input
                  id="company"
                  name="company"
                  className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0"
                  placeholder="Nom de votre société (optionnel)"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-900">
                  Je suis intéressé par :
                </label>
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
                  <option value="APIs backend">Web & APIs backend</option>
                  <option value="Informations supplémentaires">Informations supplémentaires</option>
                  <option value="Autre">Autre (à préciser)</option>
                </select>
              </div>

              {selectedService === "Autre" && (
                <div className="sm:col-span-2">
                  <label htmlFor="other" className="block text-sm font-medium text-gray-900">
                    Précisez votre besoin
                  </label>
                  <input
                    id="other"
                    name="other"
                    className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0"
                    placeholder="Votre besoin"
                  />
                </div>
              )}
            </div>

            {/* CTA + privacy link */}
            <div className="mt-8 flex items-center gap-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-semibold text-white shadow-md hover:opacity-90 transition"
                style={{ backgroundColor: brand.coral }}
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

        {/** ——————- RGPD MODAL UNCHANGED ———————*/}
        {showPrivacy && (<>{/* ... ta modale actuelle, inchangée ... */}</>)}
      </Container>
    </section>
  );
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
      <footer
        className="pt-20 pb-10 text-white"
        style={{
          background: `linear-gradient(
            180deg,
            ${brand.deep} 0%,
            ${brand.night} 100%
          )`
        }}
      >


        <Container>

          {/* === GRID 2 COLONNES PREMIUM === */}
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* COLONNE GAUCHE : IDENTITÉ */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img src="/logo-syloria.png" alt="SYLORIA®" className="h-9 w-auto" />
                <p className="text-lg font-semibold text-white">
                  SYLORIA® — Ingénierie Embarquée & APIs
                </p>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mt-2">
                Marque déposée à l’INPI France • SAS immatriculée en Gironde  
                <br />
                Systèmes embarqués, firmware STM32/ROS2, APIs backend sécurisées.
              </p>

              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} — Tous droits réservés
              </p>
            </div>

            {/* COLONNE DROITE : LIENS */}
            <div className="flex flex-col md:items-end gap-2 text-sm">

              <a 
                href="mailto:contact@syloria.fr" 
                className="hover:text-white transition text-white/80"
              >
                contact@syloria.fr
              </a>

              <a
                href="https://www.linkedin.com/company/syloria/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition text-white/80"
              >
                LinkedIn
              </a>

              <button
                type="button"
                onClick={() => setShowLegal(true)}
                className="underline underline-offset-2 hover:text-white transition text-white/80"
              >
                Mentions légales
              </button>

              <button
                type="button"
                onClick={() => setShowCGV(true)}
                className="underline underline-offset-2 hover:text-white transition text-white/80"
              >
                CGV
              </button>

            </div>
          </div>

        </Container>
        {/* Séparateur premium */}
        <div 
          className="h-1.5 w-24 mx-auto rounded-full mb-10"
          style={{ backgroundColor: brand.coral }}
        />

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
        <ArticlesSection />
        <Contact />
      </main>
      <Footer brand={brand} />
    </div>
  );
}
