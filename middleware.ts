import { type CookieOptions, createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const path = new URL(request.url).pathname
  console.log(path)

  const unprotectedPaths = ["/login", "/signup"]

  const user = await getUser(request, response)
  const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up))

  if (user && isUnprotectedPath) {
    return NextResponse.redirect(new URL("/", request.url))
  } 
  // else if (!user && !isUnprotectedPath) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}

async function getUser(request: NextRequest, response: NextResponse) {
  let supabaseResponse = NextResponse.next({
    request
  })
  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  const user = (await supabaseClient.auth.getUser()).data.user

  return user
}
