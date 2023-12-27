import axios, { AxiosInstance } from 'axios'

type Auth = {
  authToken: string
  secretToken: string
  consKey: string
  consSecret: string
}

export class ClickeduQuery {
  private instance: AxiosInstance
  private auth: Auth

  constructor(baseUrl: string, auth: Auth) {
    this.instance = axios.create({
      baseURL: `https://${baseUrl}/ws/app_clickedu_query.php`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    this.auth = auth
  }

  public init(childId: string) {
    const INIT_QUERY = '/init'

    const params = {
      query: INIT_QUERY,
      auth_token: this.auth.authToken,
      auth_secret: this.auth.secretToken,
      cons_key: this.auth.consKey,
      cons_secret: this.auth.consSecret,
      id_fill: childId,
    }

    return this.instance.get('', { params })
  }

  public photoAlbums(childId: string) {
    const INIT_QUERY = '/photo_albums'

    const params = {
      query: INIT_QUERY,
      auth_token: this.auth.authToken,
      auth_secret: this.auth.secretToken,
      cons_key: this.auth.consKey,
      cons_secret: this.auth.consSecret,
      id_fill: childId,
      startLimit: 0,
      endLimit: 10,
      lan: 'es',
    }

    return this.instance.get('', { params })
  }
}
