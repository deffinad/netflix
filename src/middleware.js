import { NextResponse } from "next/server";

export function middleware(request) {
    // Get profile cookie
    const profile = request.cookies.get("profile");

    // Get User-Agent from request headers
    const userAgent = request.headers.get("user-agent") || "";
    const isMobileOrTablet = /Mobile|Android|iPhone|iPad|iPod|Tablet/i.test(userAgent);

    // 🚀 Allow `/` for desktop users (to set profile)
    if (request.nextUrl.pathname === "/" && !isMobileOrTablet) {
        return NextResponse.next();
    }

    // ❌ Block all mobile/tablet users (redirect to /mobile)
    if (isMobileOrTablet) {
        return NextResponse.redirect(new URL("/mobile", request.url));
    }

    // 🔐 Require profile authentication for other routes
    if (!profile) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Allow access
    return NextResponse.next();
}

// Apply middleware to **all routes**
export const config = {
    matcher: ["/browse/:path*", "/watch/:path*"],
};
