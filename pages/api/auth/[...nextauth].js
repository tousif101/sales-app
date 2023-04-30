// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { supabase } from '@/lib/supabase'

export default NextAuth({
  providers: [
    Providers.Credentials({
      id: 'supabase',
      name: 'Supabase',
      async authorize(credentials) {
        const { email, password } = credentials

        const { user, session, error } = await supabase.auth.signIn({
          email,
          password,
        })

        if (error) {
          throw new Error(error.message)
        }

        return { id: user.id, email: user.email, accessToken: session.access_token }
      },
    }),
    // Add other providers here
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.accessToken = user.accessToken
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      session.accessToken = token.accessToken
      return session
    },
  },
})