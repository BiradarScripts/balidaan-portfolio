"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: "Summer Research Intern",
    company: "Krutrim AI (OLA)",
    location: "Bengaluru, India",
    period: "May 2025 – Jul 2025",
    highlights: [
      "Engineered a Dockerized SQL ETL pipeline to asynchronously ingest ~20k multilingual records into PostgreSQL",
      "Deployed ML models as high-throughput FastAPI microservices for real-time automated data tagging",
      "Orchestrated AWS EKS to serve a fine-tuned Krutrim 2.1, integrating scalable inference endpoints into the backend",
    ],
  },
  {
    role: "Software Developer Engineer Intern",
    company: "Think LogiTech Solutions Private Limited",
    location: "Bengaluru, India",
    period: "Jun 2024 – Sep 2024",
    highlights: [
      "Contributed to a PG management platform for 100+ properties, building and maintaining payment integrations",
      "Collaborated with 4+ cross-functional teams to ship features used by 1.2K+ users",
    ],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !itemsRef.current) return

    const ctx = gsap.context(() => {
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

      const articles = itemsRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        gsap.from(article, {
          x: index % 2 === 0 ? -80 : 80,
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
    <section ref={sectionRef} id="experience" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div className="grid gap-10 xl:grid-cols-[20rem_minmax(0,1fr)] xl:items-start">
        <div ref={headerRef} className="xl:sticky xl:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Experience</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl tracking-tight md:text-7xl">WHERE I&apos;VE WORKED</h2>
          <p className="mt-5 max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
            I like roles where research, backend systems, and product speed all have to meet in the same room.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="panel-sheen border border-border/45 bg-card/55 p-4 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Production</p>
              <p className="mt-3 font-[var(--font-bebas)] text-4xl tracking-[0.08em] text-foreground">FastAPI</p>
            </div>
            <div className="panel-sheen border border-border/45 bg-card/55 p-4 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Infra</p>
              <p className="mt-3 font-[var(--font-bebas)] text-4xl tracking-[0.08em] text-foreground">AWS EKS</p>
            </div>
          </div>
        </div>

        <div ref={itemsRef} className="space-y-6">
          {experiences.map((exp, index) => (
            <article key={index} className="panel-sheen relative overflow-hidden border border-border/45 bg-card/55 p-6 backdrop-blur-sm md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{exp.period}</span>
                  <h3 className="mt-3 font-[var(--font-bebas)] text-3xl tracking-tight md:text-4xl">{exp.role}</h3>
                  <p className="mt-2 font-mono text-sm text-muted-foreground">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start gap-3 border-t border-border/35 pt-4 first:border-t-0 first:pt-0">
                    <span className="mt-2 h-1.5 w-1.5 bg-accent" />
                    <span className="font-mono text-xs leading-relaxed text-muted-foreground md:text-[13px]">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
