import { baseApi } from '@/shared/store'
import {
  type Cursor,
  type PostsResponse,
  type Post,
  type UpdatePostArgs,
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
      query: ({ id, data }) => ({
        url: `/api/v1/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation } = PostsService
