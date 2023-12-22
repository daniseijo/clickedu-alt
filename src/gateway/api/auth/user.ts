import { ClickeduApi } from './api'
import { AuthApi } from './auth'

export async function getUser(webUrl: string, username: string, password: string) {
  try {
    const authApi = new AuthApi(webUrl)

    const { token } = await authApi.appClickeduInit()

    const { id_usuari: childId } = await authApi.authorization({
      access_token: token,
      user: username,
      pass: password,
    })

    await authApi.appClickeduPermissions(token, childId)

    const clickeduApi = new ClickeduApi(webUrl)

    const { access_token: accessToken } = await clickeduApi.token(username, password)

    const { id, user_id: userId } = await clickeduApi.validate(accessToken, childId)

    return { id, userId, childId, accessToken }
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
    return null
  }
}
