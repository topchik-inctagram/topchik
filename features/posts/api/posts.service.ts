import { baseApi } from '@/shared/store'
import {
  type Cursor,
  type GetUserIdPostsArgs,
  type PostsResponse,
  type UserPostsResponse,
  type UpdatePostArgs,
  type Post,
} from '@/features/posts/api/posts.types'

export const PostsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<PostsResponse, Cursor>({
      providesTags: [''],
      query: cursor => ({
        params: cursor ? { cursor } : {},
        url: '/api/v1/posts',
      }),
    }),
    createPost: builder.mutation<Post, FormData>({
      invalidatesTags: [''],
      query: formData => ({
        url: '/api/v1/posts',
        method: 'POST',
        body: formData,
      }),
    }),
    updatePost: builder.mutation<Post, UpdatePostArgs>({
      invalidatesTags: [''],
      query: ({ id, data }) => ({
        url: `/api/v1/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUserIdPosts: builder.query<UserPostsResponse, GetUserIdPostsArgs>({
      providesTags: [''],
      query: ({ id, cursor }) => ({
        params: cursor ? { cursor } : {},
        url: `/api/v1/posts/${id}`,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetUserIdPostsQuery,
} = PostsService
