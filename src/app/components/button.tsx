'use client'

import { MouseEventHandler } from 'react'
import { getPhotoAlbums } from '@/gateway/api/clickeduQuery/clickeduQuery'

interface ButtonProps {
  children: React.ReactNode
  className: string
}

export const Button = ({ className, children }: ButtonProps) => {
  const triggerInit: MouseEventHandler<HTMLButtonElement> = async () => {
    console.log(await getPhotoAlbums())
  }
  return (
    <button className={className} onClick={triggerInit}>
      {children}
    </button>
  )
}
