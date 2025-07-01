import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Log the token and path for debugging
        console.log("Token in middleware:", req.nextauth.token);
        console.log("Request path:", req.nextUrl.pathname);

        // Check if the user is trying to access the admin dashboard
        if (req.nextUrl.pathname.startsWith("/admin")) {
            // If the user's role is not ADMIN, redirect to the home page
            if (req.nextauth.token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
        
        // Allow the request to proceed if the user is authorized
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // The user is authorized if a token exists
                return !!token;
            },
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: [
        "/questionDash21/:path*",
        "/question9Q/:path*",
        "/editprofile/:path*",
        "/admin/:path*",
        "/changepassword/:path*",
    ],
};