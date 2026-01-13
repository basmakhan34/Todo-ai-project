import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Tip: Agar .env kaam na kare toh yahan direct "http://127.0.0.1:8000/token" likh kar check karein
          const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
          
          const res = await fetch(`${backendUrl}/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              username: credentials.email, // FastAPI expects 'username'
              password: credentials.password,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            // NextAuth ko 'id' aur 'email' lazmi chahiye hota hai object mein
            return {
              id: credentials.email,
              email: credentials.email,
              accessToken: data.access_token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('NextAuth Authorization Error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'secret_string_123',
});

export { handler as GET, handler as POST };