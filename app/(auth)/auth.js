import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            console.log(response);
            console.error("Failed to fetch user:", response.statusText);
            return null;
          }

          const { user, access_token, refresh_token } = await response.json();
          // console.log("User new", user);

          if (!user) {
            throw new Error("User not found.");
          }

          return { user, access_token, refresh_token };
        } catch (error) {
          console.error("Error during user authorization:", error);
          throw new Error("Internal server error.");
        }
      },
    }),
     //  Google Authentication
     GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // console.log("jwt", token, user, account);

      // For OAuth providers (like Google)
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              image: user.image
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to authenticate with backend');
          }

          const data = await response.json();
          
          // Update token with backend response
          token.sub = data.user._id;
          token.email = data.user.email;
          token.name = data.user.name;
          token.roles = data.user.roles;
          token.accessToken = data.access_token;
          token.refreshToken = data.refresh_token;
          token.businessInfo = data.user.businessInfo;
          if (data.user.image) token.image = data.user.image;
        } catch (error) {
          console.error('OAuth backend authentication error:', error);
          return token;
        }
      } 
      // For credentials provider
      else if (user) {
        token.sub = user.user._id;
        token.email = user.user.email;
        token.name = user.user.name;
        token.roles = user.user.roles;
        token.businessInfo = user.user.businessInfo;
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        if (user.user.image) token.image = user.user.image;
      }

      // console.log(token);
      if (trigger === "update" && session) {
        // Validate session data before using it
        token.roles = session.roles;
        token.businessInfo = session.businessInfo;
        return token
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.businessInfo = token.businessInfo;
        if (token.image) session.user.image = token.image;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.roles = token.roles;
      }
      // console.log(session);
      return session;
    },
  },
});
