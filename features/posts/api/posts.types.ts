export type ImageInfo = {
  id: string
  smallFilePath: string
  mediumFilePath: string
  originFilePath: string
}

export type avatarInfo = {
  id: string
  smallFilePath: string
  mediumFilePath: string
  originFilePath: string
}

export type UserInfo = {
  id: string
  firstName: string
  lastName: string
  avatarInfo: avatarInfo
}

export type Post = {
  id: number
  description: string
  images: ImageInfo[]
  createdAt: string
  updatedAt: string
  userInfo: UserInfo
}

export type Cursor = number | null

export type PostsResponse = {
  posts: Post[]
  cursor: Cursor
}
