import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email
        })
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.avatar_url
          })
        }
        return true;

      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },

});

export { handler as GET, handler as POST };
