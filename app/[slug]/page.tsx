import { EventRatings } from "@/components/event-ratings"
import { ReviewSection } from "@/components/review-section"

import db from "@/db"
import { events } from "@/db/schemas/schema"
import { Suspense } from "react"

export default async function Page({
  params,
  searchParams
}: { params: { slug: string }; searchParams: { sort: string } }) {
  const arr = params.slug.split("-")
  const title = arr
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const event = (await db.select().from(events)).find(
    (event) => event.title === title
  )

  if (!event) return
  return (
    <div className="container min-h-screen mx-auto px-4 py-24 max-w-lg w-full">
      <div className="flex flex-col justify-between md:items-center shadow-out bg-material p-[2px] w-full ">
        <div className="h-6 bg-header-background w-full text-header-text flex pl-[3px] justify-center items-center">
          {event?.title}
          <div className="h-full p-[2px] flex gap-[1px] first:ml-auto">
            <button className="w-6 h-full bg-material shadow-out justify-center items-center flex">
              <img src="/help.svg" />
            </button>
            <button className="w-6 h-full bg-material shadow-out justify-center items-center flex">
              <img src="/close.svg" />
            </button>
          </div>
        </div>
        <div className="p-8 bg-input-background shadow-in w-full h-full flex">
          <img
            src="https://placehold.co/100x100?text=Hello+World"
            alt="Movie Poster"
            className="shadow-lg size-full h-auto rounded-sm"
          />
          <div className="ml-4">
            <div className="flex flex-col mb-3">
              <h1 className="text-xl font-bold text-start">{event?.title}</h1>
              <p>{event?.description}</p>
            </div>
            <EventRatings rating={event?.rating} eventId={event?.id} />
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewSection eventId={event?.id} sort={searchParams.sort} />
      </Suspense>
    </div>
  )

  // return (
  //   <div className="container min-h-screen mx-auto px-4 py-24 max-w-lg">
  //     <div className="flex flex-col justify-between md:items-center md:flex-row gap-8 mb-6">
  //       <img
  //         src="https://placehold.co/100x100?text=Hello+World"
  //         alt="Movie Poster"
  //         className="shadow-lg size-60 h-auto rounded-sm"
  //       />
  //       <div className="flex flex-col justify-evenly items-center md:items-start h-full gap-3 pr-6">
  //         <div className="text-center md:text-left gap-2 flex flex-col">
  //           <h1 className="text-4xl font-bold">{event?.title}</h1>
  //           <p className="text-muted-foreground">{event?.description}</p>
  //         </div>
  //         <EventRatings rating={event?.rating} eventId={event?.id} />
  //       </div>
  //     </div>
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <ReviewSection eventId={event?.id} sort={searchParams.sort} />
  //     </Suspense>
  //   </div>
  // )
}
