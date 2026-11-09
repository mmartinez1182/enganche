import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import heroCar from "@/assets/hero-car.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carHatch from "@/assets/car-hatch.jpg";
import carPickup from "@/assets/car-pickup.jpg";
import { mxn, splitPrice, track } from "@/lib/track";

const TITLE = "Enganche de un auto: qué es y cómo funciona | Seminuevos.com";
const DESC =
  "Conoce qué es el enganche de un auto, cómo calcularlo, qué cambia si das más o menos y qué debes considerar antes de elegir tu próximo vehículo.";

const FAQ = [
  ["¿Qué es el enganche?", "Es una cantidad que se paga inicialmente y que normalmente forma parte del valor del vehículo."],
  ["¿El enganche siempre es un porcentaje?", "No necesariamente. Puede expresarse como porcentaje o cantidad, dependiendo de las condiciones correspondientes."],
  ["¿Cómo puedo saber cuánto representa mi enganche?", "Puedes dividir la cantidad que piensas pagar inicialmente entre el precio del vehículo para obtener una referencia porcentual."],
  ["¿Dar más enganche reduce lo que queda pendiente?", "Sí. Un pago inicial mayor reduce la parte del precio que queda pendiente."],
  ["¿Existe un porcentaje de enganche recomendado?", "No existe un porcentaje único para todos los casos. Depende de tu presupuesto y de las condiciones disponibles."],
  ["¿Todos los autos requieren el mismo enganche?", "No. Las condiciones pueden variar según vehículo, dealer, agencia o institución."],
  ["¿Seminuevos.com determina el enganche?", "No. Seminuevos.com es un portal de anuncios y no establece condiciones de pago."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }),
      },
    ],
  }),
  component: Index,
});

