import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        try {
          const response = await fetch(`${BASE_URL}/api/auth/signin`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();

          if (response.ok && data?.data?.token) {
            const decodedToken = jwt.decode(data.data.token);

            if (!decodedToken) {
              throw new Error("Failed to decode token.");
            }

            // Return user data
            return {
              id: decodedToken.userId,
              email: decodedToken.email,
              name: decodedToken.fullName,
              userId: decodedToken.userId, // Adding userId explicitly
            };
          } else if (response.status === 401) {
            throw new Error("Invalid credentials. Please try again.");
          } else if (response.status === 404) {
            throw new Error("User not found. Please check your email.");
          } else {
            throw new Error(data.message || "An unexpected error occurred.");
          }
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          throw new Error(error.message || "Authentication failed.");
        }
      },
    }),
  ],
  debug: true, // Enable detailed logging
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    updateAge: 24 * 60 * 60, // 24 hours in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      // Attach user data to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data to the session
      if (token) {
        session.user = {
          ...session.user,
          email: token.email,
          name: token.name,
          userId: token.userId,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Specify a custom sign-in page
    error: "/auth/error", // Specify an error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
