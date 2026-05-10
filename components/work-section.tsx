"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "LedgerShield ControlBench",
    category: "Authority-aware RL benchmark",
    year: "2026",
    image: "/projects/ledgershield.png",
    description:
      "An RL benchmark for fraud-investigation agents with evidence gathering, controls, and safe decision certificates.",
    stack: [
      "Python",
      "FastAPI",
      "Docker",
      "OpenEnv",
      "Hugging Face",
      "Qwen",
      "SFT",
      "GRPO",
      "DPO",
      "Pydantic",
      "OpenAI SDK",
      "Render",
      "Vercel",
    ],
    metric: "Base 0.1283 -> GRPO 0.6606",
    color: "#c084fc",
    mark: "LS",
  },
  {
    title: "Proxy-x",
    category: "Communication operating system",
    year: "2026",
    image: "/projects/proxy.png",
    description:
      "A natural-language operator workspace for Gmail, WhatsApp, and Outlook with approvals and memory.",
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker Compose",
      "Playwright",
      "pnpm",
    ],
    metric: "Approvals + audit trail",
    color: "#e879f9",
    mark: "PX",
  },
  {
    title: "VisionYard-Pro",
    category: "AI customs intelligence",
    year: "2026",
    image: "/projects/visionproyard.png",
    description:
      "An AI customs platform for document ingestion, compliance checks, risk scoring, and port workflows.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Redis",
      "Celery",
      "MinIO",
      "PostgreSQL",
      "Gemini",
      "Tesseract OCR",
      "pdfplumber",
    ],
    metric: "Risk scoring + OCR",
    color: "#60a5fa",
    mark: "VY",
  },
  {
    title: "Quant-Gambit",
    category: "Market state forecasting",
    year: "2025",
    image: null,
    description:
      "A stateful GRU forecasting model that tracks sequence memory across streaming market data.",
    stack: ["Python", "PyTorch", "NumPy", "scikit-learn", "StandardScaler", "GRU", "joblib", "Kaggle"],
    metric: "Stateful sequence memory",
    color: "#a78bfa",
    mark: "QG",
  },
  {
    title: "EconeXus",
    category: "Interest-based social platform",
    year: "2023",
    image: "/projects/econexus.png",
    description:
      "A MERN social platform for profiles, posts, discovery, and interest-based user connections.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "Axios", "Framer Motion"],
    metric: "Profiles + posts + discovery",
    color: "#38bdf8",
    mark: "EX",
  },
  {
    title: "BrailleScribe",
    category: "Accessibility interface",
    year: "2025",
    image: null,
    description:
      "An accessibility interface for converting handwritten classroom notes into Braille-ready content.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI", "Custom animations", "Accessibility UX"],
    metric: "Handwriting to Braille concept",
    color: "#d8b4fe",
    mark: "BR",
  },
]

