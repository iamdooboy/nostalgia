"use client"

import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

export const StarRating = ({
  rating,
  setRating,
  defaultValue
}: {
  rating: number
  setRating: Dispatch<SetStateAction<number>>
  defaultValue: number | undefined
}) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            className={cn(
              "size-8 cursor-pointer transition-colors duration-200 stroke-1 text-gray-300",
              {
                "fill-yellow-400 text-yellow-400":
                  starValue <= (hover || rating || (defaultValue ?? 0))
              }
            )}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        )
      })}
    </div>
  )
}
