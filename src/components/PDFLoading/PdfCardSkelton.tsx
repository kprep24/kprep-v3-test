"use client"

import { cn } from "@/lib/utils"

interface PDFCardSkeletonProps {
  className?: string
}

export default function PDFCardSkeleton({ className }: PDFCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-56 border-2 border-[#74AA63] dark:border-[#5D8CAB] rounded-lg shadow-md relative",
        className,
      )}
    >
      {/* Icon placeholder */}
      <div className="absolute right-6 top-5">
        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>

      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 m-0 rounded animate-pulse"></div>

      {/* Text content area */}
      <div className="text-center mt-0 border-t-2 border-[#74AA63] dark:border-[#5D8CAB] p-2 w-56">
        {/* Title placeholder */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto mb-2 animate-pulse"></div>

        {/* Subtitle placeholder */}
        <div className="h-[30px] overflow-hidden">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse mb-1"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

