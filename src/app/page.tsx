import { Button } from '@/components/ui/button'
import { getPhotoAlbums, getPhotoBaseUrl } from '@/gateway/api/clickeduQuery/clickeduQuery'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default async function Home() {
  const photos = await getPhotoAlbums()
  const url = await getPhotoBaseUrl()

  const photoPath = photos.albums[0].coverImageLarge

  const photo = url + photoPath.replace('../private/', '')

  return (
    <main className="font-sans p-24">
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl">Shadcn is awesome</h1>
        <Image
          src={photo}
          alt={'a photo'}
          width={250}
          height={300}
          className={cn('h-auto w-auto object-cover transition-all hover:scale-105', 'aspect-video')}
        />
      </section>
      <div className="flex gap-6 items-center justify-center">
        <Button>Learn More</Button>
        <Button>Enroll Now</Button>
      </div>
    </main>
  )
}
