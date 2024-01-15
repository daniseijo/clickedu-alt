'use client'

import { useState } from 'react'
import AlbumList from './album-list'
import Album from './album'
import { IGetAlbumByIdResponse, IPhotoAlbumsResponse } from '@/gateway/api/clickeduQuery/types'

export interface AlbumsProps {
  className?: string
  albums: IPhotoAlbumsResponse
}

export default function AlbumsHolder({ className, albums }: AlbumsProps) {
  const [album, setAlbum] = useState<IGetAlbumByIdResponse | undefined>(undefined)

  return (
    <section className={className}>
      {album ? (
        <Album album={album} onBackClick={() => setAlbum(undefined)} />
      ) : (
        <AlbumList albums={albums} setAlbum={(album) => setAlbum(album)} />
      )}
    </section>
  )
}
