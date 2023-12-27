/* eslint-disable */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }

  interface User {
    /** The id returned when validating token. */
    id: string
    /** The id of the parent */
    userId: string | number
    /** The id of the child */
    childId: string
    /** The base url */
    baseUrl: string
    /** The access token for the API */
    accessToken: string
    /** The auth token for the PHP client */
    authToken: string
    /** The secret token for the PHP client */
    secretToken: string
    /** The app cons key */
    consKey: string
    /** The app cons secret */
    consSecret: string
  }
}
