import { QuoteForm } from "./quote-form";

const PHONE_DISPLAY = "(02) 9799 9433";
const PHONE_TEL = "tel:+61297999433";
const ADDRESS = "3A/61-73 Parramatta Rd, Five Dock NSW 2046";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Combined+Smash+%26+Mechanic+Repair+Service+3A%2F61-73+Parramatta+Rd+Five+Dock+NSW+2046";

const resprayChips: { color: string; label?: string; gloss?: boolean }[] = [
  { color: "#66727b", label: "Bare metal" },
  { color: "#79868f" },
  { color: "#9aa6ad", label: "Primer" },
  { color: "#bcc5ca" },
  { color: "#d8dde0" },
  { color: "#456787" },
  { color: "#2c4c6c", label: "Colour" },
  { color: "#1b3a55" },
  { color: "#14293c", label: "Clear coat", gloss: true },
];

const services = [
  {
    title: "Smash repairs",
    body: "Panel beating and structural repair for everything from car-park scrapes to serious hits. Quoted up front, through your insurer or privately.",
  },
  {
    title: "Spray painting & colour matching",
    body: "Factory-matched colour, sprayed and blended so the repair disappears into the panel next to it.",
  },
  {
    title: "Mechanical repairs & servicing",
    body: "Accident-related mechanical work and regular servicing — brakes, cooling, suspension — handled in the same workshop, same visit.",
  },
  {
    title: "Full restoration",
    body: "For the keeper in the garage: metalwork, paint and mechanicals brought back properly, not quickly.",
  },
];

const processSteps = [
  {
    title: "Quote",
    body: "Drive in for a look and a written quote — usually while you wait.",
  },
  {
    title: "Approval",
    body: "Going through insurance? We submit the quote and deal with the assessor.",
  },
  {
    title: "Panel & paint",
    body: "Panels repaired or replaced, then colour-matched and sprayed.",
  },
  {
    title: "Safety check",
    body: "Anything the impact reached — steering, lights, cooling — checked and fixed.",
  },
  {
    title: "Pickup",
    body: "Washed and ready. Most jobs are back on the road within the week.",
  },
];

const reviews = [
  "Super friendly staff.",
  "Our car got fixed in a week, very impressed with the quality of the work!",
  "A good place to service your car.",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "Combined Smash Repairs",
  alternateName: "联合车厂 Combined Smash & Mechanic Repair Service",
  telephone: "+61 2 9799 9433",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3A/61-73 Parramatta Rd",
    addressLocality: "Five Dock",
    addressRegion: "NSW",
    postalCode: "2046",
    addressCountry: "AU",
  },
};

