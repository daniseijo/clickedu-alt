import axios, { AxiosInstance } from 'axios'
import { ITokenResponse, IValidateResponse } from './types'

const LOGIN_PATH = '/login/v1/auth/token'
const VALIDATE_PATH = 'login/v1/auth/token/validate'

export class ClickeduApi {
  private instance: AxiosInstance

  constructor(domainUrl: string) {
    this.instance = axios.create({
      baseURL: `https://api.clickedu.eu/`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-api-key': process.env.X_API_KEY,
        domain: domainUrl,
      },
    })
  }

  public async token(username: string, password: string): Promise<ITokenResponse> {
    const data = {
      username,
      password,
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }

    const response = await this.instance.post<ITokenResponse>(LOGIN_PATH, data)

    // TODO: Error handling

    return response.data
  }

  public async validate(accessToken: string, childId: string): Promise<IValidateResponse> {
    const response = await this.instance.get<IValidateResponse>(VALIDATE_PATH, {
      params: { oauth_token: accessToken, child_id: childId },
    })

    // TODO: Error handling

    return response.data
  }
}
