import { logout } from "@/actions/users"
import { Stars } from "@/components/stars"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import db from "@/db"
import { events } from "@/db/schemas/schema"
import { StarIcon } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const _events = await db.select().from(events)

  return (
    <div className="w-full max-w-2xl px-5 xl:px-0">
      <h1 className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]">
        Feedback on Life
      </h1>
      <p className="mt-6 text-center text-muted-foreground [text-wrap:balance] md:text-xl">
        The creators are looking for your feedback on life events to improve it
        for future generations.
      </p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {_events.map((event) => (
          <Link
            href={event.title.toLowerCase().replace(" ", "-")}
            key={event.id}
            className="grid border rounded hover:bg-muted/25 gap-3 transition-all duration-100 hover:[box-shadow:5px_5px_rgb(82_82_82)] [box-shadow:0px_0px_rgb(82_82_82)] hover:-translate-x-[3px] hover:-translate-y-[3px] items-center justify-center"
          >
            <img
              className="rounded-t-sm"
              src="https://placehold.co/200x200?text=Hello+World"
            />
            <p className="text-center">{event.title}</p>
            <Stars value={event.rating} />
          </Link>
        ))}
      </div>
    </div>
  )
}
