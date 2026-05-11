"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: "SWE Intern",
    company: "eBay",
    category: "Software Engineering Intern",
    period: "May 2026 - Current",
    description:
      "Contributing as a software engineering intern on production systems, with a focus on reliable product experiences, backend quality, and careful shipping.",
  },
  {
    role: "Summer Research Intern",
    company: "Krutrim AI (OLA)",
    category: "AI Infrastructure",
    period: "May 2025 - Jul 2025",
    description:
      "Engineered a Dockerized SQL ETL pipeline for ~20k multilingual records, deployed FastAPI ML services, and orchestrated AWS EKS inference endpoints for a fine-tuned Krutrim 2.1 backend.",
  },
  {
    role: "Software Developer Engineer Intern",
    company: "Think LogiTech Solutions Private Limited",
    category: "Product Engineering",
    period: "Jun 2024 - Sep 2024",
    description:
      "Built and maintained payment integrations for a PG management platform covering 100+ properties, collaborating across teams to ship features used by 1.2K+ users.",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !timelineRef.current || !progressRef.current || !orbRef.current) {
      return
    }

    const rows = Array.from(sectionRef.current.querySelectorAll<HTMLElement>(".experience-entry"))

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.set(progressRef.current, { scaleY: 0, transformOrigin: "top center" })

      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 58%",
          end: "bottom 82%",
          scrub: true,
        },
      })

      gsap.fromTo(
        orbRef.current,
        { y: 0, scale: 0.9, opacity: 0.96 },
        {
          y: () => Math.max(0, timelineRef.current!.offsetHeight - orbRef.current!.offsetHeight / 2),
          scale: 1.08,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 58%",
            end: "bottom 82%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 42, opacity: 0.24 },
          {
            y: 0,
            opacity: 1,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              end: "top 48%",
              scrub: 0.6,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative isolate overflow-hidden bg-[#050309] px-5 pt-10 pb-0 md:pl-28 md:pr-12 md:pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(216,180,254,0.15), transparent 18%), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 72px 72px, 72px 72px",
        }}
      />

      <div ref={headerRef} className="relative z-10 mx-auto max-w-6xl text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent">03 / Experience</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-6xl leading-none tracking-normal text-[#eadcff] md:text-8xl xl:text-9xl">
          My career &amp;
          <br />
          <span className="text-accent">experience</span>
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-7xl pb-0 md:mt-20">
        <div
          ref={timelineRef}
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#d8b4fe]/14 md:block"
        >
          <div ref={progressRef} className="absolute left-0 top-0 h-full w-px bg-accent shadow-[0_0_18px_rgba(168,85,247,0.42)]" />
          <div
            ref={orbRef}
            className="absolute -left-[0.43rem] top-0 h-3.5 w-3.5 rounded-full bg-[#bd7cff] shadow-[0_0_12px_5px_rgba(168,85,247,0.45),0_0_40px_12px_rgba(168,85,247,0.16)]"
          />
        </div>

        <div className="grid gap-14 md:gap-0">
          {experiences.map((experience, index) => (
            <article
              key={`${experience.role}-${experience.period}`}
              className="experience-entry grid gap-5 border-t border-white/8 pt-8 first:border-t-0 first:pt-0 md:min-h-[15.5rem] md:grid-cols-[minmax(0,1fr)_14rem_minmax(0,1fr)] md:items-start md:gap-12 md:pt-0"
            >
              <div className="md:pr-10">
                <h3 className="max-w-lg text-3xl font-semibold leading-tight tracking-normal text-[#f7f2ff] md:text-4xl">
                  {experience.role}
                </h3>
                <p className="mt-2 font-mono text-sm text-accent">{experience.company}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.24em] text-white/34">{experience.category}</p>
              </div>

              <div className="relative hidden min-h-10 items-start justify-center md:flex">
                <span className="font-[var(--font-bebas)] text-5xl leading-none tracking-normal text-[#f5edff] md:text-6xl">
                  {experience.period.includes("Current") ? "NOW" : experience.period.slice(-4)}
                </span>
              </div>

              <div className="md:pl-10">
                <p className="font-mono text-sm leading-relaxed text-white/58 md:text-[15px]">{experience.description}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-white/28 md:hidden">
                  {String(index + 1).padStart(2, "0")} / {experience.period}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          data-experience-mobile-handoff="true"
          className="pointer-events-none mx-auto mt-10 h-20 w-px md:hidden"
          aria-hidden="true"
        >
          <div className="h-full w-px bg-gradient-to-b from-[#d8b4fe]/0 via-[#d8b4fe]/28 to-[#bd7cff]" />
          <div className="-ml-[0.41rem] -mt-[0.43rem] h-3.5 w-3.5 rounded-full bg-[#bd7cff] shadow-[0_0_12px_5px_rgba(168,85,247,0.36),0_0_40px_12px_rgba(168,85,247,0.13)]" />
        </div>
      </div>
    </section>
  )
}
