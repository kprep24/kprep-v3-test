"use client"

import { Search } from "lucide-react"
import Link from "next/link" // Add this import
import { Button } from "@/components/ui/button"

export function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <Link href="/">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-300"
        >
          <Search className="h-5 w-5" />
        </Button>
      </Link>
    )
  }

  return (
    <div className="relative w-full max-w-xl "> {/* Changed from max-w-4xl to max-w-xl for better balance */}
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-gray-300  " />
      <input
        type="search"
        placeholder="Search..."
        className="w-full rounded-full border border-gray-400 focus:border-gray-600 dark:border-gray-700 dark:focus:border-gray-600 bg-gray-100 dark:bg-gray-900 py-2 pl-10 pr-4 text-sm outline-none transition-colors "
      />
    </div>
  )
}

