"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiments = [
  {
    title: "Quant-Gambit",
    category: "ML Research",
    year: "2025",
    description:
      "Forecasting market states with LSTM, Transformer, and Mamba models inside a reproducible offline evaluation pipeline.",
    stack: ["Python", "PyTorch", "Docker"],
    impact: "R2 up to 0.3648",
    proof: "Offline backtesting lab",
    color: "#f97316",
  },
  {
    title: "Multimodal VQA",
    category: "Deep Learning",
    year: "2025",
    description: "A 13-version LoRA pipeline with stronger evaluation across 169,659 curated images.",
    stack: ["PyTorch", "BLIP", "LoRA"],
    impact: "EM +7.25 points",
    proof: "169,659-image corpus",
    color: "#22d3ee",
  },
  {
    title: "LedgerShield",
    category: "AI Security",
    year: "2026",
    description: "A multimodal accounts payable audit system designed to stress-test enterprise DocAI workflows.",
    stack: ["Python", "OCR", "Agent Eval"],
    impact: "Enterprise audit focus",
    proof: "DocAI stress testing",
    color: "#a78bfa",
  },
  {
    title: "Braille",
    category: "Accessibility",
    year: "2025",
    description: "Handwritten capture, custom parsing, and AI summarization for accessibility-first note transfer.",
    stack: ["Next.js", "FastAPI", "Gemini"],
    impact: "Zurich collaboration",
    proof: "Assistive workflow",
    color: "#34d399",
  },
  {
    title: "Vaani X",
    category: "NLP",
    year: "2024",
    description: "Kannada audio to usable insight with Whisper, fine-tuned LLaMA, and real-time ingestion.",
    stack: ["Whisper", "LLaMA", "AWS Kinesis"],
    impact: "Voice + text UX",
    proof: "Streaming speech system",
    color: "#fbbf24",
  },
  {
    title: "EconeXus",
    category: "Full Stack",
    year: "2023",
    description: "A MERN platform for interest-based networking with scalable APIs, feeds, and future-ready system design.",
    stack: ["React", "Node", "MongoDB"],
    impact: "1.2K+ users served",
    proof: "Production product",
    color: "#f472b6",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const desktopTweenRef = useRef<gsap.core.Tween | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !stageRef.current || !trackRef.current || !progressRef.current) return

    const track = trackRef.current
    const stage = stageRef.current
    const progressBar = progressRef.current
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".sample-card"))

    const setProgress = (progress: number) => {
      progressBar.style.transformOrigin = "left center"
      progressBar.style.transform = `scaleX(${progress})`
    }

    const updateNativeRailState = () => {
      const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth)
      const progress = track.scrollLeft / maxScroll
      const closestIndex = cards.reduce(
        (closest, card, index) => {
          const distance = Math.abs(card.offsetLeft - track.scrollLeft)
          return distance < closest.distance ? { index, distance } : closest
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index

      setActiveIndex(closestIndex)
      setProgress(progress)
    }

    track.addEventListener("scroll", updateNativeRailState, { passive: true })
    updateNativeRailState()

    let mm: ReturnType<typeof gsap.matchMedia> | null = null

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        ".sample-card",
        { y: 70, opacity: 0, rotateX: -8, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      mm = gsap.matchMedia()
      mm.add("(min-width: 1024px)", () => {
        const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth)
        const getEnd = () => `+=${Math.max(900, getDistance() + window.innerHeight * 0.85)}`
        const quickCards = cards.map((card) => ({
          opacity: gsap.quickTo(card, "opacity", { duration: 0.24, ease: "power2.out" }),
          y: gsap.quickTo(card, "y", { duration: 0.24, ease: "power2.out" }),
        }))

        gsap.set(track, { x: 0 })

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: getEnd,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              const active = Math.min(experiments.length - 1, Math.round(progress * (experiments.length - 1)))
              const targetPosition = progress * (experiments.length - 1)

              setActiveIndex(active)
              setProgress(progress)

              quickCards.forEach((setter, index) => {
                const distance = Math.abs(index - targetPosition)
                const focus = Math.max(0, 1 - distance * 0.36)

                setter.opacity(0.55 + focus * 0.45)
                setter.y(distance < 0.6 ? -8 : 18)
              })
            },
          },
        })

        desktopTweenRef.current = tween

        gsap.to(".sample-motion-beam", {
          xPercent: 150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })

        return () => {
          desktopTweenRef.current = null
          gsap.set(track, { clearProps: "transform" })
          gsap.set(cards, { clearProps: "opacity" })
        }
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => {
      track.removeEventListener("scroll", updateNativeRailState)
      mm?.revert()
      ctx.revert()
    }
  }, [])

  const jumpToProject = (index: number) => {
    const track = trackRef.current
    const card = trackRef.current?.querySelectorAll<HTMLElement>(".sample-card")[index]
    const scrollTrigger = desktopTweenRef.current?.scrollTrigger

    if (scrollTrigger) {
      const progress = index / Math.max(1, experiments.length - 1)
      window.scrollTo({ top: scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress, behavior: "smooth" })
    } else if (track && card) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
    }
    setActiveIndex(index)
  }

  return (
    <section ref={sectionRef} id="work" className="relative bg-background">
      <div className="sample-work-shell min-h-screen py-16 pl-6 pr-6 md:py-18 md:pl-28 md:pr-12 xl:py-20">
        <div ref={headerRef} className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Sample Work</span>
            <h2 className="sample-work-title mt-4 text-5xl tracking-normal md:text-6xl xl:text-7xl">SAMPLE WORK</h2>
          </div>
          <div>
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              Six sample builds that show research depth, infra discipline, accessibility thinking, and product delivery.
            </p>
            <div className="mt-6 h-px w-full bg-border/60">
              <div ref={progressRef} className="h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200" />
            </div>
          </div>
        </div>

        <div ref={stageRef} className="sample-work-stage relative mt-10 overflow-hidden pb-10 md:mt-12">
          <div className="sample-motion-beam pointer-events-none absolute -left-1/2 top-10 z-10 h-24 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.055] to-transparent" />
          <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-px w-full bg-gradient-to-r from-accent/70 via-border/60 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-36 bg-gradient-to-l from-background to-transparent md:block" />

          <div
            ref={trackRef}
            data-testid="sample-track"
            className="sample-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pr-8 [scrollbar-width:none] md:gap-6 md:pr-[22vw] lg:overflow-visible lg:pr-0"
            style={{ msOverflowStyle: "none" }}
          >
            {experiments.map((project, index) => (
              <article
                key={project.title}
                data-testid={`sample-card-${index + 1}`}
                className={`sample-card group relative flex min-h-[29rem] w-[min(86vw,24rem)] flex-shrink-0 snap-start flex-col justify-between overflow-hidden border bg-card/58 p-5 backdrop-blur-xl transition-colors duration-500 md:min-h-[27rem] md:w-[min(44vw,32rem)] md:p-6 lg:min-h-[29rem] lg:w-[34rem] xl:min-h-[31rem] 2xl:w-[36rem] ${
                  activeIndex === index ? "border-foreground/35" : "border-border/35 hover:border-accent/50"
                }`}
              >
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}24 0%, transparent 46%), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: "100% 100%, 48px 48px, 48px 48px",
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div
                  className="absolute -bottom-2 right-5 text-[9rem] font-semibold leading-none tracking-normal opacity-[0.09] transition-transform duration-700 group-hover:-translate-y-3 md:text-[12rem]"
                  style={{ color: project.color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: project.color }}>
                        {project.category}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{project.year}</p>
                    </div>
                    <span className="border border-border/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {project.proof}
                    </span>
                  </div>

                  <h3 className="mt-8 max-w-[13ch] text-4xl tracking-normal text-foreground transition-colors duration-300 group-hover:text-white md:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md font-mono text-xs leading-relaxed text-muted-foreground md:text-[13px]">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-8">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border/45 bg-background/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/75"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-5 border-t border-border/40 pt-5">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">Outcome</p>
                      <p className="mt-2 text-2xl tracking-normal md:text-3xl" style={{ color: project.color }}>
                        {project.impact}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-border/45 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-background" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 md:mt-0">
            {experiments.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => jumpToProject(index)}
                aria-label={`Jump to ${project.title}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-9 bg-accent" : "w-2 bg-border hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
