import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// Define authentication options using NextAuthOptions interface
const authOptions = {

  
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          console.error("Missing email or password");
          return null;
        }

        try {
          console.log("Attempting login for email:", email);

          const response = await fetch(`${BASE_URL}/api/auth/signin`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          console.log("API Response:", data);

          if (response.ok && data?.data?.token) {
            console.log("Login successful:", data);
            const decodedToken = jwt.decode(data.data.token);

            if (!decodedToken) {
              console.error("Failed to decode token");
              return null;
            }

            // Return user data
            return {
              id: decodedToken.userId,
              email: decodedToken.email,
              name: decodedToken.fullName,
              userId: decodedToken.userId, // Adding userId explicitly
            };
          } else {
            console.error(
              "Authentication failed:",
              response.status,
              data.message || "No additional details"
            );
            return null;
          }
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          return null;
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
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Create NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler functions for GET and POST requests
export { handler as GET, handler as POST };
