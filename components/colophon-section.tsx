"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative border-t border-border/30 py-32 pb-44 pl-6 pr-6 md:pl-28 md:pr-12 md:pb-36"
    >
      <div ref={headerRef} className="mb-16 grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-stretch">
        <div className="panel-sheen relative overflow-hidden border border-border/45 bg-card/60 p-8 text-center backdrop-blur-sm md:p-10">
          <div className="absolute right-0 top-0 h-40 w-40 bg-accent/10 blur-[90px]" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent">05 / Connect</span>
          <h2 className="mx-auto mt-3 max-w-4xl font-[var(--font-bebas)] text-6xl leading-none tracking-normal text-[#eadcff] md:text-8xl xl:text-9xl">
            Let&apos;s build
            <br />
            <span className="text-accent">something hard</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            If you are building serious AI products, multimodal workflows, or backend systems that actually have to
            scale, I want to talk.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:i2004shreyas@gmail.com"
              className="border border-foreground/20 bg-background/70 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              i2004shreyas@gmail.com
            </a>
            <a
              href="tel:+917416689570"
              className="border border-border/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-foreground"
            >
              7416689570
            </a>
            <a
              href="https://github.com/BiradarScripts"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="panel-sheen border border-border/45 bg-card/55 p-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Alias</p>
            <p className="mt-3 font-[var(--font-bebas)] text-4xl tracking-[0.08em] text-foreground">Balidaan</p>
          </div>
          <div className="panel-sheen border border-border/45 bg-card/55 p-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Base</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground/85">Bengaluru / India</p>
          </div>
          <div className="panel-sheen border border-border/45 bg-card/55 p-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Education</p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/85">IIIT Bangalore, IMTech ECE, 2022 - 2027</p>
          </div>
          <div className="panel-sheen border border-border/45 bg-card/55 p-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Status</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground/85">Open to work</p>
          </div>
        </div>
      </div>

      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Shreyas Biradar. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Full name: Shreyas Biradar. Alias: Balidaan.</p>
      </div>
    </section>
  )
}
