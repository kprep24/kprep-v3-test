import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeedbackCardSkeleton() {
  return (
    <Card className="w-full max-w-lg mx-auto mt-2">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {/* Avatar skeleton */}
        <Skeleton className="h-10 w-10 rounded-full" />

        {/* Name and email skeletons */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Category badge skeleton */}
        <Skeleton className="ml-auto h-6 w-20 rounded-full" />
      </CardHeader>

      <CardContent>
        {/* Feedback text skeletons - multiple lines */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[90%] mb-2" />
        <Skeleton className="h-4 w-[75%]" />

        {/* Timestamp skeleton */}
        <Skeleton className="mt-2 h-3 w-24" />
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2">
        {/* Action buttons skeletons */}
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
      </CardFooter>
    </Card>
  )
}