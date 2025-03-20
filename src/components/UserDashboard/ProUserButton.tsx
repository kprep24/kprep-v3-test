"use client"

import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { useState } from "react"

interface ProUserButtonProps {
  onClick?: () => void
  className?: string
}

export default function ProUserButton({ onClick, className }: ProUserButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      className={`relative overflow-hidden bg-gradient-to-r from-amber-300 to-amber-500 text-black font-medium 
      hover:from-amber-400 hover:to-amber-600 cursor-not-allowed  transition-all duration-300 shadow-lg 
      hover:shadow-amber-300/30 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center sm:gap-2 gap-1">
        <Crown className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`} />
        <span className="relative hidden sm:block">
          Pro User
          {isHovered && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="animate-pulse">Pro User</span>
            </span>
          )}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-300 opacity-0 hover:opacity-20 transition-opacity duration-300" />
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-300 opacity-30 blur-xl group-hover:opacity-40 transition-all duration-300" />
    </Button>
  )
}

