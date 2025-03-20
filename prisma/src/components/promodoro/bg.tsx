"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface MovingGradientBackgroundProps {
  mode: "pomodoro" | "shortBreak" | "longBreak"
}

export default function MovingGradientBackground({ mode }: MovingGradientBackgroundProps) {
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 })
  const [gradientAngle, setGradientAngle] = useState(0)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Color palettes for different modes
  const colorPalettes = {
    pomodoro: [
      "rgba(79, 209, 197, 0.8)", // Teal
      "rgba(64, 175, 255, 0.7)", // Blue
      "rgba(144, 224, 239, 0.6)", // Light blue
    ],
    shortBreak: [
      "rgba(72, 202, 228, 0.8)", // Cyan
      "rgba(0, 180, 216, 0.7)", // Darker cyan
      "rgba(144, 224, 239, 0.6)", // Light blue
    ],
    longBreak: [
      "rgba(72, 149, 239, 0.8)", // Blue
      "rgba(86, 76, 175, 0.7)", // Purple
      "rgba(155, 196, 243, 0.6)", // Light blue
    ],
  }

  // Start gradient animation
  useEffect(() => {
    // Smooth gradient movement
    const moveGradient = () => {
      setGradientPosition({
        x: Math.sin(Date.now() / 5000) * 20,
        y: Math.cos(Date.now() / 5000) * 20,
      })
      setGradientAngle((prev) => (prev + 0.2) % 360)
    }

    animationRef.current = setInterval(moveGradient, 50)

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(${gradientAngle}deg, ${colorPalettes[mode][0]}, ${colorPalettes[mode][1]}, ${colorPalettes[mode][2]})`,
        }}
        transition={{ duration: 2 }}
        style={{
          transform: `translate(${gradientPosition.x}px, ${gradientPosition.y}px)`,
        }}
      />

      {/* Animated overlay shapes */}
      <div className="absolute inset-0">
        {/* Large gradient circles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`large-circle-${i}`}
            className="absolute rounded-full opacity-30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              background: `radial-gradient(circle, ${colorPalettes[mode][0]}, transparent)`,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
            }}
          />
        ))}

        {/* Small floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [Math.random() * 0.2, Math.random() * 0.5, Math.random() * 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Glass overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-[80px]" />
    </div>
  )
}

