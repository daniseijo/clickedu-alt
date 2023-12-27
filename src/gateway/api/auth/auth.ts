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
      resource: '[0,1]',
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

  public checkToken(authToken: string) {
    const arn = 'arn:aws:sns:eu-west-1:614398782960:endpoint/GCM/android/48fe001c-5d94-3905-9a7e-15d309a49619'
    const id = '343b6867818e38fb'

    const params = {
      installationId: arn,
      id,
      version: 2,
      nom: 'Daniel',
      platform: 'Android',
      token: authToken,
    }

    return this.instance.get('/ws/app_clickedu_check_token.php', { params, headers: this.getCookieHeader() })
  }

  private getCookieHeader() {
    if (this.cookie === undefined) throw new Error('Cookie not set! Call Init first!')

    return { Cookie: this.cookie }
  }
}
