"use client"

import { useParams, useRouter } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogOverlay } from "./ui/dialog"
import { Label } from "@radix-ui/react-label"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "./ui/card"
import { Input } from "./ui/input"
import { useTransition } from "react"
import { login } from "@/actions/users"
import Link from "next/link"

export const LoginModal = () => {
  const params = useParams()
  console.log(params)
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
      </form>
    </DialogContent>
  )
}
