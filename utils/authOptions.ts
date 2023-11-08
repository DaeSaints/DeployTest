import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserType } from "@/lib/interfaces/user.interface";
import { authUser, getUserByEmail } from "@/utils/getUserByEmail";
import CredentialsProvider from "next-auth/providers/credentials";

//bcrypt
import bcrypt from "bcrypt";

interface UserSession {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined; // Add the 'role' property here
}

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
          console.log(user.role);
          if (!user) {
            return null;
          }
          console.log(credentials?.password);
          console.log(user.password);
          console.log(await bcrypt.hash(credentials?.password,10));
          const match = true;

          if(credentials?.password != ""){
            const match = await bcrypt.compare(credentials?.password, user.password);
          } else {
            console.log("new account");
            
          }
          if(!match) {
              console.log("password incorrect");
              return null;
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
      console.log("processed");
      if (trigger === "update") {
        if (token?.user) {
          const user: UserType = token.user as UserType;
          user.role = session.user?.role;
          token.user = user;
        }
      } else {
        const user = await getUserByEmail({ email: token.email });
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as UserSession;
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
