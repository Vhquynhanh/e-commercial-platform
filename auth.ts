export const runtime = "nodejs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        loginInfo: { label: "Email / Phone / Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const loginInfo = credentials?.loginInfo as string;
        const password = credentials?.password as string;
        if (!loginInfo || !password) return null;

        try {
          const response = await fetch(
            `${process.env.BASE_URL}/api/auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ loginInfo, password })
            }
          );

          if (!response.ok) return null;
          const user = await response.json();
          return user;
        } catch (error) {
          console.error("Auth validation error:", error);
          return null;
        }
      }
    })
  ],

  pages: {
    signIn: "/sign-in"
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.type = token.type as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
});
