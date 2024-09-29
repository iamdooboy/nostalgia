"use client"

import { useCallback, useState } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
// import { get } from "@/actions/reviews"

export const SortButtons = ({ eventId }: { eventId: number }) => {
  const [sort, setSort] = useState("recent")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleSort = async (sortType: string) => {
    setSort(sortType)
    router.push(pathname + "?" + createQueryString("sort", sortType))
  }
  return (
    <div className="flex gap-2">
      <Button
        className="hover:bg-secondary/40 hover:text-muted-foreground"
        variant={sort === "recent" ? "secondary" : "ghost"}
        onClick={() => handleSort("recent")}
      >
        Recent
      </Button>
      <Button
        className="hover:bg-secondary/40 hover:text-muted-foreground"
        variant={sort === "top" ? "secondary" : "ghost"}
        onClick={() => handleSort("top")}
      >
        Top
      </Button>
    </div>
  )
}
