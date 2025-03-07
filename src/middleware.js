import { NextResponse } from "next/server";

export function middleware(request) {
    // Get profile cookie
    const profile = request.cookies.get("profile");

    // Get User-Agent from request headers
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);

    // If device is mobile or tablet, redirect to "/mobile"
    if (isMobile || isTablet) {
        return NextResponse.redirect(new URL("/mobile", request.url));
    }
    
    // If profile does not exist, redirect to homepage
    if (!profile) {
        return NextResponse.redirect(new URL("/", request.url));
    }


    // Otherwise, continue with the request
    return NextResponse.next();
}

// Apply middleware to browse & watch routes
export const config = {
    matcher: ["/browse/:path*", "/watch/:path*"],
};
