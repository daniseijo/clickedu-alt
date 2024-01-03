import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface ThumbnailProps {
  className?: string
  id: string
  coverImage: string
  title: string
}

export default function Thumbnail({ className, id, coverImage, title }: ThumbnailProps) {
  return (
    <button className={cn('flex flex-col items-center transition-all hover:scale-105', className)}>
      <Image
        src={coverImage}
        alt={title}
        width={250}
        height={300}
        className="rounded-lg h-auto w-auto"
        priority={true}
      />
      <h2 className="mt-2">{title}</h2>
    </button>
  )
}
