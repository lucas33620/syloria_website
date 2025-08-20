/*
  Syloria – Landing Page App.jsx (v5 accessibilité + harmonie)
  Changements clés (AA):
  - 💡 Contraste renforcé : brand.coral → #A83A65 (ratio 6.07:1 sur texte blanc)
  - 💡 Texte sur fonds clairs → gris 700 par défaut (≥ 7:1 sur #E9ECF2)
  - 💡 Landmarks & ancrage : <main id="main" tabIndex={-1}> + skip‑link visible au focus
  - 💡 Séparateurs homogènes : <SectionDivider/> entre sections
  - 💡 États focus visibles: focus-visible:ring-2 + ring-offset
*/

import { useEffect, useMemo, useRef, useState } from 'react'

// ——————————————————————————————————————————
// 🎨 Palette (charte renforcée AA)
// ——————————————————————————————————————————
const brand = {
  main: '#2D0A4E',   // Violet foncé (logo)
  blue: '#1E90FF',   // Accent 1 – Bleu électrique
  coral: '#A83A65',  // Accent 2 – Corail assombri (AA avec texte blanc)
  night: '#0D0A1A',  // Très sombre (background profond)
  cloud: '#E9ECF2',  // Gris clair net, bien distinct du blanc
  mist: '#EEF1F6',   // Variante gris bleuté très doux pour alterner
  violet: '#5A3E8C', // Violet intermédiaire (fond ou hover subtils)
}

// ——————————————————————————————————————————
// Utilitaires visuels & accessibilité
// ——————————————————————————————————————————
const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60 transition-colors'
  const sizes = 'px-6 py-3'
  const variants = {
    primary: `text-white`,
    white: `text-gray-900 bg-white hover:bg-gray-100`,
    ghost: `bg-white/10 text-white hover:bg-white/20`,
  }
  const style = variant === 'primary' ? { backgroundColor: brand.coral } : {}
  return (
    <button {...props} style={style} className={`${base} ${sizes} ${variants[variant]} ${className}`}>{children}</button>
  )
}

