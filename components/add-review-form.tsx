"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import AddReviewForm from "./ui/add-review-dialog"

export function AddReviewButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="outline">
          Leave a review
        </Button>
      </DialogTrigger>
      <AddReviewForm setOpen={setOpen} id={id} />
    </Dialog>
  )
}
