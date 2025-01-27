import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import { Icons } from "./ui/icons"

export const Stars = ({
  value,
  className
}: { value: number; className?: string }) => {
  return (
    <div className={cn("flex gap-1 justify-center", className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercentage = Math.max(0, Math.min(100, (value - i) * 100))
        return (
          <div key={i} className="relative">
            <Icons.Star className="size-6 stroke-1 stroke-background-foreground" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Icons.Star className="size-6 stroke-0 fill-yellow-400" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
