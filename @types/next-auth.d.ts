/* eslint-disable */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The id returned when validating token. */
      id: string
      /** The id of the parent */
      userId: string
      /** The id of the child */
      childId: string
      /** The access token for the API */
      accessToken: string
    }
  }
}
