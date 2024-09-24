import { DialogTrigger } from "./ui/dialog"
import React, { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button"

export const AddReviewButton = ({
  setOpen
}: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <DialogTrigger asChild>
      <Button onClick={() => setOpen(true)}>Leave a review</Button>
    </DialogTrigger>
  )
}
