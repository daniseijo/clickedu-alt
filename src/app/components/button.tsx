'use client'

import { MouseEventHandler } from 'react'
import { photoAlbums } from '@/gateway/api/clickeduQuery/clickeduQuery'

interface ButtonProps {
  children: React.ReactNode
  className: string
}

export const Button = ({ className, children }: ButtonProps) => {
  const triggerInit: MouseEventHandler<HTMLButtonElement> = async () => {
    console.log(await photoAlbums())
  }
  return (
    <button className={className} onClick={triggerInit}>
      {children}
    </button>
  )
}
