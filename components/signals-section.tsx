"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "2025.08",
    label: "Winning streak",
    title: "5x National Winner",
    note: "Wins across Amazon ML, Flipkart Grid, Accenture, RBIH Codeathon, and Google GenAI Exchange.",
    value: "5x",
    meta: "Top 5 / AIR 156",
  },
  {
    date: "2025.07",
    label: "Research internship",
    title: "Krutrim AI",
    note: "Built multilingual ETL, FastAPI inference services, and AWS EKS deployment for a fine-tuned Krutrim 2.1 stack.",
    value: "~20k",
    meta: "records ingested",
  },
  {
    date: "2024.08",
    label: "National ranking",
    title: "Amazon AIR 156",
    note: "Multimodal price prediction using images and text.",
    value: "15",
    meta: "best nationally",
  },
  {
    date: "2024.07",
    label: "Computer vision",
    title: "Flipkart Grid 6.0",
    note: "Food freshness, MRP, and expiry detection models.",
    value: "#3",
    meta: "2nd runner-up",
  },
  {
    date: "2024.06",
    label: "Product build",
    title: "Accenture Winner",
    note: "AI tool for auto-launching sites, ads, and CI/CD flows.",
    value: "01",
    meta: "challenge winner",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

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
        duration: 0.2,
        ease: "power2.out",
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
        { x: -48, opacity: 0 },
        {
          x: 0,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const cards = track.querySelectorAll(".signal-card")
    
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0)
    scrollLeft.current = trackRef.current?.scrollLeft || 0
    trackRef.current?.classList.add("cursor-grabbing")
    trackRef.current?.style.setProperty("scroll-behavior", "auto")
  }

  const handleMouseUp = () => {
    isDragging.current = false
    trackRef.current?.classList.remove("cursor-grabbing")
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    trackRef.current?.classList.remove("cursor-grabbing")
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - startX.current
    const walk = (x - scrollLeft.current) * 2
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 pr-6 md:pl-28 md:pr-12 overflow-hidden">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-50 hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl md:block",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      <div ref={headerRef} className="mb-16 grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Wins</span>
          <h2 className="mt-4 text-5xl tracking-tight md:text-7xl">LATEST WINS</h2>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
            A tight record of what shipped, what ranked, and what won.
          </p>
        </div>

        <div className="panel-sheen border border-border/45 bg-card/50 p-5 backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Signal window</p>
          <p className="mt-3 text-4xl tracking-[0.08em] text-foreground">2024 - 2025</p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
            Multimodal ML, product automation, and production systems under pressure.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 cursor-grab select-none overflow-x-auto pb-6 pr-2 md:pr-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {signals.map((signal, index) => (
          <SignalCard key={signal.title} signal={signal} index={index} />
        ))}
      </div>
    </section>
  )
}

function SignalCard({
  signal,
  index,
}: {
  signal: {
    date: string
    label: string
    title: string
    note: string
    value: string
    meta: string
  }
  index: number
}) {
  return (
    <article
      className="signal-card group panel-sheen relative w-[21rem] flex-shrink-0 overflow-hidden border border-border/45 bg-card/55 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/55 md:w-[23rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full min-h-[19rem] flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{signal.label}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{signal.date}</p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-8 flex items-end gap-4">
            <p className="text-5xl leading-none text-foreground md:text-6xl">{signal.value}</p>
            <p className="pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{signal.meta}</p>
          </div>

          <div className="mt-7 border-t border-border/35 pt-5">
            <h3 className="text-3xl tracking-tight transition-colors duration-300 group-hover:text-accent md:text-4xl">
              {signal.title}
            </h3>
            <p className="mt-3 max-w-md font-mono text-xs leading-relaxed text-muted-foreground md:text-[11px]">
              {signal.note}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <div className="h-px w-10 bg-accent/60 transition-all duration-300 group-hover:w-16" />
          live signal
        </div>
      </div>
    </article>
  )
}