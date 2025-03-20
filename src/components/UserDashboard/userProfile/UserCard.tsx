import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, GitBranch, Calendar, GraduationCap } from "lucide-react"

interface UserCardProps {
  name?: string
  email?: string
  branch?: string
  userType?: string
  joiningTime?: string
  semester?: string
  avatarUrl?: string
}

export default function UserCard({
  name = "",
  email = "",
  branch = "",
  userType = "free",
  joiningTime = "",
  semester = "",
  avatarUrl,
}: UserCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name ? name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{name || "Unknown User"}</CardTitle>
          <Badge variant={userType === "premium" ? "default" : "secondary"} className="w-fit mt-1">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} User
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{email}</span>
          </div>
        )}
        {branch && (
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-muted-foreground" />
            <span>{branch}</span>
          </div>
        )}
        {joiningTime && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Joined: {joiningTime}</span>
          </div>
        )}
        {/* {semester && (
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <span>Semester: {semester}</span>
          </div>
        )} */}
      </CardContent>
    </Card>
  )
}

