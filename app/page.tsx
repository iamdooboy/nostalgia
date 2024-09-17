import { logout } from "@/actions/users"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function Home() {
  return (
    <main>
      <form action={logout}>
        <div>Logged In</div>
        <Button type="submit">Log out</Button>
      </form>
    </main>
  )
}
