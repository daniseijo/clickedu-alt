'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Dropdown } from './dropdown'

const AppBar = ({ className }: { className?: string }) => {
  const { data: session } = useSession()

  return (
    <div className={cn('bg-muted items-center p-4 flex gap-5 z-50', className)}>
      <h1 className="font-title text-2xl">clickedu</h1>
      <ModeToggle />
      <div className="ml-auto flex gap-5">
        {session?.user ? (
          <Dropdown onLogOutClick={() => signOut()} />
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </div>
  )
}

export default AppBar
