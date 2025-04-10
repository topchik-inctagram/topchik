import { baseApi } from '@/shared/stores'
import type { LoginArgs, LoginResponse, RegistrationRequest } from '@/features/auth/api'

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
          url: '/api/v1/auth/me',
        }),
      }),
      //todo check this req
      refreshToken: builder.mutation<any, any>({
        invalidatesTags: [''],
        query: () => ({
          method: 'POST',
          params: undefined,
          url: '/api/v1/auth/refresh-token',
        }),
      }),
      registrationUser: builder.mutation<void, RegistrationRequest>({
        invalidatesTags: [''],
        query: body => ({
          body,
          method: 'POST',
          url: '/api/v1/auth/registration',
        }),
      }),
      //todo check this req
      logout: builder.mutation<void, void>({
        invalidatesTags: [''],
        query: () => ({
          params: undefined,
          method: 'POST',
          url: '/api/v1/auth/logout',
        }),
      }),
    }
  },
})
export const { useLoginMutation, useLogoutMutation, useMeQuery, useRegistrationUserMutation } =
  AuthService
