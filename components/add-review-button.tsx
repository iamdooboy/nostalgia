import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button"
import { DialogTrigger } from "./ui/dialog"

export const AddReviewButton = ({
  user,
  setOpen
}: { user: User | null; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <DialogTrigger asChild>
      <Button onClick={() => setOpen(true)}>Leave a review</Button>
    </DialogTrigger>
  )
}
