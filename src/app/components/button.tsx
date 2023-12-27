import { ClickeduQuery } from '@/gateway/api/clickeduQuery/clickeduQuery'
import { Session } from 'next-auth'
import { MouseEventHandler } from 'react'

interface ButtonProps {
  children: React.ReactNode
  className: string
  session: Session | null
}

export const Button = ({ session, className, children }: ButtonProps) => {
  const triggerInit: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      if (session) {
        const { baseUrl, authToken, secretToken, consKey, consSecret, childId } = session.user
        const clickeduQuery = new ClickeduQuery(baseUrl, {
          authToken,
          secretToken,
          consKey,
          consSecret,
        })

        const initJson = await clickeduQuery.photoAlbums(childId)

        console.log(JSON.stringify(initJson.data, null, 2))
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <button className={className} onClick={triggerInit}>
      {children}
    </button>
  )
}
