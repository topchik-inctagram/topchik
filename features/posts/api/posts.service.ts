import {baseApi} from '@/shared/store';
import {type PostsResponse, type UserPostsResponse} from '@/features/posts/api/posts.types';

export const PostsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPosts: builder.query<PostsResponse, number | void>({
        providesTags: [''],
        query: (cursor) => ({
          params: cursor !== null ? { cursor } : {},
          url: '/api/v1/posts',
        }),
      }),
      getUserIdPosts: builder.query<UserPostsResponse, {
        id: string | number; cursor?: number | null }>({
          providesTags: [''],
          query: ({ id, cursor }) => ({
            params: cursor !== null ? { cursor } : {},
            url: `/api/v1/posts/${id}`,
          }),
        }),
    }
  },
})

export const { useGetPostsQuery, useGetUserIdPostsQuery } = PostsService