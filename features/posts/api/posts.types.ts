export type ImageInfo = {
  id: string
  smallFilePath: string
  mediumFilePath: string
  originFilePath: string
}

export type UserInfo = {
  id: string
  firstName: string
  lastName: string
  avatarInfo: ImageInfo
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

export type UserPost = {
  id: number
  description: string
  images: ImageInfo[]
  createdAt: string
  updatedAt: string
}

export type UserPostsResponse = {
  posts: UserPost[]
  cursor: Cursor
}

export interface GetUserIdPostsArgs {
  id: string
  cursor?: Cursor
}

export type UpdatePostArgs = {
  id: number
  data: {
    description: string
  }
}