/* ---------- primitives ---------- */
function Btn({ href, children, variant = "primary", onClick }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "white"; onClick?: () => void }) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border-2 border-ink text-ink hover:bg-ink hover:text-ink-foreground",
    white: "bg-background text-primary hover:bg-background/90",
  }[variant];
  return (
    <a href={href} onClick={onClick} className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-colors ${v}`}>
      {children}
    </a>
  );
}

function Bar({ pct, tall, labels = true }: { pct: number; tall?: boolean; labels?: boolean }) {
  return (
    <div className={`relative flex w-full overflow-hidden rounded-xl bg-muted stripes ${tall ? "h-16 md:h-20" : "h-8"}`}>
      <div className="bar-anim flex h-full items-center bg-primary px-3 text-primary-foreground" style={{ width: `${Math.max(pct, 0)}%` }}>
        {labels && pct >= 8 && <span className="text-xs font-extrabold md:text-sm">{pct}%</span>}
      </div>
      {labels && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground md:text-sm">{100 - pct}%</span>}
    </div>
  );
}

function Section({ id, eyebrow, title, children, tone = "white" }: { id?: string; eyebrow?: string; title: ReactNode; children: ReactNode; tone?: "white" | "muted" | "ink" }) {
  const t = { white: "bg-background", muted: "bg-muted", ink: "bg-ink text-ink-foreground" }[tone];
  return (
    <section id={id} className={`${t} scroll-mt-20 px-5 py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <h2 className="mb-10 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

const Note = ({ children }: { children: ReactNode }) => <p className="mt-6 text-sm text-muted-foreground">ⓘ {children}</p>;

/* ---------- page ---------- */
function Index() {
  useEffect(() => track("down_payment_landing_view"), []);
  return (
    <div className="pb-20 md:pb-0">
      <Header />
      <main>
        <Hero />
        <QueEs />
        <UnaImagen />
        <Escenarios />
        <Explorador />
        <PorcentajeCantidad />
        <LoQueTienes />
        <PagoInicial />
        <MasAlto />
        <OtrosGastos />
        <Mitos />
        <Preguntas />
        <Checklist />
        <Inventario />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <a href="#autos" onClick={() => track("down_payment_inventory_cta", { from: "sticky" })} className="flex min-h-11 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
          Explorar autos
        </a>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <a class="flex-shrink-0" aria-label="Seminuevos.com — Ir a la página principal" href="/"><svg viewBox="0 0 265 36" xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-7"><g fill="#FF385C" fill-rule="nonzero"><path d="M17.897 35.3c-7.663 0-14.436-4.993-16.71-12.36-.1-.346-.198-.692-.297-1.087a15.973 15.973 0 01-.494-4.054v-.1h.098c.149-.049 3.165-1.483 4.796-1.878a15.942 15.942 0 013.758-.445h.346c1.928 0 3.807-.494 5.488-1.335.444-.247.89-.494 1.334-.791a12.55 12.55 0 003.708-3.856l.149-.248.099-.197.148-.248c.494-.939.89-1.928 1.137-3.015a11.256 11.256 0 00-2.521-.445c-.396-.05-.742-.05-1.039-.05a12.587 12.587 0 00-8.602 3.412c-1.137 1.087-2.077 2.323-2.72 3.757l-.049.05h-.05a21.005 21.005 0 00-4.3 1.038c-.396.148-.792.296-1.088.445l-.248.099.05-.248c.099-.395.198-.741.297-1.038C3.906 3.956 12.904-1.285 21.853.791c.395.099.79.198 1.137.297 1.285.395 2.521.94 3.658 1.582.05.05.1.05-.148 2.027a17.016 17.016 0 01-.593 3.164c-.396 1.236-.89 2.423-1.533 3.51l-.05.1-.049.098a11.964 11.964 0 00-1.582 5.34c0 .296-.05.593-.05.84s0 .544.05.84a13.123 13.123 0 001.632 5.439 12.158 12.158 0 002.224 2.818c4.45-4.252 5.192-11.075 1.73-16.216l-.049-.05v-.05c.544-1.384.99-2.768 1.236-4.251.05-.396.1-.742.149-1.187l.05-.247.197.198c.247.247.544.494.791.791a17.428 17.428 0 010 23.83l-.791.791c-.989.94-2.077 1.78-3.263 2.472H26.5a23.806 23.806 0 01-4.104-3.263c-.79-.89-1.532-1.83-2.125-2.818l-.05-.148-.099-.198-.148-.247c-.94-1.533-2.225-2.818-3.708-3.857a12.942 12.942 0 00-6.872-2.125h-.346c-1.138 0-2.275.197-3.412.494.198.89.495 1.73.89 2.521a12.529 12.529 0 0011.322 7.12c.297 0 .643 0 1.038-.05h.05l.05.05a22.11 22.11 0 002.965 3.115c.347.296.693.543 1.039.84l.198.148-.248.05c-.346.099-.741.198-1.137.296-1.236.297-2.57.445-3.906.445zM53.643 33.125c-1.632 0-3.214-.148-4.796-.544a12.322 12.322 0 01-3.856-1.73c-1.088-.742-1.978-1.681-2.571-2.818a8.723 8.723 0 01-.989-4.005h7.96c.05.94.544 1.83 1.335 2.373.94.544 2.027.791 3.114.742a9.6 9.6 0 001.187-.1c.396-.049.742-.197 1.088-.395.296-.148.593-.395.79-.692.199-.296.347-.643.297-1.038 0-.346-.098-.692-.346-.989a2.388 2.388 0 00-.988-.692c-.495-.247-1.039-.396-1.583-.544-.642-.148-1.334-.346-2.175-.544-1.088-.247-2.225-.593-3.411-.989a12.34 12.34 0 01-3.164-1.483 7.447 7.447 0 01-2.324-2.323c-.643-1.088-.94-2.275-.84-3.51a7.51 7.51 0 01.89-3.857c.543-1.038 1.384-1.928 2.372-2.62 1.039-.693 2.225-1.187 3.51-1.484 1.385-.296 2.819-.494 4.253-.445 1.334 0 2.67.149 3.955.445a9.847 9.847 0 013.411 1.434c.989.643 1.78 1.533 2.373 2.522.643 1.137.94 2.422.94 3.708H56.41a2.697 2.697 0 00-.988-1.73c-.693-.495-1.533-.693-2.374-.643a3.701 3.701 0 00-2.076.494c-.494.247-.791.791-.791 1.335 0 .395.148.741.395.989.347.296.742.494 1.187.642.643.198 1.285.396 1.978.495.79.148 1.68.346 2.67.593 1.087.247 2.175.593 3.262.989 1.039.346 1.978.89 2.819 1.532a7.209 7.209 0 012.027 2.374c.543 1.087.79 2.323.79 3.56.05 1.334-.296 2.67-.89 3.856A8.27 8.27 0 0161.95 30.8c-1.088.791-2.324 1.335-3.61 1.681-1.68.445-3.164.643-4.696.643zM76.632 32.977c-1.433 0-2.867-.248-4.251-.742-1.236-.445-2.324-1.186-3.263-2.076-.94-.89-1.632-1.978-2.126-3.165a11.259 11.259 0 01-.742-4.004c0-1.385.247-2.72.742-4.005a10.55 10.55 0 012.076-3.214c.89-.939 1.978-1.631 3.214-2.125 2.57-.99 5.438-1.039 8.009-.05 1.137.445 2.126 1.088 3.016 1.879a9.328 9.328 0 012.57 4.004c.545 1.681.792 3.461.742 5.241H73.172a5.097 5.097 0 001.186 2.62c.692.643 1.582.99 2.522.94 1.087.099 2.126-.445 2.62-1.434h6.773c-.247.89-.642 1.73-1.236 2.472-.642.84-1.483 1.533-2.373 2.077-.84.543-1.78.988-2.768 1.236-1.039.247-2.176.395-3.264.346zM76.534 17.6c-.84-.05-1.681.296-2.275.89a5.16 5.16 0 00-1.137 2.472h6.526c-.099-.89-.445-1.78-1.038-2.472-.544-.544-1.285-.89-2.076-.89zM88.4 13.547h6.674v2.818h.099c.593-1.039 1.433-1.879 2.422-2.522a6.476 6.476 0 013.56-.89c1.137-.05 2.274.297 3.263.89a5.593 5.593 0 012.126 2.423h.099c.642-1.137 1.631-2.027 2.768-2.62 1.088-.495 2.225-.742 3.412-.693a6.34 6.34 0 013.016.594c.79.346 1.532.89 2.076 1.582.544.741.94 1.532 1.187 2.422.247.99.395 2.027.395 3.016v11.866h-7.02v-10.58a4.25 4.25 0 00-.544-2.324c-.396-.593-1.137-.94-1.879-.89-.79-.05-1.533.346-1.978 1.038-.444.791-.692 1.681-.642 2.571v10.234h-7.02v-10.63a4.25 4.25 0 00-.545-2.323c-.395-.593-1.137-.94-1.878-.89-.791-.05-1.533.346-1.978 1.038-.445.791-.692 1.681-.643 2.571v10.234h-7.02V13.547h.05zM121.92 5.933h7.02v5.29h-7.02v-5.29zm0 7.614h7.02v18.935h-7.02V13.547zM135.911 5.933h7.763l8.701 14.93h.05V5.934h7.514v26.55h-8.009l-8.405-15.03h-.05v15.03h-7.514V5.932zM175.414 32.482V30.01h-.099a7.412 7.412 0 01-2.521 2.275c-1.038.543-2.225.79-3.412.79-1.038 0-2.027-.148-2.966-.543-.791-.346-1.533-.84-2.076-1.483a5.87 5.87 0 01-1.236-2.324 10.03 10.03 0 01-.445-2.967V13.547h7.02v10.53c0 1.978.84 3.016 2.522 3.016.79.05 1.582-.296 2.125-.89.544-.692.792-1.582.742-2.472V13.547h7.02v18.935h-6.674zM194.201 32.977c-1.433 0-2.867-.248-4.251-.742-1.236-.445-2.324-1.186-3.263-2.076-.94-.89-1.632-1.978-2.126-3.165a11.183 11.183 0 010-8.009 10.55 10.55 0 012.076-3.214c.89-.939 1.978-1.631 3.214-2.125 2.57-.99 5.438-1.039 8.01-.05 1.136.445 2.125 1.088 3.015 1.879a9.328 9.328 0 012.57 4.004c.545 1.681.792 3.461.742 5.241h-13.497a5.097 5.097 0 001.187 2.62c.692.643 1.582.99 2.521.94 1.088.099 2.126-.445 2.62-1.434h6.774c-.247.89-.643 1.73-1.236 2.472a7.997 7.997 0 01-2.373 2.077c-.84.543-1.78.988-2.769 1.236-1.038.247-2.126.395-3.214.346zm-.148-15.376a2.84 2.84 0 00-2.225.89 5.16 5.16 0 00-1.137 2.472h6.576c-.1-.89-.445-1.78-1.038-2.472-.594-.544-1.335-.89-2.176-.89zM203.694 13.547h7.268l2.175 7.267c.099.495.247.99.396 1.533l.395 1.483c.1.495.247 1.038.396 1.582h.05c.098-.494.246-1.038.395-1.582l.395-1.483c.149-.544.297-1.038.445-1.533l2.176-7.267h7.07l-6.527 18.935h-8.207l-6.427-18.935zM234.743 33.076c-1.484 0-2.917-.248-4.302-.742a10.208 10.208 0 01-3.263-2.077c-.89-.89-1.631-1.977-2.076-3.164-.99-2.57-.99-5.438 0-7.96.988-2.422 2.917-4.35 5.34-5.29a12.133 12.133 0 018.552 0 9.288 9.288 0 015.29 5.29c.99 2.571.99 5.39 0 8.01a8.396 8.396 0 01-2.076 3.164 8.76 8.76 0 01-3.263 2.076c-1.285.445-2.72.693-4.202.693zm-.05-4.697c1.038.05 1.978-.544 2.472-1.483.593-1.187.89-2.522.791-3.857.05-1.335-.198-2.67-.79-3.856a2.619 2.619 0 00-2.473-1.483c-1.038-.05-1.978.543-2.422 1.483-.594 1.186-.841 2.521-.792 3.856-.049 1.335.198 2.67.792 3.857.444.939 1.384 1.532 2.422 1.483zM255.26 33.125a16.78 16.78 0 01-3.856-.445c-1.088-.247-2.077-.692-3.016-1.285-.84-.544-1.483-1.286-1.978-2.126-.494-.89-.692-1.88-.692-2.917h6.724c0 .692.297 1.335.791 1.829.593.445 1.335.692 2.077.643.593 0 1.186-.1 1.73-.396.445-.247.742-.741.692-1.236a1.35 1.35 0 00-.395-.94 2.616 2.616 0 00-1.038-.543c-.495-.148-.99-.247-1.484-.346l-1.78-.297c-.79-.099-1.582-.296-2.422-.494a7.353 7.353 0 01-2.225-.94 4.715 4.715 0 01-1.631-1.78c-.445-.89-.693-1.878-.643-2.916 0-.89.198-1.78.692-2.571a6.361 6.361 0 011.879-1.928c.84-.544 1.78-.94 2.768-1.138a14.808 14.808 0 013.313-.395c2.867 0 5.092.494 6.575 1.533 1.484.988 2.374 2.57 2.423 4.35h-6.625c0-.593-.346-1.087-.84-1.384-.495-.198-.99-.346-1.533-.297-.495 0-.94.1-1.384.297-.396.198-.643.593-.594 1.038 0 .247.1.495.297.643.247.198.544.346.84.445.396.148.84.198 1.236.297.495.098.99.148 1.533.247.89.099 1.78.296 2.67.494.89.198 1.73.544 2.521.989a5.686 5.686 0 011.879 1.879c.544.989.791 2.076.742 3.164a5.052 5.052 0 01-.742 2.917 5.973 5.973 0 01-1.978 2.027c-.89.544-1.928.94-2.966 1.186-1.137.297-2.373.396-3.56.396z"></path></g></svg></a>
  );
}

function Header() {
  const nav = [["¿Qué es?", "#que-es"], ["¿Cómo funciona?", "#como-funciona"], ["¿Cuánto dar?", "#explorador"], ["Qué considerar", "#considerar"], ["Preguntas frecuentes", "#faq"]];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden gap-6 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-sm font-semibold text-muted-foreground hover:text-primary">{l}</a>
          ))}
        </nav>
        <div className="hidden md:block"><Btn href="#autos">Explorar autos</Btn></div>
      </div>
    </header>
  );
}

