"use client"

import { useEffect, useRef } from "react"
import { ScrambleText, ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { ArrowUpRight, Github, Mail } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const heroStats = [
  { value: "5x", label: "national hackathon wins" },
  { value: "20k", label: "multilingual records ingested" },
  { value: "1.2k+", label: "users served in production" },
]

const focusAreas = ["Multimodal AI", "FastAPI + EKS", "Forecasting", "Accessibility", "Full-stack Products"]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center overflow-hidden pl-6 pr-6 pt-24 pb-16 md:pl-28 md:pr-12">
      <AnimatedNoise opacity={0.03} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute right-[10%] top-28 h-48 w-48 rounded-full bg-accent/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-16 left-[18%] h-40 w-40 rounded-full bg-white/5 blur-[120px]" aria-hidden="true" />

      <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          BALIDAAN
        </span>
      </div>

      

      <div ref={contentRef} className="w-full">
        <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              <span className="border border-border/60 bg-card/50 px-3 py-2 text-foreground">Shreyas Biradar</span>
              <span className="text-accent">Alias / Balidaan</span>
              <span>IIIT Bangalore</span>
            </div>

            <SplitFlapAudioProvider>
              <div className="mt-7">
                <SplitFlapText text="BALIDAAN" speed={70} />
                <div className="mt-4">
                  <SplitFlapMuteToggle />
                </div>
              </div>
            </SplitFlapAudioProvider>

            <p className="text-outline mt-6 font-[var(--font-bebas)] text-[clamp(2.3rem,6vw,5.8rem)] leading-none tracking-[0.22em]">
              SHREYAS BIRADAR
            </p>

            <h1 className="mt-7 max-w-3xl text-3xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground md:text-5xl xl:text-6xl">
              AI systems that
              <span className="text-accent"> survive contact with reality.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/72 md:text-lg">
              <span className="text-foreground">Balidaan</span> is where I build multimodal products, research infra,
              and product-grade ML experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 border border-foreground/20 bg-card/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-all duration-200 hover:border-accent hover:text-accent"
              >
                <ScrambleTextOnHover text="Explore Projects" as="span" duration={0.6} />
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
              </a>
              <a
                href="https://github.com/BiradarScripts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-foreground"
              >
                GitHub
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:i2004shreyas@gmail.com"
                className="inline-flex items-center gap-2 border border-border/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-foreground"
              >
                Contact
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="panel-sheen border border-border/45 bg-card/55 px-4 py-4 backdrop-blur-sm">
                  <p className="font-[var(--font-bebas)] text-4xl leading-none tracking-[0.08em] text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="panel-sheen border border-border/45 bg-card/65 p-6 backdrop-blur-sm md:p-7 xl:ml-auto xl:max-w-sm">
            <div className="h-px w-16 bg-accent" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.34em] text-accent">Operating Profile</p>

            <div className="mt-6 space-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Current station</p>
                <p className="mt-2 text-lg font-medium text-foreground">Krutrim AI (OLA)</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Education</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  Integrated M.Tech in Electronics and Communication Engineering, IIIT Bangalore
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">GPA 3.24 / 4.00</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Alias meaning</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  <ScrambleText text="Balidaan" duration={0.7} className="text-accent" />
                  {" "}is the builder identity I use for work that has to feel bold, precise, and high-stakes.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-border/50 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Core zones</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {focusAreas.map((item) => (
                  <span
                    key={item}
                    className="border border-border/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <a
                href="#signals"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
              >
                Latest wins
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:i2004shreyas@gmail.com"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
              >
                Reach out
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-12">
        <div className="border border-border/60 bg-background/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground backdrop-blur-sm">
          Full name / Shreyas Biradar
        </div>
      </div>
    </section>
  )
}
