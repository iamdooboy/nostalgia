"use client"

import { login } from "@/actions/users"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

function page() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const handleCreateAccountAction = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await login(formData)
      if (!errorMessage) {
        router.replace("/")
      }
    })
  }
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <form action={handleCreateAccountAction}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Log In</CardTitle>
            <CardDescription>
              Enter a name and password below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                disabled={isPending}
              />
            </div>
            <Link
              href="/signup"
              className="flex justify-center hover:underline text-muted-foreground text-sm"
            >
              Don't have an account? Sign Up
            </Link>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default page
