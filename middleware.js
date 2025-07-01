import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ token, req }) {
            console.log(" Middleware running for:", req.nextUrl.pathname)
            console.log("token :" ,  token)
            return !!token
        }
    }
})

export const config = {
    matcher: [
        "/questionDash21",
        "/questionDash21/(.*)",
        "/question9Q",
        "/question9Q/(.*)",
        "/editprofile",
        "/editprofile/(.*)",
        "/admin",
        "/admin/(.*)",
        "/changepassword",
        "/changepassword/(.*)",

    ]
}