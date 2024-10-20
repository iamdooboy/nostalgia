"use client"

import { User } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

const Auth = ({
  user,
  children
}: { user: User | null; children: React.ReactNode }) => {
  // const router = useRouter()
  if (!!user) {
    return <>{children}</>
  }
  redirect("/login")
}

export default Auth
