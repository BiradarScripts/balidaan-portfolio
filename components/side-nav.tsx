"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Index" },
  { id: "signals", label: "Wins" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "principles", label: "Edge" },
  { id: "colophon", label: "Connect" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-screen w-24 border-r border-border/30 bg-background/70 backdrop-blur-xl md:flex">
      <button
        type="button"
        onClick={() => scrollToSection("hero")}
        className="absolute left-1/2 top-6 flex h-11 w-11 -translate-x-1/2 items-center justify-center border border-border/60 bg-card/70 font-[var(--font-bebas)] text-2xl tracking-[0.18em] text-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent"
        aria-label="Scroll to hero section"
      >
        SB
      </button>

      <div className="flex flex-1 flex-col justify-center gap-6 px-4">
        {navItems.map(({ id, label }, index) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center gap-3 text-left"
          >
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-300",
                activeSection === id ? "text-accent" : "text-muted-foreground/45 group-hover:text-muted-foreground",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "h-px w-5 transition-all duration-300",
                activeSection === id ? "w-8 bg-accent" : "bg-muted-foreground/35 group-hover:bg-foreground/55",
              )}
            />
            <span
              className={cn(
                "absolute left-16 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] opacity-0 transition-all duration-200 group-hover:left-[4.4rem] group-hover:opacity-100",
                activeSection === id ? "text-accent" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.45em] text-muted-foreground/55">
        Balidaan
      </div>
    </nav>
  )
}
