"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.78,
      touchMultiplier: 1,
    })
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenisRef.current = lenis
    window.lenis = lenis

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 350)

    return () => {
      window.clearTimeout(refreshTimer)
      gsap.ticker.remove(raf)
      lenis.off("scroll", ScrollTrigger.update)
      lenis.destroy()
      lenisRef.current = null
      if (window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [])

  return <>{children}</>
}