function Hero() {
  const [pct, setPct] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPct(25), 300); return () => clearTimeout(t); }, []);
  const price = 350000;
  const { enganche, restante } = splitPrice(price, 25);
  return (
    <section className="overflow-hidden bg-background px-5 pt-12 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Tu primer paso · Guía de enganche</p>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-7xl">
          El <span className="text-primary">enganche</span> es el primer paso hacia tu próximo auto
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Conoce qué es, cómo se relaciona con el precio del vehículo y qué debes considerar antes de decidir cuánto pagar inicialmente.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn href="#que-es" onClick={() => track("down_payment_education_start")}>Entender el enganche</Btn>
          <Btn href="#autos" variant="outline">Explorar autos</Btn>
        </div>

        <div className="relative mt-12 rounded-3xl bg-muted p-6 md:mt-16 md:p-10">
          <img src={heroCar} alt="SUV blanca seminueva" width={1536} height={864} className="mx-auto -mb-4 w-full max-w-3xl mix-blend-multiply md:-mt-28" />
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Precio del auto (ilustrativo)</p>
              <p className="text-4xl font-extrabold text-ink md:text-6xl">{mxn(price)}</p>
            </div>
          </div>
          <div className="mt-5"><Bar pct={pct} tall /></div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div><p className="font-extrabold text-primary">ENGANCHE</p><p className="text-muted-foreground">{mxn(enganche)} · la primera pieza</p></div>
            <div className="text-right"><p className="font-extrabold text-ink">+ MONTO RESTANTE</p><p className="text-muted-foreground">{mxn(restante)}</p></div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Seminuevos.com no establece el monto ni porcentaje de enganche.</p>
        </div>
      </div>
    </section>
  );
}

