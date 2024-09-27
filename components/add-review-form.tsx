"use client"

import { create } from "@/actions/reviews"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Review } from "@/lib/types"
import { useState, useTransition } from "react"
import { Label } from "./ui/label"
import { StarRating } from "./ui/star-rating"
import { Textarea } from "./ui/textarea"
import { ActionMenuDialog } from "./action-menu-dialog"

// export function ReviewDialog({
//   id,
//   onSubmit,
//   initialReview,
//   name,
//   onDelete,
//   onEdit
// }: {
//   id: number
//   onSubmit?: (action: Review) => void
//   initialReview?: { text: string; rating: number }
//   name: string
//   onDelete?: () => void
//   onEdit?: () => void
// }) {
//   const [open, setOpen] = useState(false)
//   const [value, setValue] = useState(initialReview?.rating || 0)
//   const [text, setText] = useState(initialReview?.text || "")

//   const handleSubmit = async (formData: FormData) => {
//     formData.append("rating", value.toString())
//     formData.append("id", id.toString())

//     const reviewData: Review = {
//       text: text || (formData.get("text") as string),
//       rating: value,
//       name,
//       id,
//       date: new Date()
//     }

//     if (onSubmit) {
//       onSubmit(reviewData)
//     }

//     const { errorMessage } = await create(formData)
//     if (errorMessage) {
//       console.log("Error:", errorMessage)
//     }
//   }

//   return (
//     <div className="flex justify-between items-center">
//       {/* Trigger button or ellipsis */}
//       {initialReview ? (
//         <ActionMenuDialog onEdit={() => setOpen(true)} onDelete={onDelete} />
//       ) : (
//         <Button onClick={() => setOpen(true)}>Leave a review</Button>
//       )}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           {/* This button is shown only when leaving a review */}
//           {!initialReview && (
//             <Button onClick={() => setOpen(true)}>Leave a review</Button>
//           )}
//         </DialogTrigger>
//         <DialogContent>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault()
//               const formData = new FormData(e.currentTarget)
//               handleSubmit(formData)
//               setOpen(false)
//             }}
//             className="space-y-4"
//           >
//             <Label className="font-bold text-2xl">
//               {initialReview ? "Edit your review" : "Leave a review"}
//             </Label>
//             <Textarea
//               id="text"
//               name="text"
//               placeholder="Type your review here."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <StarRating value={value} setValue={setValue} />
//             <Button type="submit">{initialReview ? "Update" : "Submit"}</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

export function AddReviewButton({
  id,
  addReviews,
  name
}: { id: number; addReviews?: (action: Review) => void; name: string }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  const createReview = async (formData: FormData) => {
    formData.append("rating", value.toString())
    formData.append("id", id.toString())
    if (addReviews) {
      addReviews({
        text: formData.get("text") as string,
        rating: value,
        name: name,
        createdAt: new Date()
      })
    }
    const { errorMessage } = await create(formData)
    if (errorMessage) {
      console.log("Error:", errorMessage)
    }
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
            id="text"
            name="text"
            placeholder="Type your review here."
          />
          <StarRating value={value} setValue={setValue} />
          <Button type="submit" onClick={() => setOpen(false)}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
