import { baseApi } from '@/shared/stores'
import type { LoginArgs, LoginResponse } from '@/features/api/auth'

export const AuthService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginArgs>({
        invalidatesTags: [''],
        query: body => ({
          body,
          method: 'POST',
          url: '/api/v1/auth/login',
        }),
      }),
      me: builder.query<any, void>({
        providesTags: [''],
        query: () => ({
          params: undefined,
          url: 'api/v1/auth/me',
        }),
      }),
      refreshToken: builder.mutation<void, void>({
        invalidatesTags: [''],
        query: () => ({
          method: 'POST',
          params: undefined,
          url: 'v1/auth/refresh-token',
        }),
      }),
    }
  },
})
export const { useLoginMutation, useMeQuery } = AuthService
