import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { LanguageToggle } from "./language-toggle";
import { QuoteForm } from "./quote-form";

const PHONE_DISPLAY = "(02) 9799 9433";
const PHONE_TEL = "tel:+61297999433";
const ADDRESS_LINE1 = "3A/61-73 Parramatta Rd";
const ADDRESS_LINE2 = "Five Dock NSW 2046";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Combined+Smash+%26+Mechanic+Repair+Service+3A%2F61-73+Parramatta+Rd+Five+Dock+NSW+2046";

/* ------------------------------------------------------------------ *
 * PLACEHOLDER PHOTOGRAPHY — everything under /public/photos is stock.
 * Swap each file for a real shot of the Five Dock workshop, keeping
 * the same filename and roughly the same aspect ratio.
 * Alt text lives in lib/i18n.ts under `photos`, keyed by these names.
 * ------------------------------------------------------------------ */
const photos = {
  hero: "/photos/hero-booth.jpg",
  detail: "/photos/panel-detail.jpg",
  sanding: "/photos/panel-sand.jpg",
  workshop: "/photos/workshop-wide.jpg",
  mechanical: "/photos/mechanical.jpg",
} as const;

/* The paint build-up, as a legend rather than decoration.
   Labels come from the dictionary, in this order. */
const paintStages = [
  { color: "#6d7982" },
  { color: "#a7b1b8" },
  { color: "#3a6b94" },
  { color: "#27506f", gloss: true },
];

type IconName = "panel" | "spanner";

const icons: Record<IconName, React.ReactElement> = {
  panel: (
    <>
      <path d="M3 15.5 5 9.5a3 3 0 0 1 2.85-2h8.3A3 3 0 0 1 19 9.5l2 6" />
      <path d="M3 15.5h18v3.2a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1-.8-.8v-1.2H7v1.2a.8.8 0 0 1-.8.8H3.8a.8.8 0 0 1-.8-.8Z" />
      <path d="m13.2 6.6 3 3.4-3 1 2.2 2.6" />
    </>
  ),
  spanner: (
    <>
      <path d="M15.6 3.4a5 5 0 0 0-6.4 6.2L3.6 15.2a2 2 0 0 0 0 2.8l2.4 2.4a2 2 0 0 0 2.8 0l5.6-5.6a5 5 0 0 0 6.2-6.4l-3 3-2.8-.8-.8-2.8Z" />
    </>
  ),
};

/* Icon + photo for each service, in the same order as the dictionary's
   `services.items`. Copy is language-dependent; art direction isn't. */
const serviceArt: { icon: IconName; photo: keyof typeof photos }[] = [
  { icon: "panel", photo: "detail" },
  { icon: "spanner", photo: "mechanical" },
];

const serviceAreas = [
  "Five Dock",
  "Drummoyne",
  "Concord",
  "Burwood",
  "Ashfield",
  "Croydon",
  "Haberfield",
  "Strathfield",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "Combined Smash Repairs",
  alternateName: "联合车厂 Combined Smash & Mechanic Repair Service",
  telephone: "+61 2 9799 9433",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINE1,
    addressLocality: "Five Dock",
    addressRegion: "NSW",
    postalCode: "2046",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "14",
  },
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex gap-[2px] text-hivis ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-[0.95em] w-[0.95em]">
          <path d="M10 1.6l2.5 5.1 5.6.8-4 4 .9 5.6L10 14.5l-5 2.6.9-5.6-4-4 5.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M4.5 4h3l1.5 4-2 1.3a12 12 0 0 0 5.7 5.7L14 13l4 1.5v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 2.5 6.2 2 2 0 0 1 4.5 4Z" />
    </svg>
  );
}

