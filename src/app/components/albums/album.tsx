import { IGetAlbumByIdResponse } from '@/gateway/api/clickeduQuery/types'

export type AlbumProps = {
  className?: string
  album: IGetAlbumByIdResponse
  onBackClick?: (id: string) => void
}

export default function Album({ className, album }: AlbumProps) {
  return (
    <section className={className}>
      {JSON.stringify(album)}
      {/* <Card>
        <CardHeader>
          <CardTitle>Album: </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5 justify-center">
          {albums.albums.map((album) => (
            <Thumbnail
              className="w-96"
              key={album.albumId}
              coverImage={album.coverImageLarge}
              onClick={() => onAlbumClick?.(album.albumId)}
              title={album.title}
            />
          ))}
        </CardContent>
      </Card> */}
    </section>
  )
}
