import { ClickeduApi } from './api'
import { AuthApi } from './auth'

export async function getUser(webUrl: string, username: string, password: string) {
  try {
    const authApi = new AuthApi(webUrl)

    const { token: accessToken } = await authApi.appClickeduInit()

    const { id_usuari: childId } = await authApi.authorization({
      access_token: accessToken,
      user: username,
      pass: password,
    })

    const { id_usuari: userId } = await authApi.appClickeduPermissions(accessToken, childId)

    const clickeduApi = new ClickeduApi(webUrl)

    const { access_token } = await clickeduApi.token(username, password)

    return { id: userId, childId, access_token }
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
    return null
  }
}