function QueEs() {
  return (
    <Section id="que-es" eyebrow="01 · ¿Qué es?" title="Empecemos por lo básico">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-2xl font-bold leading-snug text-ink">El enganche es una cantidad que pagas inicialmente al adquirir un vehículo bajo un esquema de pagos.</p>
          <p className="mt-4 text-muted-foreground">Normalmente se establece como una cantidad o porcentaje relacionado con el precio del vehículo.</p>
        </div>
        <div className="rounded-3xl border border-border p-6 md:p-8">
          <Row label="Precio del auto" value={mxn(300000)} />
          <Row label="Enganche ilustrativo" value="20%" accent />
          <Row label="=" value={mxn(60000)} accent />
          <Row label="Monto restante" value={mxn(240000)} />
          <p className="mt-4 text-sm font-bold text-ink">Ejemplo únicamente educativo.</p>
          <p className="text-sm text-muted-foreground">No significa que exista un enganche del 20% para todos los vehículos.</p>
        </div>
      </div>
    </Section>
  );
}
const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-baseline justify-between border-b border-border py-3 last:border-0">
    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className={`text-2xl font-extrabold md:text-3xl ${accent ? "text-primary" : "text-ink"}`}>{value}</span>
  </div>
);

function UnaImagen() {
  const [pct, setPct] = useState(20);
  return (
    <Section id="como-funciona" tone="muted" eyebrow="02 · ¿Cómo funciona?" title="¿Dónde entra el enganche?">
      <div className="rounded-3xl bg-background p-6 md:p-10">
        <p className="text-sm font-bold text-muted-foreground">100% · Precio total del vehículo</p>
        <div className="mt-3"><Bar pct={pct} tall /></div>
        <div className="mt-4 flex justify-between gap-4">
          <div><p className="text-5xl font-extrabold text-primary md:text-7xl">{pct}%</p><p className="text-sm text-muted-foreground">Pago inicial ilustrativo</p></div>
          <div className="text-right"><p className="text-5xl font-extrabold text-ink md:text-7xl">{100 - pct}%</p><p className="text-sm text-muted-foreground">Monto restante ilustrativo</p></div>
        </div>
        <label className="mt-8 block text-sm font-bold text-ink">Mueve el enganche (10% — 50%)</label>
        <input type="range" min={10} max={50} value={pct} aria-label="Porcentaje de enganche" onChange={(e) => { setPct(+e.target.value); track("down_payment_slider_interaction", { section: "una_imagen" }); }} className="w-full" />
        <Note>El porcentaje utilizado es únicamente para explicar cómo funciona.</Note>
      </div>
    </Section>
  );
}

