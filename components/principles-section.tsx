"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FileText, Github, Instagram, Linkedin, Twitter } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type TechItem = {
  name: string
  glyph: string
  icon?: string
  mono?: boolean
}

const devicon = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"
const simpleIcon = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`

const techItems: TechItem[] = [
  { name: "Python", glyph: "Py", icon: `${devicon}/python/python-original.svg` },
  { name: "JavaScript", glyph: "JS", icon: `${devicon}/javascript/javascript-original.svg` },
  { name: "TypeScript", glyph: "TS", icon: `${devicon}/typescript/typescript-original.svg` },
  { name: "Java", glyph: "Ja", icon: `${devicon}/java/java-original.svg` },
  { name: "C", glyph: "C", icon: `${devicon}/c/c-original.svg` },
  { name: "C++", glyph: "C++", icon: `${devicon}/cplusplus/cplusplus-original.svg` },
  { name: "HTML", glyph: "H5", icon: `${devicon}/html5/html5-original.svg` },
  { name: "CSS", glyph: "C3", icon: `${devicon}/css3/css3-original.svg` },
  { name: "React", glyph: "Rx", icon: `${devicon}/react/react-original.svg` },
  { name: "Next.js", glyph: "N", icon: simpleIcon("nextdotjs"), mono: true },
  { name: "Tailwind", glyph: "Tw", icon: `${devicon}/tailwindcss/tailwindcss-original.svg` },
  { name: "Node.js", glyph: "Nd", icon: `${devicon}/nodejs/nodejs-original.svg` },
  { name: "Express.js", glyph: "Ex", icon: simpleIcon("express"), mono: true },
  { name: "NestJS", glyph: "Ns", icon: `${devicon}/nestjs/nestjs-original.svg` },
  { name: "Prisma", glyph: "Pr", icon: simpleIcon("prisma"), mono: true },
  { name: "Supabase", glyph: "Su", icon: `${devicon}/supabase/supabase-original.svg` },
  { name: "Mongoose", glyph: "Mg", icon: simpleIcon("mongoose"), mono: true },
  { name: "FastAPI", glyph: "Fa", icon: `${devicon}/fastapi/fastapi-original.svg` },
  { name: "Django", glyph: "Dj", icon: `${devicon}/django/django-plain.svg` },
  { name: "Flask", glyph: "Fl", icon: simpleIcon("flask"), mono: true },
  { name: "OpenAI", glyph: "AI", icon: simpleIcon("openai"), mono: true },
  { name: "Gemini / Google AI", glyph: "G", icon: simpleIcon("googlegemini"), mono: true },
  { name: "PyTorch", glyph: "Pt", icon: `${devicon}/pytorch/pytorch-original.svg` },
  { name: "TensorFlow", glyph: "Tf", icon: `${devicon}/tensorflow/tensorflow-original.svg` },
  { name: "Scikit-learn", glyph: "Sk", icon: `${devicon}/scikitlearn/scikitlearn-original.svg` },
  { name: "OpenCV", glyph: "Cv", icon: `${devicon}/opencv/opencv-original.svg` },
  { name: "NumPy", glyph: "Np", icon: `${devicon}/numpy/numpy-original.svg` },
  { name: "Pandas", glyph: "Pd", icon: `${devicon}/pandas/pandas-original.svg` },
  { name: "Recharts", glyph: "Rc" },
  { name: "Zod", glyph: "Zd", icon: simpleIcon("zod"), mono: true },
  { name: "Zustand", glyph: "Zu" },
  { name: "PostgreSQL", glyph: "Pg", icon: `${devicon}/postgresql/postgresql-original.svg` },
  { name: "MongoDB", glyph: "Mo", icon: `${devicon}/mongodb/mongodb-original.svg` },
  { name: "MySQL", glyph: "My", icon: `${devicon}/mysql/mysql-original.svg` },
  { name: "Redis", glyph: "Rd", icon: `${devicon}/redis/redis-original.svg` },
  { name: "Firebase", glyph: "Fb", icon: `${devicon}/firebase/firebase-original.svg` },
  { name: "Docker", glyph: "Do", icon: `${devicon}/docker/docker-original.svg` },
  { name: "Docker Compose", glyph: "Dc", icon: `${devicon}/docker/docker-original.svg` },
  { name: "AWS", glyph: "Aw", icon: simpleIcon("amazonwebservices"), mono: true },
  { name: "Azure", glyph: "Az", icon: `${devicon}/azure/azure-original.svg` },
  { name: "Render", glyph: "Re", icon: simpleIcon("render"), mono: true },
  { name: "Vercel", glyph: "V", icon: simpleIcon("vercel"), mono: true },
  { name: "Hugging Face", glyph: "HF", icon: simpleIcon("huggingface"), mono: true },
  { name: "Hugging Face Spaces", glyph: "Sp", icon: simpleIcon("huggingface"), mono: true },
  { name: "Framer Motion", glyph: "Fm", icon: simpleIcon("framer"), mono: true },
  { name: "Figma", glyph: "Fi", icon: `${devicon}/figma/figma-original.svg` },
  { name: "Postman", glyph: "Po", icon: `${devicon}/postman/postman-original.svg` },
  { name: "Jupyter", glyph: "Jp", icon: `${devicon}/jupyter/jupyter-original.svg` },
]

const techRows = [13, 11, 9, 7, 5, 3].reduce<TechItem[][]>((rows, count) => {
  const start = rows.flat().length
  rows.push(techItems.slice(start, start + count))
  return rows
}, [])

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "X", href: "https://x.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
]

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const washRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !sectionRef.current ||
      !pinRef.current ||
      !headerRef.current ||
      !gridRef.current ||
      !orbRef.current ||
      !washRef.current ||
      !veilRef.current ||
      !contentRef.current
    ) {
      return
    }

    const tiles = Array.from(gridRef.current.querySelectorAll<HTMLElement>(".tech-tile"))

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=520",
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
      })

      gsap.fromTo(
        orbRef.current,
        {
          left: "calc(50% + 2rem)",
          top: "0%",
          xPercent: -50,
          yPercent: -50,
          scale: 0.34,
          opacity: 0.92,
        },
        {
          left: "calc(50% + 2rem)",
          top: "63%",
          xPercent: -50,
          yPercent: -50,
          scale: 1.1,
          opacity: 0.46,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=420",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        washRef.current,
        { opacity: 0.02 },
        {
          opacity: 0.62,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=360",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        veilRef.current,
        { opacity: 0.92 },
        {
          opacity: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=360",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=360",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        tiles,
        { y: 14, opacity: 0, scale: 0.965 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          stagger: { amount: 0.5, from: "center" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=420",
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tech-stack" className="relative isolate min-h-screen bg-[#050309]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden px-5 py-6 md:pl-28 md:pr-12 md:py-7">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-85"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 46%, rgba(168,85,247,0.18) 0%, rgba(88,28,135,0.11) 29%, rgba(5,3,9,0) 66%), radial-gradient(circle at 14% 18%, rgba(216,180,254,0.12), transparent 19%), radial-gradient(circle at 86% 56%, rgba(168,85,247,0.1), transparent 24%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-34"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.034) 1px, transparent 1px)",
            backgroundSize: "72px 72px, 72px 72px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 opacity-65"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(5,3,9,0.96), rgba(5,3,9,0))",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 opacity-75"
          style={{
            backgroundImage: "linear-gradient(0deg, rgba(5,3,9,0.96), rgba(5,3,9,0))",
          }}
        />
        <div
          ref={washRef}
          data-tech-wash="true"
          className="pointer-events-none absolute inset-0 z-[2] opacity-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 49%, rgba(216,180,254,0.12) 0%, rgba(168,85,247,0.08) 25%, rgba(88,28,135,0.045) 47%, rgba(5,3,9,0) 72%)",
          }}
        />
        <div ref={veilRef} data-tech-veil="true" className="pointer-events-none absolute inset-0 z-[3] bg-[#050309]" />
        <div
          ref={orbRef}
          data-tech-orb="true"
          className="pointer-events-none absolute left-1/2 top-0 z-[4] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6c4ff] opacity-0 shadow-[0_0_16px_5px_rgba(216,180,254,0.26),0_0_54px_18px_rgba(168,85,247,0.13),0_0_128px_46px_rgba(168,85,247,0.055)]"
        />

        <div ref={contentRef} data-tech-content="true" className="relative z-10 flex h-full flex-col">
          <header className="shrink-0 pt-4 text-center md:pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#d8b4fe]/58">
              04 / Stack
            </span>
            <h2
              ref={headerRef}
              className="mt-3 font-[var(--font-bebas)] text-6xl leading-none tracking-normal text-[#eadcff] md:text-8xl xl:text-9xl"
            >
              TECH STACK
            </h2>
          </header>

          <div
            ref={gridRef}
            data-tech-grid="true"
            className="mx-auto mt-4 flex w-full max-w-[68rem] flex-1 flex-col items-center justify-center gap-2 pb-12 md:mt-5 md:gap-2 md:pb-10"
          >
            {techRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
                {row.map((tech) => (
                  <div
                    key={tech.name}
                    title={tech.name}
                    className="tech-tile group relative flex h-[4.6rem] w-[4.6rem] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-[#d8b4fe]/16 bg-[#1a1125]/70 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_10px_34px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#e9d5ff]/42 hover:bg-[#281838]/78 hover:shadow-[0_0_22px_rgba(168,85,247,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] md:h-[4.6rem] md:w-[4.6rem]"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 16%, rgba(255,255,255,0.11), rgba(255,255,255,0) 42%)",
                      }}
                    />
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.055] font-mono text-xs font-semibold text-[#f3e8ff]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:h-10 md:w-10">
                      {tech.icon ? (
                        <img
                          src={tech.icon}
                          alt=""
                          loading="lazy"
                          className={`absolute h-6 w-6 object-contain transition duration-300 md:h-7 md:w-7 ${
                            tech.mono
                              ? "opacity-78 invert group-hover:opacity-100"
                              : "opacity-85 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                          }`}
                          onError={(event) => {
                            event.currentTarget.style.display = "none"
                          }}
                        />
                      ) : (
                        <span data-fallback-glyph="true" className="text-[11px]">
                          {tech.glyph}
                        </span>
                      )}
                    </span>
                    <span className="relative max-w-[4.35rem] truncate font-mono text-[9px] leading-tight text-[#f5ecff]/64 transition-colors duration-300 group-hover:text-[#f8f0ff]/88">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex items-center justify-between">
            <div className="hidden flex-col gap-6 md:flex">
              {socials.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="pointer-events-auto text-white/78 transition hover:text-[#d8b4fe]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </a>
                )
              })}
            </div>

            <a
              href="#colophon"
              className="pointer-events-auto ml-auto flex items-center gap-3 font-mono text-xs uppercase tracking-[0.45em] text-[#d8b4fe] transition hover:text-white md:text-sm"
            >
              Resume <FileText className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
