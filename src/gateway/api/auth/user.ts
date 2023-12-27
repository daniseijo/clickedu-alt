import { User } from 'next-auth'
import { AuthApi } from './auth'
import { ClickeduApi } from './api'

export async function getUser(webUrl: string, username: string, password: string): Promise<User | null> {
  try {
    const authApi = new AuthApi(webUrl)

    const { token, secret } = await authApi.appClickeduInit()

    const { id_usuari: childId } = await authApi.authorization({
      access_token: token,
      user: username,
      pass: password,
    })

    await authApi.appClickeduPermissions(token, childId)

    const clickeduApi = new ClickeduApi(webUrl)

    const { access_token: accessToken } = await clickeduApi.token(username, password)

    const { id, user_id: userId } = await clickeduApi.validate(accessToken, childId)

    await authApi.checkToken(token)

    return {
      id,
      userId,
      childId,
      baseUrl: webUrl,
      authToken: token,
      secretToken: secret,
      accessToken,
      consKey: process.env.CONS_KEY ?? '',
      consSecret: process.env.CONS_SECRET ?? '',
    }
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
    return null
  }
}
