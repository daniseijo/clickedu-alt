import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { MouseEventHandler } from 'react'

export type DropdownProps = {
  onLogOutClick: MouseEventHandler<HTMLDivElement>
  className?: string
}

export function Dropdown({ onLogOutClick, className }: DropdownProps) {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback className="bg-primary">ES</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onLogOutClick}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
