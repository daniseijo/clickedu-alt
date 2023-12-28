'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { getServerSession } from 'next-auth'
import { IGetAlbumByIdResponse, IPhotoAlbumsResponse } from './types'

export async function init() {
  const INIT_QUERY = '/init'

  return defaultQuery(INIT_QUERY)
}

export async function getPhotoAlbums() {
  const PHOTO_ALBUMS_QUERY = '/photo_albums'

  const params = {
    startLimit: 0,
    endLimit: 10,
    lan: 'es',
  }

  return defaultQuery<IPhotoAlbumsResponse>(PHOTO_ALBUMS_QUERY, params)
}

export async function getAlbumById(albumId: string) {
  const PHOTO_ALBUMS_QUERY = '/pictures'

  const params = {
    albumId,
    lan: 'es',
  }

  return defaultQuery<IGetAlbumByIdResponse>(PHOTO_ALBUMS_QUERY, params)
}

async function defaultQuery<T = unknown>(query: string, params: Record<string, string | number> = {}): Promise<T> {
  try {
    const { baseUrl, defaultParams } = await getUrlAndDefaultParams()

    const response = await wretch(baseUrl)
      .addon(QueryStringAddon)
      .query({ ...defaultParams, ...params, query })
      .get()
      .json<T>()

    return response
  } catch (error) {
    throw Error('Error fetching data')
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

  return { baseUrl: url, defaultParams }
}

export async function getPhotoBaseUrl() {
  const session = await getServerSession(authOptions)

  if (!session?.user) throw new Error('No session found')

  const { baseUrl, authToken, secretToken } = session.user

  return `https://${baseUrl}/private/app-${process.env.CONS_KEY}-${process.env.CONS_SECRET}-${authToken}-${secretToken}/`
}
