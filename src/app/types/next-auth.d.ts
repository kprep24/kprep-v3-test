import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: string
      image: string;
    } & DefaultSession["user"];
  }
  interface user {
    id: string;
    role: string;
    firstName: string;
    email: string;
  }
}
