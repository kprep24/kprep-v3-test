"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function MagicButton() {
  return (
    <motion.div whileHover={{ scale: 1.08 }} className="relative inline-block">
      <motion.div
        className="absolute inset-0 rounded-lg blur-lg opacity-80 transition duration-500"
      />
      <Link href="/sign-in">
        <Button className="relative px-7 py-5 bg-[#325780] text-white rounded-full border-2 border-white flex items-center space-x-3 overflow-hidden shadow-xl">
          <motion.span
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#a3c1e3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            <span>Get Started</span>
          </motion.span>
        </Button>
      </Link>
    </motion.div>
  )
}