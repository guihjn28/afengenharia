import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  Zap,
  ShieldCheck,
  Heart,
  Wifi,
  Eye,
  Sparkles,
  FileText,
  ClipboardCheck,
  Search,
  Building2,
  Lightbulb,
  Mail,
  MapPin,
  Instagram,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero-engenheira.png";
import logoAF from "@/assets/logo-af.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP =
  "https://wa.me/5511930708103?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20com%20a%20AF%20Engenharia";

const services = [
  { icon: FileText, title: "Emissão de ART", desc: "Anotação de Responsabilidade Técnica conforme a atividade realizada, com agilidade e respaldo legal." },
  { icon: ClipboardCheck, title: "Laudos Técnicos", desc: "Relatórios técnicos detalhados para regularização, financiamento, perícias e processos judiciais." },
  { icon: Search, title: "Vistorias", desc: "Inspeção técnica de imóveis residenciais e comerciais, com avaliação criteriosa e profissional." },
  { icon: Building2, title: "Regularização de Imóveis", desc: "Orientação completa e suporte técnico para regularizar seu imóvel junto aos órgãos competentes." },
  { icon: Lightbulb, title: "Consultoria Técnica", desc: "Apoio estratégico em decisões técnicas para reformas, obras e adequação às normas vigentes." },
];

const diferenciais = [
  { icon: Zap, title: "Atendimento ágil", desc: "Resposta rápida e processos enxutos para você não perder tempo." },
  { icon: ShieldCheck, title: "Segurança técnica", desc: "Documentação em conformidade com as normas e órgãos reguladores." },
  { icon: Heart, title: "Atendimento humanizado", desc: "Você fala diretamente com a engenheira responsável." },
  { icon: Wifi, title: "Suporte online", desc: "Grande parte do atendimento feita via WhatsApp, com praticidade." },
  { icon: Eye, title: "Transparência", desc: "Orçamento claro, sem compromisso e sem surpresas no processo." },
  { icon: Sparkles, title: "Soluções acessíveis", desc: "Soluções técnicas adequadas ao porte e necessidade do seu projeto." },
];

