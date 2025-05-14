import { baseApi } from '@/shared/store'
import { type PostsResponse } from '@/features/posts/api/index'

export const PostsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPosts: builder.query<PostsResponse, number | void>({
        providesTags: [''],
        query: cursor => ({
          params: cursor ? { cursor } : {},
          url: '/api/v1/posts',
        }),
      }),
      createPost: builder.mutation<any, FormData>({
        invalidatesTags: [''],
        query: formData => ({
          url: '/api/v1/posts',
          method: 'POST',
          body: formData,
        }),
      }),
      updatePost: builder.mutation<any, { id: number; data: { description: string } }>({
        query: ({ id, data }) => ({
          url: `/api/v1/posts/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
    }
  },
})

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation } = PostsService
