"use client"

import { create } from "@/actions/reviews"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Label } from "./ui/label"
import { StarRating } from "./ui/star-rating"
import { Textarea } from "./ui/textarea"

export function AddReviewButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)
  const [isPending, startTransition] = useTransition()

  const createReview = async (formData: FormData) => {
    formData.append("rating", value.toString())
    formData.append("id", id.toString())
    startTransition(async () => {
      const { errorMessage } = await create(formData)
      if (!errorMessage) {
        setOpen(false)
      } else {
        console.log("Error:", errorMessage)
      }
    })
  }
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Leave a review</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={createReview} className="space-y-4">
          <Label className="font-bold text-2xl">Leave a review</Label>
          <Textarea
            disabled={isPending}
            id="text"
            name="text"
            placeholder="Type your review here."
          />
          <StarRating value={value} setValue={setValue} />
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
