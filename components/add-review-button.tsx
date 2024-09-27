import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button"
import { DialogTrigger } from "./ui/dialog"

export const AddReviewButton = ({
  setOpen
}: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <DialogTrigger asChild>
      <Button onClick={() => setOpen(true)}>Leave a review</Button>
    </DialogTrigger>
  )
}
