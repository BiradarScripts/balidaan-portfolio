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
    description: "Forecasting market states with LSTM, Transformer, and Mamba models inside a reproducible offline evaluation pipeline.",
    stack: "Python / PyTorch / Docker",
    impact: "R² up to 0.3648",
    color: "#f97316",
  },
  {
    title: "Multimodal VQA",
    category: "Deep Learning",
    year: "2025",
    description: "A 13-version LoRA pipeline with stronger evaluation across 169,659 curated images.",
    stack: "PyTorch / BLIP / LoRA",
    impact: "EM +7.25 points",
    color: "#22d3ee",
  },
  {
    title: "LedgerShield",
    category: "AI Security",
    year: "2026",
    description: "A multimodal accounts payable audit system designed to stress-test enterprise DocAI workflows.",
    stack: "Python / OCR / Agent Eval",
    impact: "Enterprise audit focus",
    color: "#a78bfa",
  },
  {
    title: "Braille",
    category: "Accessibility",
    year: "2025",
    description: "Handwritten capture, custom parsing, and AI summarization for accessibility-first note transfer.",
    stack: "Next.js / FastAPI / Gemini",
    impact: "Zurich collaboration",
    color: "#34d399",
  },
  {
    title: "Vaani X",
    category: "NLP",
    year: "2024",
    description: "Kannada audio to usable insight with Whisper, fine-tuned LLaMA, and real-time ingestion.",
    stack: "Whisper / LLaMA / AWS Kinesis",
    impact: "Voice + text UX",
    color: "#fbbf24",
  },
  {
    title: "EconeXus",
    category: "Full Stack",
    year: "2023",
    description: "A MERN platform for interest-based networking with scalable APIs, feeds, and future-ready system design.",
    stack: "React / Node / MongoDB",
    impact: "1.2K+ users served",
    color: "#f472b6",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = trackRef.current.querySelectorAll(".project-card")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      const track = trackRef.current
      const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
      const cardWidth = 420 + 24
      const startBuffer = containerWidth < 768 ? 40 : 80
      const endBuffer = containerWidth < 768 ? 40 : 80
      const scrollAmount = (experiments.length * cardWidth) - (containerWidth - startBuffer) + endBuffer

      gsap.set(track, { x: startBuffer })

      const tween = gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollAmount}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const cardIndex = Math.min(
              Math.floor(progress * experiments.length),
              experiments.length - 1
            )
            setActiveIndex(cardIndex)
          },
        },
      })

      return () => tween.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative bg-background">
      <div className="py-20 pl-6 pr-6 md:pl-28 md:pr-12">
        <div ref={headerRef} className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Projects</span>
            <h2 className="mt-4 text-5xl tracking-tight md:text-7xl">SELECTED WORK</h2>
          </div>
          <p className="hidden max-w-sm font-mono text-xs leading-relaxed text-muted-foreground md:block md:text-right">
            Six projects that best represent how I build across research, infra, accessibility, and product delivery.
          </p>
        </div>
      </div>

      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-6 md:px-16 h-full"
        >
          {experiments.map((project, index) => (
            <article
              key={project.title}
              className="project-card group relative flex-shrink-0 w-[65vw] md:w-[420px] h-[38vh] min-h-[320px] max-h-[360px] overflow-hidden border border-border/30 bg-card/60 transition-all duration-500"
              style={{
                transform: activeIndex === index ? "scale(1)" : activeIndex < index ? "scale(0.92) translateX(30px)" : "scale(0.92) translateX(-30px)",
                opacity: activeIndex === index ? 1 : 0.5,
                zIndex: activeIndex === index ? 10 : 1,
              }}
            >
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%)`,
                }}
              />
              
              <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
                <span style={{ color: project.color }}>{project.category}</span>
                <span>/</span>
                <span>{project.year}</span>
              </div>

              <div className="absolute -right-10 -bottom-6 text-[7rem] leading-none font-bold tracking-tighter transition-transform duration-700 group-hover:translate-x-[-20px] group-hover:translate-y-[-10px]"
                style={{ color: project.color, opacity: 0.12 }}>
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-300 group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.split(" / ").map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border border-border/40 text-muted-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/50">Outcome</p>
                      <p className="mt-1 text-lg font-medium" style={{ color: project.color }}>
                        {project.impact}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center border border-border/40 transition-all duration-300 group-hover:bg-accent group-hover:border-accent">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-background" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {experiments.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const track = trackRef.current
                if (!track) return
                const containerWidth = window.innerWidth
                const cardWidth = 420 + 24
                const startBuffer = containerWidth < 768 ? 40 : 80
                const endBuffer = containerWidth < 768 ? 40 : 80
                const totalScroll = (experiments.length * cardWidth) - (containerWidth - startBuffer) + endBuffer
                const targetX = startBuffer - (totalScroll / (experiments.length - 1)) * index
                gsap.to(track, {
                  x: targetX,
                  duration: 1,
                  ease: "power3.out",
                })
                setActiveIndex(index)
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-accent"
                  : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}