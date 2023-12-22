import axios, { AxiosInstance } from 'axios'
import { ITokenResponse } from './types'

const LOGIN_PATH = '/login/v1/auth/token'

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
}
