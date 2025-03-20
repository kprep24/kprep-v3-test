"use client"

import { useState, useEffect } from "react"
import { Crown, CrownIcon, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function UpgradeButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [glowPosition, setGlowPosition] = useState(0)

  // Animate the glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPosition((prev) => (prev + 1) % 100)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center p-0 sm:px-2">
      <Button
        className={cn(
          "relative overflow-hidden group transition-all duration-300",
          "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
          "hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600",
          "hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105",
          "text-white font-bold sm:py-3 py-2 sm:px-8 px-4 rounded-full",
          "border border-white/20",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main text */}
        <span className="relative z-20 sm:flex hidden items-center sm:gap-2 gap-1 text-base sm:text-lg">
          <Sparkles
            className={cn("size-5 transition-all duration-500", isHovered ? "rotate-12 scale-125 animate-pulse" : "")}
          />
          Get Pro  
        </span>
        <span className="relative sm:hidden z-20 flex items-center sm:gap-2 gap-1 text-base sm:text-lg">
            <CrownIcon className="h-4 w-4" />
        </span>

        {/* Rainbow border effect */}
        <span className="absolute inset-0 z-10 rounded-full p-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 via-purple-500 via-cyan-500 to-green-400 opacity-70 group-hover:animate-spin-slow" />

        {/* Inner background with gradient */}
        <span className="absolute inset-[1px] z-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-cyan-600" />

        {/* Glossy highlight */}
        <span className="absolute inset-[1px] z-10 rounded-full bg-gradient-to-b from-white/20 to-transparent" />

        {/* Moving glow effect */}
        <span
          className="absolute z-10 h-20 w-20 rounded-full bg-white/30 blur-xl transition-all duration-300 group-hover:bg-white/40"
          style={{
            left: `${glowPosition}%`,
            top: "-50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Bottom shine */}
        <span className="absolute bottom-0 left-1/2 z-10 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {/* Top shine */}
        <span className="absolute top-[3px] left-1/2 z-10 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent" />

        {/* Pulsing overlay */}
        <span className="absolute inset-0 z-10 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow" />

        {/* Sparkle effects */}
        <span
          className={cn(
            "absolute top-1/4 left-1/4 z-10 size-1 rounded-full bg-white transition-all duration-300",
            isHovered ? "opacity-100 animate-ping" : "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute bottom-1/4 right-1/4 z-10 size-1 rounded-full bg-white transition-all duration-300",
            isHovered ? "opacity-100 animate-ping delay-300" : "opacity-0",
          )}
        />
      </Button>
    </div>
  )
}

