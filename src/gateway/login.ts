import axios from 'axios'
import { User } from 'next-auth'

interface LoginProps {
  webUrl: string
  username: string
  password: string
}
export async function login({ webUrl, username, password }: LoginProps): Promise<User | null> {
  if (!webUrl || !username || !password) return null

  const instance = axios.create({
    baseURL: `https://${webUrl}`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })

  const tokenResponse = await instance.post('/ws/app_clickedu_init.php', {
    cons_key: process.env.CONS_KEY,
    cons_secret: process.env.CONS_SECRET,
  })

  console.log(tokenResponse.data)

  return { id: '1', name: 'J Smith', email: 'jsmith@example.com', ...tokenResponse.data }
}