function Escenarios() {
  const price = 350000;
  const s = [
    { t: "Enganche menor", pct: 15, a: "Pagas menos inicialmente.", b: "Queda un monto mayor pendiente." },
    { t: "Enganche intermedio", pct: 30, a: "Pagas una cantidad mayor al inicio.", b: "Queda un monto menor pendiente." },
    { t: "Enganche mayor", pct: 45, a: "Realizas un pago inicial mayor.", b: "Queda un monto menor pendiente." },
  ];
  return (
    <Section eyebrow="03 · ¿Qué pasa si doy más o menos?" title="Más o menos enganche puede cambiar el escenario">
      <p className="-mt-6 mb-8 text-muted-foreground">Mismo auto · Precio ilustrativo: <b className="text-ink">{mxn(price)}</b></p>
      <div className="grid gap-5 md:grid-cols-3">
        {s.map((x, i) => {
          const { enganche, restante } = splitPrice(price, x.pct);
          return (
            <div key={x.t} className="rounded-3xl border border-border p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Escenario {"ABC"[i]}</p>
              <h3 className="mt-1 text-2xl font-extrabold text-ink">{x.t}</h3>
              <div className="my-5"><Bar pct={x.pct} /></div>
              <p className="text-sm"><b className="text-primary">{mxn(enganche)}</b> al inicio · <b className="text-ink">{mxn(restante)}</b> pendiente</p>
              <p className="mt-3 text-sm text-muted-foreground">{x.a}<br />{x.b}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-lg font-bold text-ink">El enganche adecuado depende de tu presupuesto y de las condiciones disponibles.</p>
    </Section>
  );
}

function Explorador() {
  const [price, setPrice] = useState(400000);
  const [pct, setPct] = useState(20);
  const { enganche, restante } = splitPrice(price, pct);
  return (
    <Section id="explorador" tone="ink" eyebrow="04 · ¿Cuánto dar?" title="Explora diferentes escenarios">
      <p className="-mt-6 mb-10 text-ink-foreground/70">Mueve el enganche y observa cómo cambia el monto restante.</p>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between text-sm font-bold"><span>PRECIO DEL AUTO</span><span>{mxn(price)}</span></div>
            <input type="range" min={150000} max={1000000} step={10000} value={price} aria-label="Precio del auto" onChange={(e) => { setPrice(+e.target.value); track("down_payment_amount_change", { price: +e.target.value }); }} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold"><span>ENGANCHE</span><span>{pct}%</span></div>
            <input type="range" min={0} max={50} value={pct} aria-label="Porcentaje de enganche" onChange={(e) => { setPct(+e.target.value); track("down_payment_percentage_change", { pct: +e.target.value }); }} className="w-full" />
          </div>
          <Bar pct={pct} tall />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[["Precio ilustrativo", mxn(price)], ["Porcentaje", `${pct}%`], ["Enganche seleccionado", mxn(enganche)], ["Monto restante", mxn(restante)]].map(([l, v], i) => (
            <div key={l} className={`rounded-2xl p-5 ${i === 2 ? "bg-primary text-primary-foreground" : "bg-ink-foreground/10"}`}>
              <p className="text-xs font-bold uppercase tracking-widest opacity-75">{l}</p>
              <p className="mt-2 text-2xl font-extrabold md:text-3xl">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-sm text-ink-foreground/70">ⓘ Esta herramienta es educativa y no representa las condiciones reales de ningún vehículo o vendedor.</p>
    </Section>
  );
}

function PorcentajeCantidad() {
  const [p1, setP1] = useState(20), [price1, setPrice1] = useState(300000);
  const [amt, setAmt] = useState(60000), [price2, setPrice2] = useState(300000);
  const num = "w-full rounded-xl border border-input bg-background px-3 py-2 text-lg font-bold text-ink min-h-11";
  return (
    <Section tone="muted" eyebrow="05 · ¿Cómo se calcula?" title="El enganche puede entenderse de dos formas">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-background p-6 md:p-8">
          <h3 className="text-2xl font-extrabold text-ink">Porcentaje</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-muted-foreground">Porcentaje (%)<input type="number" min={0} max={100} className={num} value={p1} onChange={(e) => setP1(Math.min(100, Math.max(0, +e.target.value)))} /></label>
            <label className="text-xs font-bold text-muted-foreground">Precio del auto<input type="number" min={0} className={num} value={price1} onChange={(e) => setPrice1(Math.max(0, +e.target.value))} /></label>
          </div>
          <p className="mt-6 text-muted-foreground">{p1}% de {mxn(price1)} =</p>
          <p className="text-5xl font-extrabold text-primary">{mxn(splitPrice(price1, p1).enganche)}</p>
        </div>
        <div className="rounded-3xl bg-background p-6 md:p-8">
          <h3 className="text-2xl font-extrabold text-ink">Cantidad</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-muted-foreground">Tengo disponibles<input type="number" min={0} className={num} value={amt} onChange={(e) => setAmt(Math.max(0, +e.target.value))} /></label>
            <label className="text-xs font-bold text-muted-foreground">Sobre un vehículo de<input type="number" min={1} className={num} value={price2} onChange={(e) => setPrice2(Math.max(1, +e.target.value))} /></label>
          </div>
          <p className="mt-6 text-muted-foreground">{mxn(amt)} sobre {mxn(price2)} =</p>
          <p className="text-5xl font-extrabold text-primary">{((amt / price2) * 100).toFixed(1).replace(".0", "")}% <span className="text-base font-bold text-muted-foreground">ilustrativo</span></p>
        </div>
      </div>
      <p className="mt-6 text-center text-sm font-bold text-ink">PORCENTAJE ↔ PESOS</p>
    </Section>
  );
}

function Chips({ options, value, onChange }: { options: string[]; value: string | null; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} className={`min-h-11 rounded-full border-2 px-5 text-sm font-bold transition-colors ${value === o ? "border-primary bg-primary text-primary-foreground" : "border-border text-ink hover:border-primary"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

function LoQueTienes() {
  const [a, setA] = useState<string | null>(null);
  const [b, setB] = useState<string | null>(null);
  return (
    <Section eyebrow="06 · ¿Cuánto tengo disponible?" title="¿Cuánto tienes pensado dar inicialmente?">
      <p className="-mt-6 mb-8 max-w-2xl text-muted-foreground">No necesitas comenzar por un porcentaje. Puedes empezar por la cantidad que tienes disponible.</p>
      <Chips options={["Menos de $30,000", "$30,000 – $50,000", "$50,000 – $80,000", "$80,000 – $120,000", "Más de $120,000"]} value={a} onChange={(v) => { setA(v); track("down_payment_budget_start", { amount: v }); }} />
      {a && (
        <div className="mt-10">
          <p className="mb-4 text-lg font-extrabold text-ink">¿Ya tienes un rango de precio para tu auto?</p>
          <Chips options={["Hasta $200,000", "$200,000 – $300,000", "$300,000 – $400,000", "$400,000 – $600,000", "Más de $600,000"]} value={b} onChange={(v) => { setB(v); track("down_payment_budget_complete", { amount: a, price: v }); }} />
        </div>
      )}
      {a && b && (
        <div className="mt-10 rounded-3xl bg-muted p-6 md:flex md:items-center md:justify-between">
          <div>
            <p className="font-bold text-ink">Pago inicial: {a} · Autos: {b}</p>
            <p className="text-sm text-muted-foreground">Estas respuestas pueden ayudarte a organizar tu búsqueda.</p>
          </div>
          <div className="mt-4 md:mt-0"><Btn href="#autos">Explorar autos</Btn></div>
        </div>
      )}
    </Section>
  );
}

function PagoInicial() {
  const c = [["Enganche", "Cantidad inicial destinada al valor del vehículo.", true], ["Seguro", "Puede existir un pago relacionado con el seguro."], ["Comisiones", "Algunas opciones pueden contemplar costos adicionales."], ["Trámites", "Pueden existir gastos relacionados con placas, impuestos o trámites."]] as const;
  return (
    <Section id="considerar" tone="muted" eyebrow="07 · Qué considerar" title="Antes de apartar tu presupuesto, pregunta qué incluye">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.map(([t, d, hi]) => (
          <div key={t} className={`rounded-3xl p-6 ${hi ? "bg-primary text-primary-foreground" : "bg-background"}`}>
            <h3 className="text-xl font-extrabold">{t}</h3>
            <p className={`mt-2 text-sm ${hi ? "" : "text-muted-foreground"}`}>{d}</p>
          </div>
        ))}
      </div>
      <Note>Los conceptos aplicables dependen del vehículo, vendedor, ubicación e institución correspondiente.</Note>
      <p className="mt-10 text-2xl font-extrabold text-ink md:text-3xl">Pregunta siempre qué incluye el pago inicial y qué se paga por separado.</p>
    </Section>
  );
}

function MasAlto() {
  return (
    <Section eyebrow="¿Enganche más alto siempre es mejor?" title="No necesariamente">
      <p className="-mt-4 mb-10 max-w-3xl text-xl text-muted-foreground">Dar más dinero inicialmente reduce el monto pendiente, pero también significa utilizar una mayor parte de tus recursos desde el comienzo.</p>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
        {[["Dar más al inicio", ["menor monto pendiente", "mayor desembolso inicial", "menos dinero disponible para otros gastos"]], ["Dar menos al inicio", ["conservar más dinero disponible", "mayor monto pendiente", "diferentes condiciones posteriores"]]].map(([t, l]) => (
          <div key={t as string} className="bg-background p-8">
            <h3 className="text-2xl font-extrabold text-ink">{t as string}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Puede significar:</p>
            <ul className="mt-4 space-y-2">{(l as string[]).map((x) => <li key={x} className="flex gap-2 text-ink"><span className="text-primary">—</span>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-lg font-bold text-ink">La decisión debe considerar tu presupuesto completo, no únicamente el precio del auto.</p>
    </Section>
  );
}

function OtrosGastos() {
  const items = ["Enganche", "Seguro", "Trámites", "Combustible", "Mantenimiento", "Fondo para imprevistos"];
  return (
    <Section tone="muted" eyebrow="No uses todo tu ahorro sin pensar en esto" title="El auto también genera otros gastos">
      <div className="rounded-3xl bg-ink p-6 text-ink-foreground md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest opacity-70">Ahorro disponible</p>
        <p className="text-3xl font-extrabold">100% de tu presupuesto ↓</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-6">
        {items.map((x, i) => (
          <div key={x} className={`rounded-2xl p-4 text-center font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-background text-ink"}`}>{i > 0 && <span className="mr-1 text-accent">+</span>}{x}</div>
        ))}
      </div>
      <Note>Considera otros gastos relacionados con tener un auto antes de decidir cuánto destinar al pago inicial.</Note>
    </Section>
  );
}

function Mitos() {
  const cards = [
    ["Todos los autos requieren el mismo porcentaje de enganche.", false, "Las condiciones pueden cambiar según vehículo, dealer, agencia o institución."],
    ["Dar más enganche reduce el monto pendiente.", true, "Un pago inicial mayor reduce la parte del precio que queda pendiente."],
    ["Seminuevos.com establece cuánto enganche debo pagar.", false, "Seminuevos.com es un portal de anuncios y no determina las condiciones de compra."],
    ["El enganche debe considerarse junto con otros gastos iniciales.", true, "Seguro, trámites y otros pagos también cuentan."],
    ["Un porcentaje anunciado aplica necesariamente a todos los autos.", false, "Las condiciones pueden variar."],
  ] as const;
  const [open, setOpen] = useState<number[]>([]);
  return (
    <Section eyebrow="Toca cada tarjeta" title="Enganche: mito o realidad">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([q, real, a], i) => {
          const f = open.includes(i);
          return (
            <button key={i} type="button" aria-pressed={f} onClick={() => { setOpen(f ? open.filter((x) => x !== i) : [...open, i]); track("down_payment_myth_interaction", { card: i }); }} className="h-60 text-left [perspective:1000px]">
              <div className={`flip-inner relative h-full w-full ${f ? "rotate-y-180" : ""}`}>
                <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl border border-border bg-muted p-5">
                  <p className="font-bold text-ink">“{q}”</p>
                  <span className="text-xs font-bold text-muted-foreground">¿Mito o realidad? ↻</span>
                </div>
                <div className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-3xl p-5 ${real ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                  <p className="text-3xl font-extrabold">{real ? "REALIDAD" : "MITO"}</p>
                  <p className="text-sm">{a}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
}

function Preguntas() {
  const q = ["¿Cuánto enganche necesito?", "¿Ese monto es porcentaje o cantidad fija?", "¿Sobre qué precio se calcula?", "¿Qué incluye mi pago inicial?", "¿Existen otros pagos al inicio?", "¿Qué pasa con el monto restante?", "¿Las condiciones cambian si doy un enganche diferente?"];
  return (
    <Section tone="muted" eyebrow="Pregunta al dealer" title="7 preguntas que debes hacer antes de dar un enganche">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {q.map((x, i) => (
          <div key={x} className="rounded-3xl bg-background p-6">
            <p className="text-4xl font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-bold text-ink">{x}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Checklist() {
  const items = ["Sé cuánto dinero tengo disponible", "Conozco el precio del vehículo", "Entiendo qué porcentaje representa mi enganche", "Sé qué otros pagos debo realizar inicialmente", "No estoy considerando únicamente el enganche", "Pregunté qué incluye el pago inicial", "Conozco el monto que quedará pendiente", "Comparé diferentes escenarios"];
  const [done, setDone] = useState<boolean[]>(items.map(() => false));
  const n = done.filter(Boolean).length;
  return (
    <Section eyebrow="Checklist" title="Antes de decidir cuánto dar">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1"><Bar pct={Math.round((n / items.length) * 100)} labels={false} /></div>
        <p className="font-extrabold text-ink">{n} de {items.length} revisados</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((x, i) => (
          <label key={x} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${done[i] ? "border-accent bg-accent/10" : "border-border"}`}>
            <input type="checkbox" checked={done[i]} onChange={() => { const d = [...done]; d[i] = !d[i]; setDone(d); track("down_payment_checklist_interaction", { item: i }); }} className="h-5 w-5 accent-[var(--accent)]" />
            <span className="font-semibold text-ink">{x}</span>
          </label>
        ))}
      </div>
    </Section>
  );
}

const CARS = [
  { img: heroCar, marca: "Toyota", modelo: "RAV4 XLE", anio: 2022, precio: 489000, km: 38000, ubic: "Monterrey, NL", dealer: "Agencia Norte Autos", tipo: "SUV" },
  { img: carSedan, marca: "Nissan", modelo: "Sentra Advance", anio: 2021, precio: 289000, km: 45000, ubic: "Guadalajara, Jal.", dealer: "Seminuevos Certificados GDL", tipo: "Sedán" },
  { img: carHatch, marca: "Toyota", modelo: "Corolla Hatchback", anio: 2020, precio: 315000, km: 52000, ubic: "CDMX", dealer: "Autos Reforma", tipo: "Hatchback" },
  { img: carPickup, marca: "Ford", modelo: "F-150 XLT", anio: 2019, precio: 599000, km: 78000, ubic: "Querétaro, Qro.", dealer: "Pickups del Bajío", tipo: "Pickup" },
  { img: carSedan, marca: "Nissan", modelo: "Sentra Sense", anio: 2020, precio: 255000, km: 61000, ubic: "Puebla, Pue.", dealer: "Grupo Angelópolis", tipo: "Sedán" },
];

function Inventario() {
  useEffect(() => {
    const el = document.getElementById("autos");
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { track("down_payment_inventory_view"); o.disconnect(); } });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const [f, setF] = useState("Todos");
  const main = CARS[0]!;
  const rest = CARS.slice(1);
  return (
    <section id="autos" className="scroll-mt-20 bg-ink px-5 py-16 text-ink-foreground md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Explorar autos</p>
        <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">Ya entendiste el enganche.<br />Ahora explora autos.</h2>
        <p className="mt-4 text-ink-foreground/70">Encuentra vehículos publicados por agencias y dealers en Seminuevos.com.</p>
        <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2">
          {["Todos", "Precio", "Marca", "Año", "Tipo", "Ubicación"].map((x) => (
            <button key={x} onClick={() => setF(x)} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-bold ${f === x ? "border-primary bg-primary text-primary-foreground" : "border-ink-foreground/30"}`}>{x} {x !== "Todos" && "▾"}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <CarCard c={main} big />
          <div className="grid gap-4 sm:grid-cols-2">{rest.map((c, i) => <CarCard key={i} c={c} />)}</div>
        </div>
        <div className="mt-10 text-center"><Btn href="#autos" onClick={() => track("down_payment_inventory_cta")}>Ver todos los autos</Btn></div>
      </div>
    </section>
  );
}

function CarCard({ c, big }: { c: (typeof CARS)[number]; big?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-background text-ink">
      <img src={c.img} alt={`${c.marca} ${c.modelo} ${c.anio}`} loading="lazy" width={1024} height={768} className={`w-full object-cover ${big ? "aspect-[4/3]" : "aspect-[16/10]"}`} />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.marca} · {c.anio}</p>
        <h3 className={`font-extrabold ${big ? "text-2xl" : "text-lg"}`}>{c.modelo}</h3>
        <p className={`mt-1 font-extrabold text-primary ${big ? "text-3xl" : "text-xl"}`}>{mxn(c.precio)}</p>
        <p className="mt-2 text-xs text-muted-foreground">{c.km.toLocaleString("es-MX")} km · {c.ubic}<br />{c.dealer}</p>
        <a href="#autos" onClick={() => track("down_payment_vehicle_click", { modelo: c.modelo })} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink text-sm font-bold hover:bg-ink hover:text-ink-foreground">Ver auto</a>
      </div>
    </article>
  );
}

function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Preguntas frecuentes sobre enganche">
      <div className="divide-y divide-border border-y border-border">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group py-2" onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && track("down_payment_faq_open", { q })}>
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink">
              {q}<span className="text-2xl text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-4 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function CtaFinal() {
  return (
    <section className="bg-primary px-5 py-16 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">Entiende tu enganche.<br />Después encuentra tu auto.</h2>
        <p className="mt-4 opacity-90">Explora vehículos publicados por agencias y dealers en Seminuevos.com.</p>
        <div className="mt-8"><Btn href="#autos" variant="white">Explorar autos</Btn></div>
        <p className="mt-6 text-xs opacity-80">Consulta directamente con el vendedor las condiciones aplicables al vehículo que te interesa.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <Logo />
        <p className="mt-4 max-w-3xl text-xs text-muted-foreground">
          Seminuevos.com es un portal de anuncios. No determina enganches, porcentajes, condiciones de pago, mensualidades o aprobaciones. La información presentada en esta página tiene fines educativos.
        </p>
      </div>
    </footer>
  );
}
