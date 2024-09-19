import { create } from "@/actions/reviews"
import React, { Dispatch, SetStateAction, useState, useTransition } from "react"
import { Button } from "./button"
import { DialogContent } from "./dialog"
import { Label } from "./label"
import { StarRating } from "./star-rating"
import { Textarea } from "./textarea"

type Props = {
  id: number
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddReviewForm = ({ setOpen, id }: Props) => {
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
  )
}

export default AddReviewForm
