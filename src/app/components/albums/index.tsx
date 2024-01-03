import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getPhotoAlbums } from '@/gateway/api/clickeduQuery/clickeduQuery'
import Thumbnail from './components/thumbnail'

export interface AlbumsProps {
  className?: string
}

export default async function Albums({ className }: AlbumsProps) {
  const albums = await getPhotoAlbums()

  return (
    <section className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Albums</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5 justify-center">
          {albums.albums.map((album) => (
            <Thumbnail
              className="w-96"
              key={album.albumId}
              id={album.albumId}
              coverImage={album.coverImageLarge}
              title={album.title}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
