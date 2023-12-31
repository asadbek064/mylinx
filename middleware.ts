import { CUSTOM_DOMAINS, HOSTS } from 'consts/middleware'
import { NextRequest, NextResponse } from 'next/server'

async function middleware(request: NextRequest) {
  
  // clone the request url
  const url = request.nextUrl.clone()

  // get pathname of request [/cool]
  const { pathname } = request.nextUrl

  // get host name [asadbek.dev]
  const hostname = request.headers.get('host')
  if (!hostname) return NextResponse.redirect('https://mylinx.cc')

  // get our base url [https://mylinx.cc]
  const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL

  // if the domain is a customdomain, and it's root path, redirect to mylinx.cc
  if (CUSTOM_DOMAINS.includes(hostname) && pathname === '/') {
    return NextResponse.redirect('https://mylinx.cc')
  }

  // if the domain is a host, treat it as normal
  if (
    HOSTS.includes(hostname) ||
    CUSTOM_DOMAINS.includes(hostname) ||
    hostname?.includes('vercel.app') ||
    hostname?.includes('ngrok')
  ) {
    return NextResponse.next()
  }

  // some safety checks
  const doNotRedirect = ['images/', 'favicon.png', 'fonts/', 'api/', '_next/']
  if (doNotRedirect.some((directory) => pathname.startsWith(`/${directory}`))) {
    console.log('not redirecting' + pathname)
    return NextResponse.next()
  }

  // go fetch the which user this domain belongs to
  try {
    const fetchUser = await fetch(`${BASE_URL}/api/fetchdomain?domain=${hostname}`)
    const user = await fetchUser.json()

    if (!user.success || !user.username) {
      console.log('no user found')
      console.log(user)
      return NextResponse.redirect('https://mylinx.cc')
    }

    url.pathname = `/${user.username}`
    return NextResponse.rewrite(url)
  } catch (e) {
    console.log(e)
    throw new Error('Error fetching domain')
  }
}

export default middleware
