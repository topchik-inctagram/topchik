import { baseApi } from '@/shared/store'
import { type PostsResponse } from '@/features/posts/api/index'

export const PostsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPosts: builder.query<PostsResponse, number | void>({
        providesTags: [''],
        query: cursor => ({
          params: cursor ? cursor : {},
          url: '/api/v1/posts',
        }),
      }),
    }
  },
})

export const { useGetPostsQuery } = PostsService
