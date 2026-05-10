"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "eBay",
    location: "Bengaluru, India",
    period: "May 2026 - Current",
    marker: "NOW",
    description:
      "Building production software systems as a SWE intern, with a focus on reliable services, crisp user flows, and engineering work that can scale.",
    focus: "SWE internship",
  },
  {
    role: "Summer Research Intern",
    company: "Krutrim AI (OLA)",
    location: "Bengaluru, India",
    period: "May 2025 - Jul 2025",
    marker: "2025",
    description:
      "Engineered a Dockerized SQL ETL pipeline for multilingual records, deployed FastAPI model services, and integrated scalable inference endpoints on AWS EKS.",
    focus: "Research infrastructure",
  },
  {
    role: "Software Developer Engineer Intern",
    company: "Think LogiTech Solutions Private Limited",
    location: "Bengaluru, India",
    period: "Jun 2024 - Sep 2024",
    marker: "2024",
    description:
      "Contributed to a PG management platform for 100+ properties, maintained payment flows, and collaborated across product and engineering teams.",
    focus: "Production platform",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const railFillRef = useRef<HTMLDivElement>(null)
  const seedOrbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !timelineRef.current || !railFillRef.current || !seedOrbRef.current) return

    const rows = Array.from(timelineRef.current.querySelectorAll<HTMLElement>(".experience-row"))
    let activeRows = -1

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        rows,
        { y: 54, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(railFillRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 58%",
          end: "bottom 46%",
          scrub: true,
          onUpdate: (self) => {
            const nextActiveRows = rows.reduce((count, _row, index) => {
              const threshold = index / Math.max(1, rows.length - 1)
              return self.progress + 0.08 >= threshold ? count + 1 : count
            }, 0)

            if (nextActiveRows === activeRows) return
            activeRows = nextActiveRows

            rows.forEach((row, index) => {
              row.classList.toggle("is-active", index < activeRows)
            })
          },
        },
      })

      gsap.to(seedOrbRef.current, {
        top: "300%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 58%",
          end: "top -100%",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-20 pl-6 pr-6 md:py-24 md:pl-28 md:pr-12">
      <div ref={headerRef} className="mx-auto max-w-5xl text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Experience</span>
        <h2 className="mt-4 text-5xl font-semibold leading-none tracking-normal md:text-7xl xl:text-8xl">
          My career &amp;
          <span className="block bg-gradient-to-b from-accent via-accent to-white/45 bg-clip-text text-transparent">
            experience
          </span>
        </h2>
      </div>

      <div ref={timelineRef} className="relative mx-auto mt-24 max-w-7xl">
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-border/45 lg:left-1/2 lg:-translate-x-1/2">
          <div ref={railFillRef} className="absolute left-0 top-0 h-0 w-px bg-gradient-to-b from-accent/30 via-accent to-accent/80" />
          <div
            ref={seedOrbRef}
            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5c4ff] shadow-[0_0_16px_7px_rgba(216,180,254,0.3),0_0_48px_16px_rgba(147,51,234,0.12)]"
          />
        </div>

        <div className="space-y-10 lg:space-y-14">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.role}-${exp.period}`}
              className="experience-row relative grid gap-6 pl-12 opacity-45 transition-opacity duration-500 lg:grid-cols-[minmax(0,1fr)_13rem_minmax(0,1fr)] lg:items-start lg:gap-12 lg:pl-0"
            >
              <div className="lg:text-right">
                <h3 className="text-3xl font-semibold leading-tight tracking-normal text-foreground md:text-5xl">
                  {exp.role}
                </h3>
                <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">{exp.focus}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground lg:hidden">
                  {exp.period}
                </p>
              </div>

              <div className="hidden lg:block lg:text-center">
                <p className="text-5xl font-semibold leading-none tracking-normal text-foreground/90 md:text-6xl">
                  {exp.marker}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>

              <div>
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground lg:block">
                  {exp.period}
                </p>
                <p className="mt-0 max-w-xl text-base leading-relaxed text-foreground/72 lg:mt-5">{exp.description}</p>
                <div className="mt-4 flex items-center gap-3 lg:mt-6">
                  <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl font-semibold tracking-wide text-accent md:text-2xl">
                      {exp.company}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {exp.location}
                    </span>
                  </div>
                  <span className="h-px flex-1 bg-gradient-to-l from-accent/60 to-transparent" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
