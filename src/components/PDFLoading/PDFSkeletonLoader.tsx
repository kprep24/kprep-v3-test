"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PDFSkeletonLoaderProps {
  className?: string
}

export default function PDFSkeletonLoader({ className }: PDFSkeletonLoaderProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden",
        className,
      )}
    >
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {/* Navigation buttons and page counter */}
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-16 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom and other controls */}
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-12 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>

      {/* PDF content skeleton */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Loading indicator overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 z-10 rounded-lg">
            <Loader2 className="h-10 w-10 animate-spin mb-2 text-primary" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">Loading PDF...</p>
          </div>

          {/* Page skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg aspect-[3/4] w-full">
            {/* Header area */}
            <div className="p-8 space-y-4">
              <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Content area */}
            <div className="px-8 space-y-3">
              {/* Paragraph skeletons */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}

              <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>

              {/* Space between paragraphs */}
              <div className="py-2"></div>

              {/* More paragraph skeletons */}
              {[...Array(4)].map((_, i) => (
                <div key={i + 6} className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}

              <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

