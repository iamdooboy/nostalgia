"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export const SortButtons = () => {
  const [sort, setSort] = useState("Recent")
  return (
    <div className="flex gap-2">
      <Button
        className="hover:bg-secondary/40 hover:text-muted-foreground"
        variant={sort === "Recent" ? "secondary" : "ghost"}
        onClick={() => setSort("Recent")}
      >
        Recent
      </Button>
      <Button
        className="hover:bg-secondary/40 hover:text-muted-foreground"
        variant={sort === "Top" ? "secondary" : "ghost"}
        onClick={() => setSort("Top")}
      >
        Top
      </Button>
    </div>
  )
}
