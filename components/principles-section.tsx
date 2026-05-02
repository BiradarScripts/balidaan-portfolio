"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: "01",
    title: "Infra First",
    description: "I like systems that can move from experiments into services without falling apart when usage becomes real.",
    tools: ["FastAPI", "Docker", "PostgreSQL", "AWS EKS"],
  },
  {
    number: "02",
    title: "Multimodal by Default",
    description: "My best work sits where images, text, handwriting, and speech all have to cooperate instead of living in isolation.",
    tools: ["BLIP", "LoRA", "Whisper", "LangChain"],
  },
  {
    number: "03",
    title: "Research That Ships",
    description: "I care about metrics, ablations, and diagnostics, but I care even more about whether the work survives contact with users.",
    tools: ["PyTorch", "Transformers", "Mamba", "Pandas"],
  },
  {
    number: "04",
    title: "Product Speed",
    description: "From hackathons to internships, I move quickly without treating polish, readability, or scale as optional extras.",
    tools: ["Next.js", "React", "Node.js", "MongoDB"],
  },
]

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        gsap.from(article, {
          x: index % 2 === 0 ? -70 : 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Edge</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl tracking-tight md:text-7xl">HOW BALIDAAN BUILDS</h2>
        <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          Four principles that keep my work grounded: durable systems, multimodal thinking, honest research, and product speed.
        </p>
      </div>

      <div ref={principlesRef} className="grid gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <article key={pillar.number} className="panel-sheen relative overflow-hidden border border-border/45 bg-card/55 p-6 backdrop-blur-sm md:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{pillar.number}</span>
              <div className="h-px w-14 bg-border/60" />
            </div>

            <h3 className="mt-8 font-[var(--font-bebas)] text-4xl tracking-tight md:text-5xl">{pillar.title}</h3>
            <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {pillar.tools.map((tool) => (
                <span
                  key={tool}
                  className="border border-border/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80"
                >
                  {tool}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
