// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserType } from "./lib/interfaces/user.interface";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;

    const user: UserType = token?.user as UserType;
    console.log(user);
    if (
      (pathname.startsWith("/users") ||
        pathname.startsWith("/client-chats")) &&
      user?.role === null
    ) {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    } else if (
      (pathname.startsWith("/users") ||
        pathname.startsWith("/transactions") ||
        pathname.startsWith("/leads") ||
        pathname.startsWith("/customers")) &&
      user?.role === "teacher"
    ) {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/calendar/:path*",
    "/client-chats/:path*",
    "/dashboard/:path*",
    "/leads/:path*",
    "/transactions/:path*",
    "/users/:path*",
  ],
};
