'use server'

import QueryStringAddon from 'wretch/addons/queryString'
import { IGetAlbumByIdResponse, IPhotoAlbumsResponse } from './types'
import { fetcher } from '@/lib/fetcher'
import { auth } from '@/app/api/auth/[...nextauth]/auth'

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

  const response = await defaultQuery<IPhotoAlbumsResponse>(PHOTO_ALBUMS_QUERY, params)

  response.albums = await fixImagesUrls(response.albums, ['coverImageLarge', 'coverImageSmall'])

  return response
}

export async function getAlbumById(albumId: string) {
  const PHOTO_ALBUMS_QUERY = '/pictures'

  const params = {
    albumId,
    lan: 'es',
  }

  const response = await defaultQuery<IGetAlbumByIdResponse>(PHOTO_ALBUMS_QUERY, params)

  response.photos = await fixImagesUrls(response.photos, ['pathLarge', 'pathSmall'])

  return response
}

async function defaultQuery<T = object>(query: string, params: Record<string, string | number> = {}): Promise<T> {
  try {
    const { baseUrl, defaultParams } = await getUrlAndDefaultParams()

    const response = await fetcher(baseUrl)
      .addon(QueryStringAddon)
      .query({ ...defaultParams, ...params, query })
      .get()
      .json<T>()

    return response
  } catch (error) {
    throw Error(`Error fetching data: ${error}`)
  }
}

async function getUrlAndDefaultParams() {
  const session = await auth()

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

async function fixImagesUrls<T = object>(pictures: T[], params: Array<keyof T>) {
  const url = await getPhotoBaseUrl()

  return pictures.map((picture) => {
    const newPicture = { ...picture }

    params.forEach((param) => {
      const picturePath = picture[param] as string

      if (picturePath) {
        const newPath = url + picturePath.replace('../private/', '')

        newPicture[param] = newPath as T[keyof T]
      }
    })

    return newPicture
  })
}

export async function getPhotoBaseUrl() {
  const session = await auth()

  if (!session?.user) throw new Error('No session found')

  const { baseUrl, authToken, secretToken } = session.user

  return `https://${baseUrl}/private/app-${process.env.CONS_KEY}-${process.env.CONS_SECRET}-${authToken}-${secretToken}/`
}
