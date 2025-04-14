import { baseApi } from '@/shared/store'
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
      forgotPassword: builder.mutation<void, { email: string }>({
        query: body => ({
          url: '/api/v1/auth/password-recovery',
          method: 'POST',
          body,
        }),
      }),
      checkRecoveryCode: builder.mutation<void, { recoveryCode: string }>({
        query: body => ({
          url: '/api/v1/auth/check-recovery-code',
          method: 'POST',
          body,
        }),
      }),
      newPassword: builder.mutation<void, { password: string; recoveryCode: string }>({
        query: body => ({
          url: '/api/v1/auth/new-password',
          method: 'POST',
          body,
        }),
      }),
    }
  },
})
export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegistrationUserMutation,
  useForgotPasswordMutation,
  useCheckRecoveryCodeMutation,
  useNewPasswordMutation,
} = AuthService
