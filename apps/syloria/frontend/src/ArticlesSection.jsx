import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Container from "./Container";
import { brand } from "./brand";

export default function ArticlesSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const articles = [
    {
      title: "CEM industrielle : comprendre le macro vs PCB",
      intro: "Une approche opérationnelle pour concevoir des systèmes et cartes plus robustes et éviter les itérations coûteuses.",
      pdf: "/articles/Comprendre la Compatibilité ÉlectroMagnétique (CEM) De l’intégration système à la carte électronique.pdf",
      tag: "Electronique & CEM",
    },
  ];

  return (
    <section 
      id="articles" 
      className="py-28 relative"
      style={{ backgroundColor: brand.cloud }}
    >
      {/* Soft top separator */}
      <div className="absolute inset-x-0 top-0 h-10 shadow-[0_-15px_35px_rgba(0,0,0,0.08)] pointer-events-none"></div>

      <Container>

        {/* Premium top bar */}
        <div 
          className="h-1.5 w-24 mx-auto rounded-full mb-8"
          style={{ backgroundColor: brand.main }}
        />

        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Articles & ressources techniques
          </h2>
          <p className="text-gray-700 mt-3">
            Guides PDF, ressources pratiques et documents professionnels pour accompagner vos projets embarqués & logiciels.
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={28}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.15 },
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {articles.map((a, i) => (
            <SwiperSlide key={i}>
              <article
                className="rounded-2xl bg-white p-7 shadow-md ring-1 ring-gray-200 flex flex-col justify-between h-full transition hover:shadow-lg hover:-translate-y-1"
                style={{ minHeight: "300px" }}
              >
                <span
                  className="px-3 py-1 text-xs font-semibold text-white rounded-full mb-4 shrink-0"
                  style={{ backgroundColor: brand.main }}
                >
                  {a.tag}
                </span>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-gray-700 text-sm">{a.intro}</p>
                </div>

                <a
                  href={a.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex justify-center px-5 py-2.5 rounded-xl font-medium text-white shadow hover:opacity-90 transition shrink-0"
                  style={{ backgroundColor: brand.coral }}
                >
                  Télécharger PDF
                </a>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-6 mt-12">
          <button
            ref={prevRef}
            className="w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
            style={{ backgroundColor: brand.main }}
          >
            <span className="text-white text-xl">◀</span>
          </button>

          <button
            ref={nextRef}
            className="w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
            style={{ backgroundColor: brand.main }}
          >
            <span className="text-white text-xl">▶</span>
          </button>
        </div>

      </Container>
    </section>
  );
}
