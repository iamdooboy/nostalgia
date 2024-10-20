import { EventRatings } from "@/components/event-ratings"
import { ReviewSection } from "@/components/review-section"
import db from "@/db"
import { events } from "@/db/schemas/schema"

export default async function Page({ params }: { params: { slug: string } }) {
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
        <div className="p-8 bg-input-background shadow-in w-full h-full">
          <img
            src={`/${params.slug}.webp`}
            alt="Movie Poster"
            className="shadow-lg size-full"
          />

          <div className="flex justify-between items-center mt-1">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-start">{event?.title}</h1>
              <EventRatings rating={event?.rating} eventId={event?.id} />
            </div>
            <h1 className="text-5xl font-bold">{event?.rating}</h1>
          </div>
        </div>
      </div>
      <ReviewSection eventId={event?.id} />
    </div>
  )
}
