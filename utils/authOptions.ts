import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserType } from "@/lib/interfaces/user.interface";
import { authUser, getUserByEmail } from "@/utils/getUserByEmail";
import CredentialsProvider from "next-auth/providers/credentials";

//bcrypt
import bcrypt from "bcrypt";
import { isParent } from "./helpers/isParent";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials?.email, credentials?.password);
        if (credentials) {
          const user = await authUser({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          if (!user) {
            return null;
          }

          if (credentials?.password !== "") {
            const match = await bcrypt.compare(
              credentials?.password,
              user.password
            );
            if (!match) {
              console.log("password incorrect");
              return null;
            }
          } else {
            console.log("new account");
            const match = true; // This variable is only accessible within the "else" block
          }

          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // if (account?.type === "oauth") {
      // console.log(account, profile);
      // return await signInWithOAuth({ account, profile });
      // }
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger == "update") {
        console.log("YOU ARE HERE");

        if (token?.user) {
          const user: UserType = token.user as UserType;
          user.role = session.user.role;
          user.isAccepted = session.user.isAccepted;
          token.user = user;
        }
      } else {
        const user = await getUserByEmail({ email: token.email });
        console.log(user);
        token.uid = user?._id;
        token.user = user;
        // session.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as {
        id?: string;
        name?: string;
        email?: string;
        image?: string;
        role?: string;
        isAccepted?: Boolean;
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
