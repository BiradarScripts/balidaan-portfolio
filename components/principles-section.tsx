"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FileText, Github, Instagram, Linkedin, Twitter } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const iconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"

const techRows = [
  [
    { name: "Python", logo: `${iconBase}/python/python-original.svg` },
    { name: "Java", logo: `${iconBase}/java/java-original.svg` },
    { name: "JavaScript", logo: `${iconBase}/javascript/javascript-original.svg` },
    { name: "TypeScript", logo: `${iconBase}/typescript/typescript-original.svg` },
    { name: "C", logo: `${iconBase}/c/c-original.svg` },
    { name: "C++", logo: `${iconBase}/cplusplus/cplusplus-original.svg` },
    { name: "HTML", logo: `${iconBase}/html5/html5-original.svg` },
    { name: "CSS", logo: `${iconBase}/css3/css3-original.svg` },
    { name: "React", logo: `${iconBase}/react/react-original.svg` },
    { name: "Next.js", logo: `${iconBase}/nextjs/nextjs-original.svg` },
    { name: "Tailwind", logo: `${iconBase}/tailwindcss/tailwindcss-original.svg` },
  ],
  [
    { name: "Node.js", logo: `${iconBase}/nodejs/nodejs-original.svg` },
    { name: "Express.js", logo: `${iconBase}/express/express-original.svg` },
    { name: "NestJS", logo: `${iconBase}/nestjs/nestjs-original.svg` },
    { name: "Django", logo: `${iconBase}/django/django-plain.svg` },
    { name: "Flask", logo: `${iconBase}/flask/flask-original.svg` },
    { name: "FastAPI", logo: `${iconBase}/fastapi/fastapi-original.svg` },
    { name: "Prisma", logo: `${iconBase}/prisma/prisma-original.svg` },
    { name: "Supabase", logo: `${iconBase}/supabase/supabase-original.svg` },
    { name: "Mongoose", glyph: "Mo" },
    { name: "Zod", glyph: "Z" },
  ],
  [
    { name: "TensorFlow", logo: `${iconBase}/tensorflow/tensorflow-original.svg` },
    { name: "PyTorch", logo: `${iconBase}/pytorch/pytorch-original.svg` },
    { name: "Scikit-learn", logo: `${iconBase}/scikitlearn/scikitlearn-original.svg` },
    { name: "OpenCV", logo: `${iconBase}/opencv/opencv-original.svg` },
    { name: "NumPy", logo: `${iconBase}/numpy/numpy-original.svg` },
    { name: "Pandas", logo: `${iconBase}/pandas/pandas-original.svg` },
    { name: "OpenAI", glyph: "AI" },
    { name: "Gemini / Google AI", glyph: "G" },
    { name: "Hugging Face", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/huggingface.svg" },
    { name: "Hugging Face Spaces", glyph: "HF" },
  ],
  [
    { name: "MySQL", logo: `${iconBase}/mysql/mysql-original.svg` },
    { name: "PostgreSQL", logo: `${iconBase}/postgresql/postgresql-original.svg` },
    { name: "MongoDB", logo: `${iconBase}/mongodb/mongodb-original.svg` },
    { name: "Firebase", logo: `${iconBase}/firebase/firebase-original.svg` },
    { name: "Redis", logo: `${iconBase}/redis/redis-original.svg` },
    { name: "Recharts", glyph: "Rc" },
    { name: "Zustand", glyph: "Zs" },
    { name: "Framer Motion", glyph: "Fm" },
  ],
  [
    { name: "Docker", logo: `${iconBase}/docker/docker-original.svg` },
    { name: "Docker Compose", logo: `${iconBase}/docker/docker-original.svg` },
    { name: "Azure", logo: `${iconBase}/azure/azure-original.svg` },
    { name: "AWS", logo: `${iconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
    { name: "Vercel", logo: `${iconBase}/vercel/vercel-original.svg` },
    { name: "Render", glyph: "Re" },
  ],
  [
    { name: "Jupyter", logo: `${iconBase}/jupyter/jupyter-original.svg` },
    { name: "Figma", logo: `${iconBase}/figma/figma-original.svg` },
    { name: "Postman", logo: `${iconBase}/postman/postman-original.svg` },
  ],
]

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/BiradarScripts" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/" },
  { label: "X", icon: Twitter, href: "https://x.com/" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
]

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const lightWashRef = useRef<HTMLDivElement>(null)
  const darkVeilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current || !glowRef.current || !lightWashRef.current || !darkVeilRef.current) return

    const tiles = Array.from(gridRef.current.querySelectorAll<HTMLElement>(".tech-tile"))

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        {
          left: "50%",
          top: "280%",
          xPercent: -50,
          yPercent: -50,
          scale: 0.34,
          opacity: 0.78,
        },
        {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          scale: 2.35,
          opacity: 0.84,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "center center",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        lightWashRef.current,
        { opacity: 0 },
        {
          opacity: 0.62,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
            end: "center center",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        darkVeilRef.current,
        { opacity: 0.9 },
        {
          opacity: 0.26,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
            end: "center center",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        headerRef.current,
        { y: 28, opacity: 0.18 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "top 30%",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        tiles,
        { y: 18, opacity: 0.16, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          stagger: { amount: 0.4, from: "center" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 62%",
            end: "center center",
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative isolate min-h-screen overflow-hidden bg-[#050309] px-5 py-8 md:px-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(126,34,206,0.34),rgba(45,19,79,0.28)_30%,rgba(5,3,9,0)_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,9,0.22),rgba(5,3,9,0.74)_78%,rgba(5,3,9,0.95))]" />
      <div className="pointer-events-none absolute left-1/2 top-[32%] h-[38rem] w-[88rem] -translate-x-1/2 rounded-[50%] border border-white/[0.045] bg-[repeating-radial-gradient(ellipse_at_center,rgba(168,85,247,0.11)_0_1px,transparent_1px_42px),repeating-conic-gradient(from_178deg_at_50%_58%,rgba(168,85,247,0.12)_0deg_0.55deg,transparent_0.55deg_7deg)] opacity-55 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_62%,transparent)]" />
      <div
        ref={lightWashRef}
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_50%,rgba(216,180,254,0.14)_0%,rgba(168,85,247,0.1)_22%,rgba(88,28,135,0.055)_42%,rgba(5,3,9,0)_70%)] opacity-0"
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[-0.5rem] z-[3] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5c4ff] shadow-[0_0_20px_7px_rgba(216,180,254,0.32),0_0_64px_18px_rgba(147,51,234,0.14),0_0_118px_38px_rgba(168,85,247,0.045)]"
      />
      <div ref={darkVeilRef} className="pointer-events-none absolute inset-0 z-[1] bg-[#050309]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center pb-16 pt-20">
        <div ref={headerRef} className="text-center">
          <h2 className="text-5xl font-normal leading-none tracking-normal text-[#eadcff] sm:text-6xl md:text-7xl xl:text-[5.6rem]">
            TECH STACK
          </h2>
        </div>

        <div ref={gridRef} className="mt-16 flex w-full flex-col items-center gap-3 md:gap-4">
          {techRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex max-w-full flex-wrap justify-center gap-3 md:gap-4">
              {row.map(({ name, logo, glyph }) => (
                <div
                  key={name}
                  className="tech-tile group flex h-[5.4rem] w-[5.4rem] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-white/[0.11] bg-white/[0.045] px-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(28,8,52,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/55 hover:bg-white/[0.075] md:h-[6.2rem] md:w-[5.7rem]"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt=""
                      loading="lazy"
                      className="h-8 w-8 object-contain opacity-80 grayscale invert-[0.82] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center text-3xl font-semibold leading-none text-foreground/70 transition-colors duration-300 group-hover:text-accent">
                      {glyph}
                    </span>
                  )}
                  <span className="block max-w-full truncate font-mono text-[10px] leading-none text-[#d7c8e6]/78 transition-colors duration-300 group-hover:text-white">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-7 z-10 hidden flex-col gap-7 md:flex">
        {socials.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-foreground/86 transition-colors duration-200 hover:text-accent"
          >
            <Icon className="h-6 w-6" />
          </a>
        ))}
      </div>

      <a
        href="/resume.pdf"
        className="absolute bottom-10 right-8 z-10 hidden items-center gap-3 font-mono text-sm uppercase tracking-[0.34em] text-[#d6bbff] transition-colors duration-200 hover:text-white md:inline-flex"
      >
        Resume
        <FileText className="h-4 w-4" />
      </a>
    </section>
  )
}
