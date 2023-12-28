import wretch from 'wretch'

export const fetcher = (url?: string, init?: RequestInit) => {
  return wretch(url, init)
}
