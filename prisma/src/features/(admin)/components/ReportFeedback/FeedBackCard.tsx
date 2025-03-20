"use client"

import { useState } from "react"
import { formatDistance, formatDistanceToNow, subDays } from "date-fns"
import { CheckCircle, Trash2, Bug, Lightbulb, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Ifeedback } from "./ReportFeedback"
import useAuthStore, { useUserInfo } from "@/store/AuthStore"


export default function FeedbackCard({
  id,
  review,
  user,
  category,
  approved,
  createdAt,
  onApprove,
  onDelete,

}: Ifeedback) {


  const handleApprove = () => {

    onApprove?.(id)
  }

  const handleDelete = () => {
    onDelete?.(id)
  }

  const getCategoryIcon = () => {
    switch (category) {
      case "Bug":
        return <Bug className="h-4 w-4" />
      case "Feature":
        return <Lightbulb className="h-4 w-4" />
      case "Feedback":
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getCategoryColor = () => {
    switch (category) {
      case "Bug":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      case "Feature":
        return "bg-primary text-primary-foreground hover:bg-primary/90"
      case "Feedback":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/90"
    }
  }
  const { userType } = useUserInfo();
  // console.log(image)
  return (
    <Card className="w-full max-w-lg mx-auto transition-all hover:shadow-md my-2">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <Badge className={cn("ml-auto", getCategoryColor())}>
          <span className="flex items-center gap-1">
            {getCategoryIcon()}
            {category}
          </span>
        </Badge>
        {approved && <div className="">
          <CheckCircle color="green" className="h-4 w-4" /></div>}
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review}</p>
        {createdAt && (
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {category === "Feedback" && !approved && (
          <Button
            disabled={userType !== "SuperAdmin"}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-green-600 hover:bg-green-50 hover:text-green-700"
            onClick={handleApprove}
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
        )}
        <Button
          disabled={userType !== "SuperAdmin"}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

