"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Book, GraduationCap, School, Pencil, Clipboard, BookOpen } from "lucide-react"

const messages = [
  {
    text: "Your academic glow-up starts here ✨ No stress, no mess—just straight A's and effortless flexes. Tap in and level up.",
    type: "left",
    emoji: "⚡️",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
  },
  {
    text: "No cap fr fr 💯 Join us and watch your academic game go from meh to main character energy.",
    type: "right",
    emoji: "🔥",
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
  },
  {
    text: "We're like the friend who always has the tea... except our tea gets you top grades. Swipe, tap, prep, ACE.",
    type: "left",
    emoji: "🫖",
    gradient: "from-purple-600 via-pink-500 to-orange-500",
  },
  {
    text: "We turned study sessions into a vibe. Notes, quizzes, and brain boosts—all in one place. Because being smart is the new cool.",
    type: "right",
    emoji: "🧠",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
  },
]

const FloatingIcon = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ y: 0, opacity: 0.3 }}
    animate={{
      y: [-20, 20, -20],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute ${className}`}
  >
    {children}
  </motion.div>
)

const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-1 bg-white rounded-full"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
            y: [null, Math.random() * -500],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function ChatCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative sm:h-[1200px] h-[1250px] w-full bg-[radial-gradient(ellipse_at_top,#1F1F3A,#111122)] flex items-center justify-center overflow-hidden">
      {/* Animated background effects limited to this section */}
      <div className="absolute inset-0">
        <ParticleEffect />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent animate-pulse" />

        {/* Floating icons with enhanced glow */}
        <FloatingIcon delay={0} className="top-20 left-1/4">
          <Book className="size-12 text-yellow-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={1} className="top-40 right-1/3">
          <GraduationCap className="size-10 text-green-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={2} className="bottom-1/3 left-1/4">
          <School className="size-14 text-red-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={3} className="top-1/3 right-1/4">
          <Pencil className="size-12 text-blue-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={4} className="top-10 left-1/3">
          <Clipboard className="size-12 text-purple-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={5} className="bottom-10 right-1/4">
          <BookOpen className="size-12 text-orange-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={6} className="top-1/4 left-1/5">
          <Book className="size-12 text-yellow-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={7} className="bottom-1/4 right-1/5">
          <GraduationCap className="size-10 text-green-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={8} className="top-1/5 right-1/6">
          <School className="size-14 text-red-500/40 filter blur-[1px]" />
        </FloatingIcon>
        <FloatingIcon delay={9} className="bottom-1/5 left-1/6">
          <Pencil className="size-12 text-blue-500/40 filter blur-[1px]" />
        </FloatingIcon>
      </div>

      <div className="relative w-full z-10 p-8">
        {/* Enhanced decorative blurs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
        />

        {/* Messages container */}
        <div className="max-w-4xl mx-auto space-y-12">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  index,
  isHovered,
  onHover,
  onHoverEnd,
}: {
  message: { text: string; type: string; emoji: string; gradient: string }
  index: number
  isHovered: boolean
  onHover: () => void
  onHoverEnd: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: index * 0.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  const isLeft = message.type === "left"

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={bubbleVariants}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
      className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          translateZ: isHovered ? "40px" : "0px",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className={`
          relative group max-w-md p-8 rounded-[2.5rem]
          ${isLeft ? "bg-white/[0.15] text-white ml-4" : "bg-white/[0.95] text-violet-950 mr-4"}
          backdrop-blur-xl
          transition-all duration-500
          hover:scale-[1.02] hover:-translate-y-2
          after:absolute after:inset-0 after:rounded-[2.5rem]
          after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]
          hover:after:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.4)]
          before:absolute before:-inset-0.5 before:rounded-[3rem]
          before:bg-gradient-to-r before:${message.gradient}
          before:opacity-0 before:transition-opacity before:duration-500
          hover:before:opacity-100 before:-z-10
        `}
      >
        {/* Enhanced emoji badge with 3D effect */}
        <motion.div
          animate={{
            rotateZ: isHovered ? [0, -10, 10, 0] : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -top-3 -left-3 size-12 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl flex items-center justify-center text-2xl shadow-xl border border-white/20 transform-gpu"
        >
          {message.emoji}
        </motion.div>

        <p className="text-lg font-medium leading-relaxed tracking-wide">{message.text}</p>

        {/* Enhanced glow effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-4 rounded-[3rem]"
        >
          <div className={`absolute inset-0 rounded-[3rem] bg-gradient-to-r ${message.gradient} opacity-20 blur-2xl`} />
        </motion.div>

        {/* Enhanced shine effect */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
          <motion.div
            animate={{
              x: isHovered ? ["0%", "200%"] : "0%",
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