type Project = (typeof projects)[number]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const desktopTweenRef = useRef<gsap.core.Tween | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const setActiveProject = useCallback((index: number) => {
    if (activeIndexRef.current === index) return
    activeIndexRef.current = index
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !stageRef.current || !trackRef.current || !progressRef.current) {
      return
    }

    const track = trackRef.current
    const stage = stageRef.current
    const progressBar = progressRef.current
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".work-card"))

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

      setActiveProject(closestIndex)
      setProgress(progress)
    }

    track.addEventListener("scroll", updateNativeRailState, { passive: true })
    updateNativeRailState()

    let mm: ReturnType<typeof gsap.matchMedia> | null = null

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        ".work-card",
        { y: 48, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.75,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        },
      )

      mm = gsap.matchMedia()

      mm.add("(min-width: 1024px)", () => {
        const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth)
        const getEnd = () => `+=${Math.max(860, getDistance() + window.innerHeight * 0.22)}`

        const quickCards = cards.map((card) => ({
          opacity: gsap.quickTo(card, "opacity", { duration: 0.18, ease: "power2.out" }),
          y: gsap.quickTo(card, "y", { duration: 0.18, ease: "power2.out" }),
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
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              const active = Math.min(projects.length - 1, Math.round(progress * (projects.length - 1)))
              const targetPosition = progress * (projects.length - 1)

              setActiveProject(active)
              setProgress(progress)

              quickCards.forEach((setter, index) => {
                const distance = Math.abs(index - targetPosition)
                const focus = Math.max(0, 1 - distance * 0.34)

                setter.opacity(0.56 + focus * 0.44)
                setter.y(distance < 0.6 ? -8 : 12)
              })
            },
          },
        })

        desktopTweenRef.current = tween

        gsap.to(".work-scanline", {
          xPercent: 170,
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
          gsap.set(cards, { clearProps: "opacity,y" })
        }
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => {
      track.removeEventListener("scroll", updateNativeRailState)
      mm?.revert()
      ctx.revert()
    }
  }, [setActiveProject])

  const jumpToProject = (index: number) => {
    const track = trackRef.current
    const card = trackRef.current?.querySelectorAll<HTMLElement>(".work-card")[index]
    const scrollTrigger = desktopTweenRef.current?.scrollTrigger

    if (scrollTrigger) {
      const progress = index / Math.max(1, projects.length - 1)
      const target = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress

      if (window.lenis) {
        window.lenis.scrollTo(target)
      } else {
        window.scrollTo({ top: target, behavior: "smooth" })
      }
    } else if (track && card) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
    }

    setActiveProject(index)
  }

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-background">
      <div className="sample-work-shell min-h-[100svh] py-12 pl-6 pr-6 md:py-14 md:pl-28 md:pr-12 xl:py-14">
        <div ref={headerRef} className="mx-auto max-w-6xl text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent">02 / Work</span>
          <h2 className="mt-2 font-[var(--font-bebas)] text-6xl leading-none tracking-normal text-[#eadcff] md:text-8xl xl:text-9xl">
            My <span className="text-accent">  work</span>
          </h2>

          <div className="mx-auto mt-5 max-w-3xl">
            

            <div className="mx-auto mt-6 h-px w-full max-w-2xl bg-border/60">
              <div ref={progressRef} className="h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-150" />
            </div>
          </div>
        </div>

        <div ref={stageRef} className="sample-work-stage relative mt-8 overflow-hidden border-t border-border/55">
          <div className="work-scanline pointer-events-none absolute -left-1/2 top-0 z-20 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-accent/[0.075] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-28 bg-gradient-to-l from-background to-transparent md:block" />

          <div
            ref={trackRef}
            data-testid="sample-track"
            className="sample-track flex snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible"
            style={{ msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-testid={`sample-card-${index + 1}`}
                className={`work-card sample-card group relative flex h-[43rem] w-[min(88vw,32rem)] flex-shrink-0 snap-start flex-col overflow-hidden border-r border-border/45 bg-background/30 px-5 py-6 backdrop-blur-sm transition-colors duration-500 md:h-[44rem] md:w-[min(52vw,35rem)] md:px-7 lg:w-[35rem] xl:w-[37rem] ${
                  activeIndex === index ? "border-r-accent/80" : "hover:border-r-accent/55"
                }`}
              >
                <div
                  className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${project.color}22 0%, transparent 39%), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.028) 1px, transparent 1px)`,
                    backgroundSize: "100% 100%, 54px 54px, 54px 54px",
                  }}
                />

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative z-10 flex h-full min-h-0 flex-col">
                  <div className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)] gap-5">
                    <p className="text-5xl font-semibold leading-none tracking-normal md:text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <div className="min-w-0 text-right">
                      <h3 className="text-2xl font-semibold leading-tight tracking-normal text-foreground md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        {project.category} / {project.year}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 max-w-lg shrink-0 text-sm leading-relaxed text-foreground/72 md:text-[15px]">
                    {project.description}
                  </p>

                  <div className="mt-4 shrink-0">
                    <p className="text-lg font-semibold tracking-normal text-foreground">Tools and features</p>
                    <p className="mt-2 line-clamp-2 max-w-md font-mono text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                      {project.stack.join(", ")}
                    </p>
                  </div>

                  <ProjectPreview project={project} index={index} />

                  <div className="mt-auto flex shrink-0 items-end justify-between gap-5 border-t border-border/40 pt-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
                        Proof
                      </p>
                      <p className="mt-2 text-xl tracking-normal md:text-2xl" style={{ color: project.color }}>
                        {project.metric}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border/45 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-background" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            {projects.map((project, index) => (
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

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const hasImage = typeof project.image === "string" && project.image.length > 0

  return (
    <div
      className="project-preview relative mt-5 h-[17rem] shrink-0 overflow-hidden border border-border/45 bg-card/35 md:h-[18.5rem]"
      data-screenshot-slot={project.title}
      aria-label={`${project.title} screenshot slot`}
    >
      {hasImage ? (
        <Image
          src={project.image}
          alt={`${project.title} frontend preview`}
          fill
          priority={index === 0}
          sizes="(min-width: 1280px) 37rem, (min-width: 1024px) 35rem, (min-width: 768px) 52vw, 88vw"
          className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.color}1f, transparent 46%), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.032) 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 32px 32px, 32px 32px",
            }}
          />
          <div className="absolute inset-5 border border-white/10" />
          <div className="absolute left-5 top-5 h-12 w-12 border border-white/12 bg-background/25" />
          <div className="absolute right-5 top-6 h-px w-24 bg-gradient-to-r from-transparent via-white/24 to-transparent" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-background/20" />

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/65">{project.metric}</p>
          <p className="mt-1 font-[var(--font-bebas)] text-4xl leading-none tracking-[0.08em] text-white md:text-5xl">
            {project.mark}
          </p>
        </div>

        <p className="text-7xl font-semibold leading-none tracking-normal opacity-25" style={{ color: project.color }}>
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </div>
  )
}
