import { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { createOrFindUser } from '@/app/services/user';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      await createOrFindUser({
        email: user.email,
        image: user.image,
        name: user.name,
      });

      return true;
    },
    async session({ session, token }) {
      session.user = token.user as User;

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === 'update' && session) {
        token = { ...token, user: session };

        return token;
      }

      return token;
    },
  },
};
