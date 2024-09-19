"use client"

import { Star } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

export const StarRating = ({
  value,
  setValue
}: { value: number; setValue: Dispatch<SetStateAction<number>> }) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            className={`size-8 cursor-pointer transition-colors duration-200 stroke-1 ${
              starValue <= (hover || value)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setValue(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            fill={starValue <= (hover || value) ? "currentColor" : "none"}
          />
        )
      })}
    </div>
  )
}