function Stars() {
  return (
    <span aria-hidden="true" className="tracking-tight text-hivis">
      ★★★★★
    </span>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-coveralls-deep/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <p className="flex items-baseline gap-3">
            <span className="font-display text-xl font-extrabold uppercase tracking-wide text-paper">
              Combined Smash Repairs
            </span>
            <span className="hidden text-sm text-steel sm:inline">联合车厂</span>
          </p>
          <a
            href={PHONE_TEL}
            className="font-mono text-sm font-bold tracking-wide text-hivis"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <section className="bg-coveralls text-paper">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
          <p className="rise font-mono text-xs uppercase tracking-[0.22em] text-steel">
            Smash repairs · Spray painting · Mechanical — Five Dock NSW
          </p>
          <h1 className="rise mt-5 max-w-4xl font-display text-[clamp(3.2rem,9vw,7rem)] font-extrabold uppercase leading-[0.95]">
            We put cars back together<span className="text-hivis">.</span>
          </h1>

          <div className="rise-late mt-10 max-w-3xl">
            <div className="flex gap-1" aria-hidden="true">
              {resprayChips.map((chip, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="h-4 rounded-[2px]"
                    style={{
                      background: chip.gloss
                        ? `linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 60%), ${chip.color}`
                        : chip.color,
                    }}
                  />
                  {chip.label && (
                    <span
                      className={`mt-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-steel ${
                        chip.label === "Primer" || chip.label === "Colour"
                          ? "hidden sm:block"
                          : ""
                      }`}
                    >
                      {chip.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="rise-late mt-8 max-w-2xl text-lg leading-relaxed text-paper/85">
            Panel beating, colour-matched spray painting and mechanical repairs
            under one roof on Parramatta Road. Insurance claims handled start to
            finish — over 25 years of them.
          </p>

          <div className="rise-late mt-9 flex flex-wrap items-center gap-4">
            <a
              href={PHONE_TEL}
              className="rounded-sm bg-hivis px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.12em] text-coveralls-deep transition-colors hover:bg-[#ffc04a]"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href="#quote"
              className="rounded-sm border border-steel/70 px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper"
            >
              Request a quote
            </a>
          </div>

          <p className="rise-late mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-steel">
            <span className="text-paper">
              <Stars /> 4.8 on Google
            </span>
            <span aria-hidden="true">·</span>
            <span>25+ years in the trade</span>
            <span aria-hidden="true">·</span>
            <span>Insurance &amp; private work</span>
          </p>
        </div>
      </section>

      <section id="services" className="bg-primer">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-4xl font-extrabold uppercase text-coveralls sm:text-5xl">
            What we do
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-sm border border-steel/40 bg-white p-6 transition-colors hover:border-coveralls"
              >
                <h3 className="font-display text-2xl font-bold uppercase text-coveralls">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/80">
                  {service.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-5 rounded-sm bg-coveralls p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-paper">
                Not sure where to start with a claim?
              </h3>
              <p className="mt-2 max-w-xl text-paper/80">
                Bring the car in. We photograph the damage, write the quote and
                deal with the insurer — you deal with us.
              </p>
            </div>
            <a
              href="#quote"
              className="shrink-0 rounded-sm bg-hivis px-6 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.16em] text-coveralls-deep transition-colors hover:bg-[#ffc04a]"
            >
              Get a quote
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-4xl font-extrabold uppercase text-coveralls sm:text-5xl">
            How a repair runs
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-coveralls pt-4">
                <span className="font-mono text-xs tracking-[0.18em] text-hivis">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase text-coveralls">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-coveralls text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
              From the street
            </h2>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.16em] text-steel underline decoration-steel/50 underline-offset-4 transition-colors hover:text-paper"
            >
              Read all 14 reviews on Google
            </a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.map((quote) => (
              <figure
                key={quote}
                className="rounded-sm border border-white/15 p-6"
              >
                <Stars />
                <blockquote className="mt-4 text-lg font-medium leading-snug">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                  Google review
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-16 bg-primer">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-4xl font-extrabold uppercase text-coveralls sm:text-5xl">
            Get a quote
          </h2>
          <p className="mt-3 max-w-2xl text-ink/80">
            Send through the details and we’ll call you back — or skip the form
            and ring the workshop.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr]">
            <QuoteForm />
            <div className="flex flex-col gap-7">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  Visit
                </h3>
                <p className="mt-2 text-lg font-medium text-coveralls">
                  {ADDRESS}
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-mono text-xs uppercase tracking-[0.16em] text-coveralls underline decoration-hivis decoration-2 underline-offset-4"
                >
                  Directions
                </a>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  Call
                </h3>
                <a
                  href={PHONE_TEL}
                  className="mt-2 inline-block font-display text-3xl font-bold text-coveralls"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  Hours
                </h3>
                <dl className="mt-2 max-w-xs">
                  <div className="flex justify-between gap-6 border-b border-steel/40 py-2">
                    <dt className="font-medium">Mon – Fri</dt>
                    <dd>8:00 am – 5:00 pm</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-2">
                    <dt className="font-medium">Sat – Sun</dt>
                    <dd>Closed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-coveralls-deep text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-extrabold uppercase">
                Combined Smash Repairs
              </span>
              <span className="text-sm text-steel">联合车厂</span>
            </p>
            <p className="mt-2 text-sm text-paper/70">{ADDRESS}</p>
            <a
              href={PHONE_TEL}
              className="mt-1 inline-block font-mono text-sm text-hivis"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
            Smash repairs · Spray painting · Mechanical ·{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
