import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MouseEventHandler } from 'react'

export interface ThumbnailProps {
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  coverImage: string
  title: string
}

export default function Thumbnail({ className, coverImage, title, onClick }: ThumbnailProps) {
  return (
    <button
      className={cn('flex flex-col items-center transition-all hover:scale-105 z-auto', className)}
      onClick={onClick}
    >
      <Image
        src={coverImage}
        alt={title}
        width={250}
        height={300}
        className="rounded-lg h-auto w-auto border bg-card text-card-foreground shadow-sm"
        priority={true}
      />
      <h2 className="mt-2">{title}</h2>
    </button>
  )
}
