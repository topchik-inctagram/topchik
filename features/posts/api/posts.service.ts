import { baseApi } from '@/shared/store'
import {
  type Cursor,
  type GetUserIdPostsArgs,
  type PostsResponse,
  type UserPostsResponse,
} from '@/features/posts/api/posts.types'

export const PostsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPosts: builder.query<PostsResponse, Cursor>({
        providesTags: [''],
        query: cursor => ({
          params: cursor ? { cursor } : {},
          url: '/api/v1/posts',
        }),
      }),
      getUserIdPosts: builder.query<UserPostsResponse, GetUserIdPostsArgs>({
        providesTags: [''],
        query: ({ id, cursor }) => ({
          params: cursor ? { cursor } : {},
          url: `/api/v1/posts/${id}`,
        }),
      }),
    }
  },
})

export const { useGetPostsQuery, useGetUserIdPostsQuery } = PostsService
