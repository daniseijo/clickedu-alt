'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Thumbnail from './components/thumbnail'
import { IGetAlbumByIdResponse, IPhotoAlbumsResponse } from '@/gateway/api/clickeduQuery/types'
import { getAlbumById } from '@/gateway/api/clickeduQuery/clickeduQuery'

export type AlbumListProps = {
  className?: string
  setAlbum: (album: IGetAlbumByIdResponse) => void
  albums: IPhotoAlbumsResponse
}

export default function AlbumList({ className, albums, setAlbum }: AlbumListProps) {
  const onAlbumClick = async (albumId: string) => {
    setAlbum(await getAlbumById(albumId))
  }

  return (
    <section className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Albums</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5 justify-center">
          {albums.albums.map((album) => (
            <Thumbnail
              className="w-96"
              key={album.albumId}
              coverImage={album.coverImageLarge}
              onClick={() => onAlbumClick(album.albumId)}
              title={album.title}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
