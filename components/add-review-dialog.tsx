import { Dispatch } from "react"
import { DialogContent } from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { StarRating } from "./ui/star-rating"
import { Button } from "./ui/button"

type Props = {
  handleSubmit: (formData: FormData) => Promise<void>
  defaultText?: string
  defaultRating?: number
  rating: number
  setRating: Dispatch<React.SetStateAction<number>>
  setOpen: Dispatch<React.SetStateAction<boolean>>
}
export const AddReviewDialog = ({
  handleSubmit,
  defaultText,
  defaultRating,
  rating,
  setRating,
  setOpen
}: Props) => {
  return (
    <DialogContent>
      <form action={handleSubmit} className="space-y-4">
        <Label className="font-bold text-2xl">Leave a review</Label>
        <Textarea
          id="text"
          name="text"
          placeholder="Type your review here."
          defaultValue={defaultText}
        />
        <StarRating
          defaultValue={defaultRating}
          rating={rating}
          setRating={setRating}
        />
        <Button type="submit" onClick={() => setOpen(false)}>
          Submit
        </Button>
      </form>
    </DialogContent>
  )
}
