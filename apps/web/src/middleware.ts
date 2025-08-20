import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/simulation']

const authRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('session') ||
    request.cookies.get('auth-session')

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !sessionCookie
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (authRoutes.some((route) => pathname.startsWith(route)) && sessionCookie) {
    return NextResponse.redirect(new URL('/simulation/list', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
