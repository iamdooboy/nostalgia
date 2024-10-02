"use client"

import { login } from "@/actions/users"
import { Label } from "@radix-ui/react-label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useTransition } from "react"
import { Button } from "./ui/button"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import { DialogContent } from "./ui/dialog"
import { Input } from "./ui/input"

export const LoginModal = ({ description }: { description: string }) => {
  const params = useParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const handleCreateAccountAction = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await login(formData)
      if (!errorMessage) {
        router.replace("/" + (params.slug as string) || "/")
      }
    })
  }
  return (
    <DialogContent className="w-full max-w-sm p-1">
      <form action={handleCreateAccountAction}>
        <CardHeader>
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <input
              className="shadow-input pl-1"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              disabled={isPending}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <input
              className="shadow-input pl-1"
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
          <button
            className="bg-material shadow-out w-full"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </CardFooter>
      </form>
    </DialogContent>
  )
}
