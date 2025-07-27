import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const result = await pool.query(
          "SELECT * FROM m_user WHERE email = $1",
          [credentials.email]
        );
        if (result.rows.length === 0) {
          throw new Error("Invalid email or password.");
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.usrpw
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        return {
          usrid: user.usrid,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.usrid = user.usrid;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          usrid: token.usrid,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your_secret_key",
};