const SectionTitle = ({ eyebrow, title, subtitle, align = 'center', theme = 'light' }) => {
  const isDark = theme === 'dark'
  const eyebrowClass = isDark ? 'text-white/80' : 'text-gray-700' // ↑ contraste
  const titleClass = isDark ? 'text-white' : 'text-gray-900'
  const subtitleClass = isDark ? 'text-white/85' : 'text-gray-700' // ↑ contraste
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`text-sm tracking-widest uppercase font-semibold ${eyebrowClass}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl sm:text-4xl font-bold ${titleClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg max-w-3xl mx-auto ${subtitleClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// Révélation au scroll (respecte prefers-reduced-motion)
const Reveal = ({ children, className = '' }) => {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setShow(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShow(true); io.disconnect() }
    }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${className} transition-all duration-700 will-change-transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {children}
    </div>
  )
}

// Séparateur homogène entre sections
const SectionDivider = ({ className = '' }) => (
  <div aria-hidden className={`relative my-6 sm:my-10 ${className}`}>
    <div className="absolute inset-0 flex justify-center">
      <span className="mt-[-6px] h-2 w-28 rounded-full shadow" style={{ backgroundColor: `${brand.main}14` }} />
    </div>
  </div>
)

// ——————————————————————————————————————————
// Navbar sticky + lien actif + skip link
// ——————————————————————————————————————————
const useActiveId = (ids) => {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [ids])
  return active
}

const Navbar = ({ onContact }) => {
  const ids = ['hero','pourquoi','services','cases','portfolio','about','contact']
  const active = useActiveId(ids)
  const link = (id, label) => (
    <a
      key={id}
      href={`#${id}`}
      className={`text-sm relative pb-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 ${active===id? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}
    >
      {label}
      <span aria-hidden className={`absolute left-0 -bottom-0.5 h-0.5 w-full transition-transform origin-left ${active===id? 'bg-gray-900 scale-x-100' : 'bg-transparent scale-x-0'}`} />
    </a>
  )
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-100">
      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-gray-900 focus:px-3 focus:py-2 focus:rounded shadow">Aller au contenu</a>
      <Container className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src="/logo-syloria.png" alt="Syloria" className="h-8 w-auto" />
          <span className="font-semibold">Syloria</span>
        </div>
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          {link('pourquoi','Pourquoi nous')}
          {link('services','Domaines')}
          {link('cases','Livrables')}
          {link('portfolio','Portfolio')}
          {link('about','À propos')}
          <Button onClick={onContact} aria-label="Ouvrir la section contact">Être contacté</Button>
        </nav>
      </Container>
    </header>
  )
}

export default function App(){
  const contactRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' })

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(()=>setSubmitted(false), 6000);
    e.currentTarget.reset();
  }

  // —————————————————— Portfolio data ——————————————————
  const categories = ['Embarqué','Web/API','Agile']
  const items = useMemo(()=>[
    { id:1, title:'Firmware STM32', cat:'Embarqué', img:'/images/portfolio-stm32.jpg' },
    { id:2, title:'ROS2 Mobile Base', cat:'Embarqué', img:'/images/portfolio-ros2.jpg' },
    { id:3, title:'API Django sécurisée', cat:'Web/API', img:'/images/portfolio-django.jpg' },
    { id:4, title:'FastAPI Realtime', cat:'Web/API', img:'/images/portfolio-fastapi.jpg' },
    { id:6, title:'Scrum workshop', cat:'Agile', img:'/images/portfolio-scrum.jpg' },
  ],[])
  const [filter, setFilter] = useState('Embarqué')
  const filtered = items.filter(i => i.cat === filter)

  return (
    <div className="font-sans antialiased text-gray-900">
      <Navbar onContact={scrollToContact} />

      {/* ————————————————————— Main landmark (ancrage #main) ————————————————————— */}
      <main id="main" tabIndex={-1}>
        {/* ————————————————————— Hero ————————————————————— */}
        <section id="hero" aria-label="Accueil" className="relative overflow-hidden">
          {/* BG image (charte) */}
          <div className="absolute inset-0 -z-10">
            <img
              src="/bg-syloria.png"
              alt="Fond abstrait Syloria"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(45,10,78,0.55) 0%, rgba(13,10,26,0.75) 100%)',
              }}
            />
          </div>
          <Container className="py-20 sm:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div className="text-white">
                  <span className="inline-block rounded-full px-3 py-1 text-xs tracking-widest uppercase font-semibold text-white/80 bg-white/10">Expertise embarquée, Web/API & sécurité</span>
                  <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight">Micro‑agence tech pour vos projets <span className="text-white/90">Embarqué</span>, <span className="text-white/90">Web</span> & <span className="text-white/90">API</span>.</h1>
                  <p className="mt-4 text-lg text-white/85 max-w-xl">Proximité, réactivité et documentation claire — interventions sur devis, adaptées à vos enjeux.</p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button variant="white" onClick={scrollToContact}>Être contacté</Button>
                    <a href="#services" className="px-6 py-3 rounded-xl font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70" style={{backgroundColor: brand.violet}}>Voir nos domaines</a>
                  </div>
                </div>
              </Reveal>
              <Reveal className="relative flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                  <img 
                    src="/mockup.png" 
                    alt="Illustration métier" 
                    className="w-[320px] h-[320px] object-contain" 
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
          </Container>
          {/* Vague décorative bas : couleur = section suivante */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-full h-[80px] -mb-[1px]">
            <svg viewBox="0 0 1240 80" className="w-full h-full" preserveAspectRatio="none">
              <path fill={brand.cloud} d="M0,64L60,53.3C120,43,240,21,360,21.3C480,21,600,43,720,53.3C840,64,960,64,1080,58.7C1200,53,1320,43,1380,37.3L1440,32V80H0Z" />
            </svg>
          </div>
        </section>

        {/* ————————————————————— Pourquoi Syloria ————————————————————— */}
        <section id="pourquoi" className="py-16 sm:py-20" style={{backgroundColor: brand.cloud}}>
          <Container>
            <SectionTitle title="Pourquoi Syloria ?" subtitle="Proximité & réactivité, expertise rare, pédagogie concrète." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{icon:'⚡', t:'Micro‑agence humaine', s:'disponible, agile, orientée résultats'},
                {icon:'🔒', t:'Expertise rare', s:'embarqué + backend + sécurité'},
                {icon:'📚', t:'Transparence & pédagogie', s:'documentation claire, transfert de compétences'}].map((f,i)=> (
                <Reveal key={i}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 text-center">
                    <div className="text-2xl" aria-hidden>{f.icon}</div>
                    <h3 className="mt-2 font-semibold text-lg text-gray-900">{f.t}</h3>
                    <p className="text-gray-700 text-sm mt-1">{f.s}</p> {/* ↑ contraste */}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ————————————————————— Domaines ————————————————————— */}
        <section id="services" className="py-20" style={{ backgroundColor: brand.violet }}>
          <Container>
            <SectionTitle
              eyebrow="Expertises"
              title="Nos domaines d’intervention"
              subtitle="Toutes nos missions sont sur devis, adaptées à vos besoins."
              theme="dark"
            />

            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { t: 'Systèmes embarqués', s: 'STM32, ROS2, FreeRTOS', logo: '/Electronic_logo.png' },
                { t: 'Développement backend/API', s: 'Django, FastAPI', logo: '/Web_logo.png' },
                { t: 'Méthodologies agiles', s: 'Scrum, coaching, formation', logo: '/Agile_logo.png' }
              ].map((b, i) => (
                <Reveal key={i}>
                  <div className="w-80 h-[380px] flex flex-col justify-between rounded-2xl p-10 bg-white text-center shadow-lg ring-1 ring-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    {/* Zone logo homogène */}
                    <div className="flex justify-center items-center flex-grow">
                      <img
                        src={b.logo}
                        alt={b.t}
                        className="w-[220px] h-[220px] object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    {/* Texte */}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{b.t}</h3>
                      <p className="text-sm text-gray-700 mt-2">{b.s}</p> {/* ↑ contraste */}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ————————————————————— Livrables / Cas d’usage ————————————————————— */}
        <section id="cases" className="py-16 sm:py-20" style={{ backgroundColor: brand.cloud }}>
          <Container>
            <SectionTitle eyebrow="Exemples concrets" title="Livrables proposés" subtitle="Chaque mission est adaptée à votre contexte et livrée sur devis." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ t: 'Prototype logiciel en 4 semaines', s: 'POC fonctionnel (UI, logique métier, tests) pour valider une idée rapidement.', img: '/images/case-software.png' },
                { t: 'Carte électronique dédiée', s: 'Schéma, PCB et firmware de base (STM32, capteurs, CAN/UART).', img: '/images/case-electronics.png' },
                { t: 'Web API sécurisée', s: 'API REST/GraphQL (Django ou FastAPI) avec auth & observabilité.', img: '/images/case-api.png' },
                { t: 'Coaching Agile & Scrum', s: 'Ateliers, mise en place d’outils, accompagnement d’équipes.', img: '/images/case-agile.png' }].map((c, i) => (
                <Reveal key={i}>
                  <article className="bg-white rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
                    <div className="aspect-video bg-gray-100"><img src={c.img} alt={c.t} className="w-full h-full object-cover" loading="lazy" /></div>
                    <div className="p-6"><h3 className="font-semibold text-gray-900">{c.t}</h3><p className="mt-1 text-sm text-gray-700">{c.s}</p></div> {/* ↑ contraste */}
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ————————————————————— Portfolio filtrable ————————————————————— */}
        <section id="portfolio" className="py-16 sm:py-20" style={{backgroundColor: brand.cloud}}>
          <Container>
            <SectionTitle eyebrow="Réalisations" title="Notre portfolio" subtitle="Filtrez par type d’intervention." />

            {/* Contrôle accessible */}
            <div role="tablist" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((c)=> (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter===c}
                  onClick={()=>setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 ${filter===c ? 'text-white border-transparent' : 'text-gray-900 border-gray-300'}`}
                  style={{backgroundColor: filter===c ? brand.main : 'transparent'}}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p)=> (
                <Reveal key={p.id}>
                  <figure className="bg-white rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
                    <div className="aspect-square bg-gray-100">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <figcaption className="p-3 text-sm font-medium text-gray-900">{p.title}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ————————————————————— À propos ————————————————————— */}
        <section id="about" className="py-20 relative overflow-hidden" style={{ backgroundColor: brand.main }}>
          <div className="absolute inset-0 -z-10 opacity-30" style={{ background: `radial-gradient(70% 60% at 50% 40%, ${brand.blue}22 0%, transparent 70%)` }} />
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div>
                  <span className="inline-block rounded-full px-3 py-1 text-xs tracking-widest uppercase font-semibold text-white/80 bg-white/10">Qui sommes-nous ?</span>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">Lucas — Fondateur de Syloria</h2>
                  <p className="mt-3 text-white/85">Ingénieur Mines Saint-Étienne, 3 ans chez Shark Robotics. Basé en Nouvelle-Aquitaine, disponible partout en Europe en remote.</p>
                  <p className="mt-6 text-white/85">Approche pédagogique, documentation soignée et transfert de compétences. Simplicité d’une micro-agence, rigueur d’un cabinet d’ingénierie.</p>
                </div>
              </Reveal>
              <Reveal className="relative flex justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transform-gpu transition hover:scale-[1.03]" style={{ maxWidth: '280px' }}>
                  <img src="/Lucas-portrait.jpg" alt="Portrait de Lucas" className="w-full h-full object-cover" loading="lazy" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* ————————————————————— Contact ————————————————————— */}
        <section id="contact" ref={contactRef} className="py-16 sm:py-20 bg-white">
          <Container>
            <SectionTitle
              eyebrow="Contact"
              title="Décrivez votre besoin en quelques lignes"
              subtitle="Vos données ne seront jamais revendues — utilisées uniquement pour vous répondre."
            />

            <form onSubmit={onSubmit} className="mx-auto max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-gray-200" aria-labelledby="contact-title">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom</label>
                  <input id="name" name="name" required className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Votre nom" aria-required="true" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="nom@entreprise.com" aria-required="true" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-900">Entreprise</label>
                  <input id="company" name="company" className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Nom de votre société (optionnel)" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900">Message</label>
                  <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-xl border-gray-300 focus:border-[var(--focus)] focus:ring-0" placeholder="Décrivez votre projet (objectifs, délais, contraintes)…" aria-required="true" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60" style={{ backgroundColor: brand.coral }}>
                  Envoyer ma demande
                </button>
                <p className="text-xs text-gray-700">En envoyant, vous acceptez notre mention RGPD.</p>
              </div>

              {submitted && (
                <p className="mt-4 text-sm font-medium text-green-700">Merci, nous revenons rapidement vers vous.</p>
              )}
            </form>
          </Container>
        </section>
      </main>

      {/* ————————————————————— Footer ————————————————————— */}
      <footer className="py-10" style={{backgroundColor: brand.main}}>
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white/90">
            <div className="flex items-center gap-3">
              <img src="/logo-syloria.png" alt="Syloria" className="h-8 w-auto" />
              <div>
                <p className="font-semibold text-white">Syloria</p>
                <p className="text-sm text-white/80">SAS • Gironde, Nouvelle-Aquitaine, France</p>
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
      </footer>

      {/* token focus color var */}
      <style>{`:root{--focus:${brand.blue}}`}</style>
    </div>
  )
}
