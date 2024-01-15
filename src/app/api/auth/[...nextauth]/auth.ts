import { getUser } from '@/gateway/api/auth/user'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions, User, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Clickedu',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        url: { label: 'Web url', type: 'text', placeholder: 'clickedu.eu' },
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password', placeholder: '********' },
      },
      async authorize(credentials, _req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) throw Error('No credentials')

        const user = await getUser(credentials.url, credentials.username, credentials.password)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as object as User
      return session
    },
  },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions)
}