export default async function Home() {
  const lang = await getLang();
  const t = getDictionary(lang);

  const navLinks: [string, string][] = [
    [t.header.nav.services, "#services"],
    [t.header.nav.process, "#process"],
    [t.header.nav.reviews, "#reviews"],
    [t.header.nav.findUs, "#quote"],
  ];

  return (
    <main className="flex-1 pb-16 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ---------------------------------------------------------- Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-coveralls-deep/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:gap-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="hazard-fine block h-9 w-[5px] rounded-[1px]" aria-hidden="true" />
            <span className="flex flex-col leading-none">
              <span className="display text-[1.15rem] text-paper sm:text-xl">
                {t.header.brand}
              </span>
              <span className="mt-[3px] hidden text-[11px] tracking-[0.32em] text-steel sm:block">
                {t.header.brandSub}
              </span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label={t.header.navLabel}>
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-steel-light transition-colors hover:text-paper"
              >
                {label}
              </a>
            ))}
          </nav>

          <LanguageToggle lang={lang} label={t.header.languageLabel} className="ml-auto lg:ml-0" />

          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-sm bg-hivis px-4 py-2 font-mono text-[13px] font-bold tracking-tight text-coveralls-deep transition-colors hover:bg-hivis-bright"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">{t.header.call}</span>
          </a>
        </div>
      </header>

      {/* ------------------------------------------------------------ Hero */}
      <section id="top" className="grain relative overflow-hidden bg-coveralls-deep text-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-hivis/[0.07] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-steel/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:pb-28 lg:pt-20">
          <div>
            <p className="rise eyebrow flex items-center gap-2.5 text-steel">
              <span className="inline-block h-[3px] w-8 bg-hivis" aria-hidden="true" />
              {t.hero.eyebrow}
            </p>

            <h1 className="rise-1 display mt-6 text-[clamp(3rem,7.5vw,5.75rem)] text-paper">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
              <span className="text-hivis">{t.hero.titleMark}</span>
            </h1>

            <p className="rise-2 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-paper/80 sm:text-lg">
              {t.hero.lede}
            </p>

            <div className="rise-2 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-hivis px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-coveralls-deep transition-colors hover:bg-hivis-bright"
              >
                <PhoneIcon />
                {t.hero.call} {PHONE_DISPLAY}
              </a>
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-sm border border-steel/50 px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-paper transition-colors hover:border-paper hover:bg-white/5"
              >
                {t.hero.quote}
              </a>
            </div>

            <div className="rise-3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-paper">
                <Stars className="text-[15px]" />
                <span className="font-semibold">4.8</span>
                <span className="text-steel">{t.hero.onGoogle}</span>
              </span>
              <span aria-hidden="true" className="hidden h-4 w-px bg-white/15 sm:block" />
              <span className="text-steel-light">{t.hero.years}</span>
              <span aria-hidden="true" className="hidden h-4 w-px bg-white/15 sm:block" />
              <span className="text-steel-light">{t.hero.work}</span>
            </div>
          </div>

          {/* Hero photo — offset hi-vis frame, paint legend beneath. */}
          <div className="rise-2 relative">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 hidden h-20 w-20 border-r-2 border-t-2 border-hivis sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 hidden h-20 w-20 border-b-2 border-l-2 border-hivis sm:block"
            />
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-coveralls">
                <Image
                  src={photos.hero}
                  alt={t.photos.hero}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 26rem"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-coveralls-deep/80 via-transparent to-transparent"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="eyebrow text-hivis">{t.hero.photoEyebrow}</p>
                  <p className="display mt-1.5 text-2xl text-paper">{t.hero.photoCaption}</p>
                </figcaption>
              </div>

              <div className="mt-4 flex gap-1.5" aria-hidden="true">
                {paintStages.map((stage, i) => (
                  <div key={stage.color} className="flex-1">
                    <div
                      className="h-2.5"
                      style={{
                        background: stage.gloss
                          ? `linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0) 60%), ${stage.color}`
                          : stage.color,
                      }}
                    />
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
                      {t.hero.paintStages[i]}
                    </span>
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Assurances */}
      <section className="border-y border-coveralls/10 bg-primer">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-4 px-5 py-6 lg:grid-cols-4">
          {t.assurances.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-coveralls">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4 shrink-0 text-hivis" aria-hidden="true">
                <path d="m4 10.5 4 4 8-9" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- Services */}
      <section id="services" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-coveralls/50">{t.services.eyebrow}</p>
            <h2 className="display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] text-coveralls">
              {t.services.title}
            </h2>
            <div className="rule-hivis mt-6" />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-steel/30 bg-steel/30 sm:grid-cols-2">
            {t.services.items.map((service, i) => {
              const art = serviceArt[i];
              return (
                <article key={service.title} className="group bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden bg-primer">
                    <Image
                      src={photos[art.photo]}
                      alt={t.photos[art.photo]}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-0 left-0 inline-flex h-12 w-12 items-center justify-center bg-coveralls text-hivis">
                      <Icon name={art.icon} />
                    </span>
                  </div>
                  <div className="p-7 lg:p-8">
                    <h3 className="display text-2xl text-coveralls">{service.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/75">{service.body}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Claim panel */}
          <div className="mt-10 grid overflow-hidden bg-coveralls md:grid-cols-[1.15fr_1fr]">
            <div className="grain relative flex flex-col justify-center p-8 lg:p-12">
              <p className="eyebrow relative text-hivis">{t.services.claim.eyebrow}</p>
              <h3 className="display relative mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] text-paper">
                {t.services.claim.title}
              </h3>
              <p className="relative mt-4 max-w-md leading-relaxed text-paper/75">
                {t.services.claim.body}
              </p>
              <div className="relative mt-7 flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="rounded-sm bg-hivis px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-coveralls-deep transition-colors hover:bg-hivis-bright"
                >
                  {t.services.claim.quote}
                </a>
                <a
                  href={PHONE_TEL}
                  className="rounded-sm border border-steel/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:border-paper"
                >
                  {t.services.claim.talk}
                </a>
              </div>
            </div>
            <div className="relative min-h-[16rem] md:min-h-full">
              <Image
                src={photos.workshop}
                alt={t.photos.workshop}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-coveralls/25" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Process */}
      <section id="process" className="scroll-mt-20 bg-primer">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow text-coveralls/50">{t.process.eyebrow}</p>
              <h2 className="display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] text-coveralls">
                {t.process.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/65">{t.process.aside}</p>
          </div>

          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {t.process.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coveralls font-mono text-xs font-bold text-hivis">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-coveralls/20" />
                </div>
                <h3 className="display mt-4 text-xl text-coveralls">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="eyebrow text-coveralls/50">{t.faq.eyebrow}</p>
              <h2 className="display mt-3 text-[clamp(2.25rem,4.4vw,3.25rem)] text-coveralls">
                {t.faq.title}
              </h2>
              <p className="mt-5 text-ink/70">{t.faq.aside}</p>
              <a
                href={PHONE_TEL}
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-coveralls underline decoration-hivis decoration-2 underline-offset-4"
              >
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
            </div>

            <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {t.faq.items.map((faq) => (
                <div key={faq.q} className="border-t border-coveralls/15 pt-5">
                  <dt className="display text-xl text-coveralls">{faq.q}</dt>
                  <dd className="mt-2.5 leading-relaxed text-ink/75">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Reviews */}
      <section id="reviews" className="grain relative scroll-mt-20 overflow-hidden bg-coveralls text-paper">
        <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-16">
            <div className="flex flex-col">
              <p className="eyebrow text-hivis">{t.reviews.eyebrow}</p>
              <h2 className="display mt-3 text-[clamp(2.25rem,4.4vw,3.25rem)]">
                {t.reviews.title}
              </h2>

              <div className="mt-7 flex items-center gap-5">
                <span className="display text-[3.5rem] leading-none text-hivis">4.8</span>
                <span className="h-10 w-px bg-white/15" aria-hidden="true" />
                <div>
                  <Stars className="text-base" />
                  <p className="mt-1.5 text-sm text-steel">{t.reviews.count}</p>
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto hidden font-mono text-xs uppercase tracking-[0.14em] text-steel underline decoration-steel/40 underline-offset-4 transition-colors hover:text-paper sm:inline-block"
                >
                  {t.reviews.readOnGoogle}
                </a>
              </div>

              <ul className="mt-10 flex flex-1 flex-col justify-between gap-7">
                {t.reviews.items.map((quote) => (
                  <li key={quote} className="border-t border-white/20 pt-5">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <Stars className="text-[13px]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
                        {t.reviews.source}
                      </span>
                    </div>
                    {/* Reviews stay in the reviewer's own words, so mark them as English. */}
                    <blockquote lang="en" className="mt-3 text-[1.375rem] font-medium leading-[1.35] text-paper">
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  </li>
                ))}
              </ul>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.14em] text-steel underline decoration-steel/40 underline-offset-4 transition-colors hover:text-paper sm:hidden"
              >
                {t.reviews.readOnGoogle}
              </a>
            </div>

            <div className="relative min-h-[20rem] lg:min-h-full">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 hidden h-20 w-20 border-b-2 border-l-2 border-hivis lg:block"
              />
              <Image
                src={photos.sanding}
                alt={t.photos.sanding}
                fill
                sizes="(max-width: 1024px) 100vw, 21rem"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-coveralls/70 via-coveralls/10 to-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Quote */}
      <section id="quote" className="scroll-mt-20 bg-primer">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-coveralls/50">{t.quote.eyebrow}</p>
            <h2 className="display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] text-coveralls">
              {t.quote.title}
            </h2>
            <p className="mt-4 text-ink/70">{t.quote.body}</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
            <QuoteForm t={t.form} />

            <aside className="flex flex-col gap-px overflow-hidden border border-steel/30 bg-steel/30">
              <div className="grain relative bg-coveralls px-6 py-7">
                <p className="eyebrow relative text-hivis">{t.quote.workshopEyebrow}</p>
                <p className="display relative mt-2 text-2xl text-paper">{t.quote.workshopTitle}</p>
                <p className="relative mt-2 text-sm leading-relaxed text-paper/70">
                  {t.quote.workshopBody}
                </p>
              </div>

              <div className="bg-white p-6">
                <h3 className="eyebrow text-ink/50">{t.quote.visit}</h3>
                <p className="mt-2.5 text-lg font-semibold leading-snug text-coveralls">
                  {ADDRESS_LINE1}
                  <br />
                  {ADDRESS_LINE2}
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-coveralls underline decoration-hivis decoration-2 underline-offset-4"
                >
                  {t.quote.directions}
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M5 15 15 5M7 5h8v8" />
                  </svg>
                </a>
              </div>

              <div className="bg-white p-6">
                <h3 className="eyebrow text-ink/50">{t.quote.call}</h3>
                <a
                  href={PHONE_TEL}
                  className="display mt-2 block text-4xl text-coveralls transition-colors hover:text-hivis"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>

              <div className="bg-white p-6">
                <h3 className="eyebrow text-ink/50">{t.quote.hours}</h3>
                <dl className="mt-3">
                  <div className="flex items-baseline justify-between gap-6 border-b border-steel/25 pb-2.5">
                    <dt className="font-medium">{t.quote.weekdays}</dt>
                    <dd className="font-mono text-sm">{t.quote.weekdayHours}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 pt-2.5">
                    <dt className="font-medium">{t.quote.weekend}</dt>
                    <dd className="font-mono text-sm text-ink/50">{t.quote.closed}</dd>
                  </div>
                </dl>
              </div>
              <div className="hidden flex-1 bg-white lg:block" />
            </aside>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Footer */}
      <footer className="bg-carbon text-paper">
        <div className="hazard h-1.5 w-full" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="display text-2xl">{t.footer.brand}</p>
              <p className="mt-1 text-sm text-steel">{t.footer.brandSub}</p>
              <p className="mt-5 text-sm leading-relaxed text-paper/70">
                {ADDRESS_LINE1}
                <br />
                {ADDRESS_LINE2}
              </p>
              <a href={PHONE_TEL} className="mt-3 inline-block font-mono text-sm font-bold text-hivis">
                {PHONE_DISPLAY}
              </a>
            </div>

            <div>
              <h3 className="eyebrow text-steel">{t.footer.services}</h3>
              <ul className="mt-4 space-y-2 text-sm text-paper/70">
                {t.services.items.map((service) => (
                  <li key={service.title}>{service.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow text-steel">{t.footer.areas}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm text-paper/70">
                {serviceAreas.map((area) => (
                  <li key={area} className="after:ml-3 after:text-steel/40 after:content-['·'] last:after:content-['']">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
              {t.footer.tagline}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel/70">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* ----------------------------------------------- Mobile call bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-coveralls-deep/95 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href={PHONE_TEL}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-hivis py-3 font-mono text-sm font-bold uppercase tracking-[0.1em] text-coveralls-deep"
          >
            <PhoneIcon />
            {t.mobile.call}
          </a>
          <a
            href="#quote"
            className="flex items-center justify-center rounded-sm border border-steel/50 px-4 py-3 font-mono text-sm font-bold uppercase tracking-[0.1em] text-paper"
          >
            {t.mobile.quote}
          </a>
        </div>
      </div>
    </main>
  );
}
