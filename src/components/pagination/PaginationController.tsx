"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  totalPages: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

export default function PaginationController({ totalPages, initialPage = 1, onPageChange }: PaginationProps) {
  const [page, setPage] = useState(initialPage)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    if (onPageChange) {
      onPageChange(newPage)
    }
  }

  const goToPrevious = () => {
    if (page > 1) {
      handlePageChange(page - 1)
    }
  }

  const goToNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1)
    }
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        disabled={page === 1}
        onClick={goToPrevious}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        disabled={page === totalPages}
        onClick={goToNext}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

