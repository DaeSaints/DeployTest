// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserType } from "./lib/interfaces/user.interface";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;

    const user: UserType = token?.user as UserType;
    if (
      ( pathname.startsWith("/dashboard")||
        pathname.startsWith("/calendar")||
        pathname.startsWith("/courses")||
        pathname.startsWith("/settings")
      ) &&
      user?.role === "no role"
    ) {
      return NextResponse.redirect("http://localhost:3000/messages");
    }
    

  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("tokenmiddle",token);
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
