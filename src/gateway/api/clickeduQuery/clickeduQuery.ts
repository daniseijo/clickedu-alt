'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { getServerSession } from 'next-auth'

export async function init() {
  const INIT_QUERY = '/init'

  return defaultQuery(INIT_QUERY)
}

export async function photoAlbums() {
  const PHOTO_ALBUMS_QUERY = '/photo_albums'

  const params = {
    startLimit: 0,
    endLimit: 10,
    lan: 'es',
  }

  return defaultQuery(PHOTO_ALBUMS_QUERY, params)
}

async function defaultQuery(query: string, params: Record<string, string | number> = {}) {
  try {
    const { url, defaultParams } = await getUrlAndDefaultParams()

    const response = await wretch(url)
      .addon(QueryStringAddon)
      .query({ ...defaultParams, ...params, query })
      .get()
      .json<any>()

    return response
  } catch (error) {
    return undefined
  }
}

async function getUrlAndDefaultParams() {
  const session = await getServerSession(authOptions)

  if (!session?.user) throw new Error('No session found')

  const { baseUrl, authToken, secretToken, childId } = session.user

  const defaultParams = {
    auth_token: authToken,
    auth_secret: secretToken,
    cons_key: process.env.CONS_KEY,
    cons_secret: process.env.CONS_SECRET,
    id_fill: childId,
  }

  const url = `https://${baseUrl}/ws/app_clickedu_query.php`

  return { url, defaultParams }
}
