import { NextResponse } from 'next/server'

export function middleware(request) {
    const profile = request.cookies.get('profile')

    if (profile) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/browse/:path*', '/watch/:path*'],
}
