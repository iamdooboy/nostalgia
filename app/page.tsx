import { logout } from "@/actions/users"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import db from "@/db"
import { events } from "@/db/schemas/schema"
import Link from "next/link"

export default async function Home() {
  const _events = await db.select().from(events)

  return (
    <main className="flex flex-col gap-6 w-full">
      <form action={logout}>
        <div>Logged In</div>
        <Button type="submit">Log out</Button>
        <p></p>
      </form>
      <div className="grid grid-cols-2 gap-4">
        {_events.map((event) => (
          <Link
            href={event.title.toLowerCase().replace(" ", "-")}
            key={event.id}
            className="grid border rounded p-3 hover:bg-muted/25 gap-3"
          >
            <h1>{event.title} </h1>
            <StarRating
              value={event.rating}
              disabled
              iconProps={{ className: "fill-yellow-500 stroke-yellow-500" }}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