const faqs = [
  { q: "Como funciona a emissão da ART?", a: "Você nos envia os dados da obra ou serviço, conferimos a documentação e emitimos a ART junto ao CREA, enviando o comprovante por e-mail ou WhatsApp." },
  { q: "Quanto tempo demora?", a: "A maioria das ARTs simples é emitida em até 24 horas úteis após o envio dos dados e confirmação do pagamento." },
  { q: "Vocês atendem online?", a: "Sim. Grande parte do atendimento é feito 100% online via WhatsApp e e-mail, com agilidade e praticidade." },
  { q: "Quais documentos são necessários?", a: "Em geral: RG/CPF do contratante, endereço da obra e descrição da atividade. Em casos específicos podemos pedir documentos adicionais." },
  { q: "Vocês fazem regularização de imóveis?", a: "Sim. Orientamos e acompanhamos todo o processo de regularização junto aos órgãos competentes." },
  { q: "Como solicitar um orçamento?", a: "Clique em qualquer botão de WhatsApp deste site e converse diretamente com a engenheira responsável." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#" className="flex items-center gap-2">
            <img
              src={logoAF}
              alt="AF Engenharia - Aline Ferreira"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30 shadow-sm"
            />
            <div className="leading-tight">
              <p className="font-serif text-base text-foreground">AF Engenharia</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Perícias Técnicas</p>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#sobre" className="hover:text-primary transition">Sobre</a>
            <a href="#servicos" className="hover:text-primary transition">Serviços</a>
            <a href="#diferenciais" className="hover:text-primary transition">Diferenciais</a>
            <a href="#faq" className="hover:text-primary transition">FAQ</a>
            <a href="#contato" className="hover:text-primary transition">Contato</a>
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <Button className="btn-pulse rounded-full bg-[#25D366] text-white hover:bg-[#1ebe57]">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-0">
        <div className="relative grid md:min-h-screen md:grid-cols-2">
          {/* Image - shows on top on mobile */}
          <div className="relative order-first h-[60vh] min-h-[420px] md:order-last md:h-auto">
            <img
              src={heroImg}
              alt="Engenheira responsável segurando plantas em obra"
              width={1536}
              height={1536}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent md:bg-gradient-to-r md:from-background md:via-background/40 md:to-transparent" />
          </div>

          <div className="relative z-10 flex items-center px-5 py-12 md:px-12 md:py-24 lg:px-20">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Engenharia & Perícias Técnicas
              </span>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Soluções técnicas com{" "}
                <em className="text-primary not-italic md:italic font-serif">precisão e confiança</em>
              </h1>
              <p className="mt-6 text-base text-muted-foreground md:text-lg">
                Emissão de ART, laudos técnicos, vistorias, regularização de imóveis e consultoria — com atendimento ágil, humanizado e online.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="btn-pulse rounded-full bg-[#25D366] text-white hover:bg-[#1ebe57]">
                    <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
                  </Button>
                </a>
                <a href="#servicos">
                  <Button size="lg" variant="outline" className="rounded-full border-foreground/30">
                    Nossos serviços
                  </Button>
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/70 pt-6">
                {[
                  ["Ágil", "Atendimento"],
                  ["Online", "Suporte"],
                  ["Grátis", "Orçamento"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="font-serif text-2xl text-primary">{k}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price highlight */}
      <section className="border-y border-border/70 bg-gradient-to-r from-accent/40 via-secondary to-accent/40">
        <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/20 bg-card p-6 shadow-[var(--shadow-warm)] md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">A partir de</p>
                <p className="font-serif text-3xl text-foreground md:text-4xl">
                  R$ 100,00 <span className="text-base font-sans text-muted-foreground">/ emissão de ART simples</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  *Taxa do CREA <strong className="text-foreground">não inclusa</strong> nesse valor. Válido somente para emissão de ART simples.
                </p>
              </div>
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button className="btn-pulse rounded-full bg-[#25D366] text-white hover:bg-[#1ebe57]">
                <MessageCircle className="h-4 w-4" /> Solicitar orçamento
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Sobre a AF</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Engenharia técnica com um olhar humano
            </h2>
            <p className="mt-6 text-muted-foreground">
              A AF Engenharia e Perícias Técnicas nasce do compromisso com a transparência, a precisão técnica e o cuidado em cada atendimento. Apoiamos pessoas físicas, construtoras, arquitetos e proprietários na regularização e documentação de seus imóveis — com soluções práticas, acessíveis e sob orientação direta de engenheira responsável.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Técnica", "Precisão", "Confiança"].map((t) => (
                <span key={t} className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-secondary/40 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Nossos serviços</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Soluções completas em engenharia
            </h2>
            <p className="mt-4 text-muted-foreground">
              Atendemos pessoas físicas, empresas, construtoras, arquitetos e engenheiros com soluções práticas e personalizadas.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="group flex flex-col rounded-2xl border border-border/60 bg-card p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-warm)]">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.desc}</p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Solicitar orçamento →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Diferenciais</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Por que escolher a AF Engenharia
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border md:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d) => (
              <div key={d.title} className="bg-card p-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <d.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-pulse rounded-full bg-[#25D366] text-white hover:bg-[#1ebe57]">
                <MessageCircle className="h-4 w-4" /> Solicitar orçamento sem compromisso
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary/40 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-primary">Perguntas frequentes</p>
          <h2 className="mt-4 text-center font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Tire suas dúvidas
          </h2>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border/60 bg-card px-5">
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-gradient-to-br from-accent/40 to-secondary p-10 text-center shadow-[var(--shadow-warm)] md:p-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Vamos conversar</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Pronta para atender você
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Solicite um orçamento sem compromisso. Atendemos online e presencialmente conforme disponibilidade.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-pulse rounded-full bg-[#25D366] text-white hover:bg-[#1ebe57]">
                <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp agora
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/70 bg-foreground/[0.03] px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          <div>
            <p className="font-serif text-xl text-foreground">AF Engenharia</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Perícias Técnicas</p>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span><span className="block text-muted-foreground">WhatsApp</span>(11) 93070-8103</span>
          </a>
          <a href="mailto:afart.engenharia@gmail.com" className="flex gap-3 text-sm">
            <Mail className="h-5 w-5 text-primary" />
            <span><span className="block text-muted-foreground">E-mail</span>afart.engenharia@gmail.com</span>
          </a>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span><span className="block text-muted-foreground">Localização</span>Vargem Grande Paulista – SP</span>
            </div>
            <a href="https://instagram.com/afartconsultoria" target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-primary transition">
              <Instagram className="h-5 w-5 text-primary" />
              <span>@afartconsultoria</span>
            </a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">© {new Date().getFullYear()} AF Engenharia & Perícias Técnicas. Todos os direitos reservados.</p>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="btn-pulse fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe57]"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
