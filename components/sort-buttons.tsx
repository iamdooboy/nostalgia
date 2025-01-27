"use client"

import { useReview } from "@/context/review-context"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const DEFAULT = {
  eventId: 0,
  id: 0,
  rating: 0,
  userId: "",
  text: "",
  createdAt: new Date(),
  edit: false,
  favorites: [],
  author: {
    id: "",
    email: ""
  },
  favoriteCount: 0
}

export const SortButtons = () => {
  const { optimisticReviews, addOptimisticReviews } = useReview()
  const [sort, setSort] = useState("recent")
  const searchParams = useSearchParams()

  useEffect(() => {
    setSort(searchParams.get("sort") || "recent")
  }, [])

  const handleSort = async (sortType: string) => {
    if (sort === sortType) return
    setSort(sortType)
    addOptimisticReviews({
      action: `sort-${sortType}`,
      newReviewData: {
        hasPosted: optimisticReviews.hasPosted,
        reviews: DEFAULT
      }
    })
  }

  return (
    <div className="flex gap-2">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        <button
          onClick={() => handleSort("recent")}
          data-state={sort === "recent" ? "active" : "inactive"}
          className="w-20 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Recent
        </button>
        <button
          onClick={() => handleSort("top")}
          data-state={sort === "top" ? "active" : "inactive"}
          className="w-20 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Top
        </button>
      </div>
    </div>
  )
}
