"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, BrainCircuit, Medal, Rocket, ShieldCheck, Trophy } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const leadSignal = {
  date: "2024 - 2025",
  label: "Hackathon dossier",
  title: "National-stage proof",
  note: "Five high-signal competitions across multimodal ML, retail computer vision, startup automation, banking identity, and GenAI code tools.",
  value: "5",
  meta: "3 wins / 1 podium / 1 top-5 finalist",
  proof: "Competition signal",
  accent: "#f97316",
  icon: Trophy,
}

const signals = [
  {
    date: "2024",
    label: "Amazon ML Challenge",
    title: "AIR 156",
    note: "Built a multimodal price predictor using product images and text, finishing AIR 156 and inside the best 15.",
    value: "156",
    meta: "AIR / best 15",
    proof: "Image + text price ML",
    accent: "#f97316",
    icon: BrainCircuit,
  },
  {
    date: "2024",
    label: "Computer vision",
    title: "Flipkart Grid 6.0",
    note: "Built ML models for food freshness, MRP, and expiry detection, finishing as 2nd Runner-up.",
    value: "02",
    meta: "2nd runner-up",
    proof: "Retail CV stack",
    accent: "#34d399",
    icon: Medal,
  },
  {
    date: "2024",
    label: "Accenture Innovation Challenge",
    title: "Winner",
    note: "Created an AI tool that helped startups auto-launch sites, ads, and CI/CD pipelines.",
    value: "01",
    meta: "winner",
    proof: "Startup launch automation",
    accent: "#fbbf24",
    icon: Rocket,
  },
  {
    date: "2024",
    label: "RBIH x Canara Bank Codeathon",
    title: "Winner",
    note: "Designed an AI-driven MSME ID creation system for banking identity workflows.",
    value: "01",
    meta: "winner",
    proof: "MSME identity AI",
    accent: "#a78bfa",
    icon: ShieldCheck,
  },
  {
    date: "2024",
    label: "Google GenAI Exchange",
    title: "Top 5 Finalist",
    note: "Built a natural-language-based code generator and placed as a finalist in the top five.",
    value: "05",
    meta: "finalist",
    proof: "NL code generation",
    accent: "#22d3ee",
    icon: Award,
  },
]

type Signal = (typeof signals)[number]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      gsap.to(cursor, {
        x,
        y,
        duration: 0.25,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        ".signal-motion",
        { opacity: 0, y: 52, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(".signal-sweep", {
        xPercent: 120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const LeadIcon = leadSignal.icon

  return (
    <section id="signals" ref={sectionRef} className="relative isolate overflow-hidden py-20 pl-6 pr-6 md:py-24 md:pl-28 md:pr-12">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-40 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 border-l border-t border-accent/30 md:block",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="signal-sweep pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-24 hidden h-2/3 w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent md:block" />

      <div ref={headerRef} className="mb-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-end">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Wins</span>
          <h2 className="mt-4 max-w-4xl text-5xl tracking-normal md:text-6xl xl:text-7xl">LATEST WINS</h2>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
            The real hackathon record: exact outcomes, exact problem spaces, and the kind of builds that survive judges.
          </p>
        </div>

        <div className="signal-motion border border-border/45 bg-background/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Competition window</p>
            <ShieldCheck className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 text-3xl tracking-normal text-foreground md:text-4xl">2024 - 2025</p>
          <div className="mt-4 grid grid-cols-3 gap-px border border-border/40 bg-border/40">
            {["3 wins", "AIR 156", "Top 5"].map((item) => (
              <span key={item} className="bg-background/90 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(21rem,0.82fr)_minmax(0,1.18fr)]">
        <article className="signal-motion panel-sheen relative overflow-hidden border border-border/45 bg-card/55 p-6 backdrop-blur-xl md:p-7">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `linear-gradient(135deg, ${leadSignal.accent}1d 0%, transparent 44%), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 44px 44px, 44px 44px",
            }}
          />
          <div className="relative z-10 flex min-h-[24rem] flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center border border-accent/45 bg-accent/10">
                    <LeadIcon className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{leadSignal.label}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{leadSignal.date}</p>
                  </div>
                </div>
                <span className="border border-border/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  verified signal
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-6">
                <p className="flex h-28 w-28 items-center justify-center border border-accent/45 bg-accent/10 text-7xl leading-none tracking-normal text-foreground md:h-32 md:w-32 md:text-8xl">
                  {leadSignal.value}
                </p>
                <div className="max-w-xl border-l border-border/45 pl-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{leadSignal.meta}</p>
                  <h3 className="mt-3 text-4xl tracking-normal md:text-5xl">{leadSignal.title}</h3>
                  <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">{leadSignal.note}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-px border border-border/40 bg-border/40 sm:grid-cols-2">
              {signals.map((win) => (
                <div key={win.label} className="bg-background/88 px-4 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{win.label}</p>
                  <p className="mt-2 text-sm text-foreground/88">{win.title}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          {signals.map((signal, index) => (
            <SignalCard key={signal.label} signal={signal} index={index} />
          ))}
        </div>
      </div>

      <div className="signal-motion mt-5 grid gap-px border border-border/40 bg-border/40 md:grid-cols-5">
        {signals.map((signal, index) => (
          <div key={signal.label} className="bg-background/82 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-border/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: signal.accent }}>
                {signal.date}
              </span>
            </div>
            <p className="mt-4 text-xl tracking-normal text-foreground">{signal.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SignalCard({ signal, index }: { signal: Signal; index: number }) {
  const Icon = signal.icon

  return (
    <article className="signal-motion group panel-sheen relative overflow-hidden border border-border/45 bg-card/55 p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/55 md:p-5">
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(120deg, ${signal.accent}1f, transparent 55%)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 grid gap-4 md:grid-cols-[5.75rem_minmax(0,1fr)] md:items-stretch">
        <div className="flex items-start justify-between gap-4 border-b border-border/35 pb-4 md:flex-col md:border-b-0 md:border-r md:pb-0 md:pr-5">
          <span className="flex h-9 w-9 items-center justify-center border border-border/50 bg-background/60 transition-colors duration-300 group-hover:border-accent/60">
            <Icon className="h-4 w-4" style={{ color: signal.accent }} />
          </span>
          <div>
            <p className="text-3xl leading-none tracking-normal text-foreground">{signal.value}</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{signal.meta}</p>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: signal.accent }}>
                {signal.label}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{signal.date}</p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-5 text-2xl tracking-normal transition-colors duration-300 group-hover:text-accent md:text-3xl">
            {signal.title}
          </h3>
          <p className="mt-3 max-w-md font-mono text-xs leading-relaxed text-muted-foreground md:text-[11px]">
            {signal.note}
          </p>

          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <div className="h-px w-10 transition-all duration-300 group-hover:w-16" style={{ backgroundColor: signal.accent }} />
            {signal.proof}
          </div>
        </div>
      </div>
    </article>
  )
}
