"use server"

import { getSupabaseAuth } from "@/lib/auth"
import { getErrorMessage } from "@/lib/utils"
import { redirect } from "next/navigation"

export const signup = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string
    const password = formData.get("password") as string

    const { error } = await getSupabaseAuth().signUp({
      email: `${name}@supabase`,
      password
    })

    if (error) throw error

    const { data, error: loginError } =
      await getSupabaseAuth().signInWithPassword({
        email: `${name}@supabase`,
        password
      })

    if (loginError) throw loginError
    if (!data.session) throw new Error("No session")

    return { errorMessage: null }
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  }
}

export const login = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string
    const password = formData.get("password") as string

    const { data, error: loginError } =
      await getSupabaseAuth().signInWithPassword({
        email: `${name}@supabase`,
        password
      })

    if (loginError) throw loginError
    if (!data.session) throw new Error("No session")

    return { errorMessage: null }
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  }
}

export const logout = async () => {
  try {
    const { error } = await getSupabaseAuth().signOut()
    if (error) throw error
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  } finally {
    redirect("/login")
  }
}
