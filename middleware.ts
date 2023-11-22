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
      (pathname.startsWith("/calendar") || pathname.startsWith("/courses")) &&
      user?.role === undefined
    ) {
      return NextResponse.redirect("http://localhost:3000/dashboard");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("tokenmiddle", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/calendar/:path*",
    "/courses/:path*",
    "/dashboard/:path*",
    "/messages/:path*",
    "/settings/:path*",
    "/transactions/:path*",
  ],
};
