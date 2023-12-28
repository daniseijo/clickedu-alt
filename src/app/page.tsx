import { Button } from '@/components/ui/button'
import { getPhotoAlbums } from '@/gateway/api/clickeduQuery/clickeduQuery'
import { fetcher } from '@/lib/fetcher'
import { cn } from '@/lib/utils'
import Image from 'next/image'

function getTime() {
  const api = fetcher('http://worldtimeapi.org/api/timezone/Europe/Madrid').resolve((r) =>
    r.json<{ datetime: string }>(),
  )

  return api.get()
}

export default async function Home() {
  const albums = await getPhotoAlbums()

  const response = await getTime()

  return (
    <main className="font-sans p-24">
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl">{response.datetime}</h1>
        {albums.albums.map((album) => (
          <Image
            key={album.albumId}
            src={album.coverImageLarge}
            alt={'an album'}
            width={250}
            height={300}
            className={cn('h-auto w-auto object-cover transition-all hover:scale-105', 'aspect-video')}
          />
        ))}
      </section>
      <div className="flex gap-6 items-center justify-center">
        <Button>Learn More</Button>
        <Button>Enroll Now</Button>
      </div>
    </main>
  )
}
