import axios, { AxiosInstance } from 'axios'
import { IAppInitResponse, IAppPermissionsResponse, IAuthorizationRequest, IAuthorizationResponse } from './types'

export class AuthApi {
  private instance: AxiosInstance
  private cookie: string | undefined

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: `https://${baseUrl}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
  }

  public async appClickeduInit(): Promise<IAppInitResponse> {
    const data = { cons_key: process.env.CONS_KEY, cons_secret: process.env.CONS_SECRET }
    const response = await this.instance.post<IAppInitResponse>('/ws/app_clickedu_init.php', data)

    const cookiesHeader = response.headers['set-cookie']
    const phpCookie = cookiesHeader?.[0] || ''

    // TODO: Error handling

    this.setCookie(phpCookie)

    return response.data
  }

  public setCookie(cookie: string) {
    this.cookie = cookie
  }

  public async authorization(request: IAuthorizationRequest): Promise<IAuthorizationResponse> {
    const response = await this.instance.get<IAuthorizationResponse>('/authorization.php', { params: request })

    return response.data
  }

  public async appClickeduPermissions(token: string, userId: string): Promise<IAppPermissionsResponse> {
    const data = {
      resource: '%5B0%2C1%5D',
      oauth_token: token,
      acceptar: '1',
      id_usr: userId,
      es_webapp: false,
    }

    const response = await this.instance.post<IAppPermissionsResponse>('/ws/app_clickedu_permissions.php', data, {
      headers: this.getCookieHeader(),
    })

    // TODO: Error handling

    return response.data
  }

  private getCookieHeader() {
    if (this.cookie === undefined) throw new Error('Cookie not set! Call Init first!')

    return { Cookie: this.cookie }
  }
}
