export interface IPhotoAlbumsResponse {
  total: number
  albums: Album[]
}

export interface IGetAlbumByIdResponse {
  total: number
  photos: Photo[]
}

interface Album {
  albumId: string
  title: string
  description: string
  coverImageLarge: string
  coverImageSmall: string
}

interface Photo {
  pathLarge: string
  pathSmall: string
  text: string
}
