"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BrainCircuit, Code2, Landmark, Medal, Rocket, ShieldCheck, Trophy } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const wins = [
  {
    name: "Meta x Hugging Face Hackathon 2026",
    result: "Top 100",
    sub: "India's Largest AI Hackathon",
    build: "31,000 teams, 52,000+ developers",
    kind: "Rank",
    accent: "#c084fc",
    icon: Trophy,
  },
  {
    name: "Amazon ML Challenge",
    result: "AIR 156",
    sub: "Best 15",
    build: "Image + text price intelligence",
    kind: "Rank",
    accent: "#c084fc",
    icon: BrainCircuit,
  },
  {
    name: "Flipkart Grid 6.0",
    result: "2nd Runner-up",
    sub: "Retail CV",
    build: "Freshness, MRP, expiry detection",
    kind: "Podium",
    accent: "#a78bfa",
    icon: Medal,
  },
  {
    name: "Accenture Innovation",
    result: "Winner",
    sub: "Launch OS",
    build: "Sites, ads, and CI/CD from AI",
    kind: "Win",
    accent: "#8b5cf6",
    icon: Rocket,
  },
  {
    name: "RBIH x Canara Codeathon",
    result: "Winner",
    sub: "Banking ID",
    build: "AI-driven MSME identity creation",
    kind: "Win",
    accent: "#d8b4fe",
    icon: Landmark,
  },
  {
    name: "Google GenAI Exchange",
    result: "Top 5 Finalist",
    sub: "Code Gen",
    build: "Natural-language code generator",
    kind: "Finalist",
    accent: "#b794f4",
    icon: Code2,
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeWin = wins[activeIndex]
  const ActiveIcon = activeWin.icon

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const quickX = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" })
    const quickY = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" })

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect()

      quickX(event.clientX - rect.left)
      quickY(event.clientY - rect.top)
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
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        ".win-motion",
        { opacity: 0, y: 46, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(".win-scanline", {
        xPercent: 140,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="signals"
      ref={sectionRef}
      data-testid="latest-wins-section"
      className="relative isolate overflow-hidden py-20 pl-6 pr-6 md:py-24 md:pl-28 md:pr-12"
    >
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-40 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 border-l border-t border-accent/30 md:block",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="win-scanline pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div ref={headerRef} className="mx-auto mb-12 max-w-6xl text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent">01 / Wins</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-6xl leading-none tracking-normal text-[#eadcff] md:text-8xl xl:text-9xl">
          Latest
          <span className="text-accent"> wins</span>
        </h2>

        <div className="win-motion mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-px border border-border/40 bg-border/40 text-left">
          {[
            ["03", "wins"],
            ["01", "podium"],
            ["03", "ranked"],
            ["06", "total"],
          ].map(([value, label]) => (
            <div key={label} className="bg-background/86 px-4 py-4">
              <p className="text-4xl leading-none tracking-normal text-foreground">{value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(20rem,0.84fr)_minmax(0,1.16fr)]">
        <article className="win-motion relative min-h-[28rem] overflow-hidden border border-border/45 bg-card/52 p-5 backdrop-blur-xl md:p-6">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: `linear-gradient(120deg, ${activeWin.accent}24, transparent 44%), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 52px 52px, 52px 52px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute -right-10 top-10 h-[24rem] w-px rotate-[32deg] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-5 right-5 text-[10rem] leading-none tracking-normal opacity-[0.055] md:text-[14rem]">
            {String(activeIndex + 1).padStart(2, "0")}
          </div>

          <div className="relative z-10 flex min-h-[24rem] flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-border/55 bg-background/55">
                  <ActiveIcon className="h-5 w-5" style={{ color: activeWin.accent }} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: activeWin.accent }}>
                    Active signal
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{activeWin.kind}</p>
                </div>
              </div>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{activeWin.name}</p>
              <h3 className="mt-4 max-w-xl text-5xl leading-none tracking-normal md:text-7xl">{activeWin.result}</h3>
              <p className="mt-4 max-w-md text-xl tracking-normal text-foreground/86">{activeWin.build}</p>
            </div>

            <div className="grid grid-cols-2 gap-px border border-border/40 bg-border/40">
              <div className="bg-background/86 px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Signal</p>
                <p className="mt-2 text-lg tracking-normal text-foreground">{activeWin.sub}</p>
              </div>
              <div className="bg-background/86 px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Proof</p>
                <p className="mt-2 text-lg tracking-normal" style={{ color: activeWin.accent }}>
                  {activeWin.kind}
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="win-motion grid gap-3">
          {wins.map((win, index) => {
            const Icon = win.icon
            const isActive = index === activeIndex

            return (
              <button
                key={win.name}
                type="button"
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group grid min-h-[5.7rem] grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border bg-card/45 px-4 py-3 text-left backdrop-blur-xl transition-all duration-300",
                  isActive ? "translate-x-0 border-foreground/45" : "border-border/35 hover:border-foreground/30 xl:-translate-x-3 xl:hover:translate-x-0",
                )}
                style={isActive ? { borderColor: `${win.accent}88` } : undefined}
              >
                <span className="flex h-10 w-10 items-center justify-center border border-border/45 bg-background/55">
                  <Icon className="h-4 w-4" style={{ color: win.accent }} />
                </span>
                <span>
                  <span className="block text-2xl tracking-normal text-foreground">{win.name}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{win.sub}</span>
                </span>
                <span className="text-right">
                  <span className="block text-xl tracking-normal" style={{ color: win.accent }}>
                    {win.result}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{win.kind}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
