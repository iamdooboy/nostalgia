import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"

export const Stars = ({
  value,
  className
}: { value: number; className?: string }) => {
  return (
    <div className={cn("flex gap-1 justify-center mb-4", className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercentage = Math.max(0, Math.min(100, (value - i) * 100))
        return (
          <div key={i} className="relative">
            <StarIcon className="size-5 stroke-1 stroke-muted-foreground" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <StarIcon className="size-5 stroke-0 fill-yellow-400" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
