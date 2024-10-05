import { Dispatch } from "react"
import { Button } from "./ui/button"
import { DialogContent } from "./ui/dialog"
import { Label } from "./ui/label"
import { StarRating } from "./ui/star-rating"
import { Textarea } from "./ui/textarea"

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
    <DialogContent className="w-full" title={defaultText ? "Edit Review" : "Add Review"}>
      <form action={handleSubmit} className="space-y-4 p-4">
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
        <div className='flex justify-center items-center'>
          <button
            className="shadow-out w-20"
            type="submit"
            onClick={() => setOpen(false)}
          >
            Submit
          </button>
        </div>
      </form>
    </DialogContent>
  )
}
