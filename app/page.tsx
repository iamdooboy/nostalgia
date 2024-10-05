import { logout } from "@/actions/users"
import { Stars } from "@/components/stars"
import db from "@/db"
import { events } from "@/db/schemas/schema"
import Link from "next/link"
import { DATA } from "../lib/data"

export default async function Home() {
  //const _events = await db.select().from(events)

  return (
    <div className="w-full max-w-2xl px-5 xl:px-0 py-4">
      <h1 className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]">
        Feedback on Life
      </h1>
      <p className="mt-6 text-center text-muted-foreground [text-wrap:balance] md:text-xl">
        The creators are looking for your feedback on life events to improve it
        for future generations.
      </p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
        {DATA.map((event) => (
          <Link
            href={event.slug}
            key={event.slug}
            className="grid bg-material items-center justify-center relative shadow-out"
          >
            <div className="bg-header-background text-header-text text-[12px] absolute top-0 left-0 w-full pl-[2px] h-5 flex">
              <span className="mr-auto">{event.title}</span>
              <div className="flex gap-[1px] p-[2px]">
                <button className="w-5 h-full bg-material shadow-out justify-center items-center flex">
                  <img src="/help.svg" />
                </button>
                <button className="w-5 h-full bg-material shadow-out justify-center items-center flex">
                  <img src="/close.svg" />
                </button>
              </div>
            </div>
            <div className="pt-5">
              <img
                className="rounded-t-sm w-full max-h-full object-cover size-40"
                src={event.img}
              />
            </div>
            <Stars className="py-[2px]" value={5} />
          </Link>
        ))}
      </div>
    </div>
  )
}
