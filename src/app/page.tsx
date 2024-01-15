import { getPhotoAlbums } from '@/gateway/api/clickeduQuery/clickeduQuery'
import AlbumsHolder from './components/albums/albums-holder'

export default async function Home() {
  const albums = await getPhotoAlbums()

  return (
    <main className="pt-20">
      <AlbumsHolder className="pt-2 px-8" albums={albums}></AlbumsHolder>
    </main>
  )
}
