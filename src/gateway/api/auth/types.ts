export interface IAppInitResponse {
  token: string
  secret: string
}

export interface IAuthorizationRequest {
  access_token: string
  user: string
  pass: string
}

export interface IAuthorizationResponse {
  id_usuari: string
  html: string
}

export interface IAppPermissionsResponse {
  status: string
  tipus_usuari: number
  id_usuari: string
}

export interface ITokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}
