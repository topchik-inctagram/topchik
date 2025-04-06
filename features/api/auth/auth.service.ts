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
      // recoverPassword: builder.mutation<void, void>({
      //   invalidatesTags: [''],
      //   query: args => ({
      //     method: 'POST',
      //     params: args,
      //     url: 'v1/auth/recover-password',
      //   }),
      // }),
      refreshToken: builder.mutation<void, void>({
        invalidatesTags: [''],
        query: () => ({
          method: 'POST',
          params: undefined,
          url: 'v1/auth/refresh-token',
        }),
      }),
      // resendVerificationEmail: builder.mutation<void, void>({
      //   invalidatesTags: [''],
      //   query: args => ({
      //     method: 'POST',
      //     params: args,
      //     url: '/v1/auth/resend-verification-email',
      //   }),
      // }),
      // resetPassword: builder.mutation<void, void>({
      //   invalidatesTags: [''],
      //   query: args => ({
      //     method: 'POST',
      //     params: args,
      //     url: `v1/auth/reset-password/${args.token}`,
      //   }),
      // }),
      signUp: builder.mutation<void, void>({
        invalidatesTags: [''],
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/sign-up',
        }),
      }),
      // updateMe: builder.mutation<void, void>({
      //   invalidatesTags: [''],
      //   query: ({ avatar, name }) => {
      //     const bodyFormData = new FormData()
      //
      //     // name && bodyFormData.append('name', name)
      //     // avatar && bodyFormData.append('avatar', avatar[0])
      //
      //     return {
      //       body: bodyFormData,
      //       formData: true,
      //       method: 'PATCH',
      //       url: 'v1/auth/me',
      //     }
      //   },
      // }),
      // verifyEmail: builder.mutation<void, void>({
      //   invalidatesTags: [''],
      //   query: args => ({
      //     method: 'POST',
      //     params: args,
      //     url: 'v1/auth/verify-email',
      //   }),
      // }),
    }
  },
})
export const { useLoginMutation, useMeQuery } = AuthService
