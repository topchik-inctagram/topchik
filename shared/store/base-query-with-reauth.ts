import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { BASE_URL, TOKEN } from '@/shared/constants'
import { PublicPages } from '@/shared/enums'

const mutex = new Mutex()

type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',

  prepareHeaders: headers => {
    //headers.set('API-KEY', import.meta.env.VITE_API_KEY)

    //todo try to delete maybe
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (
    result.meta?.request.url === `${BASE_URL}/api/v1/auth/login` &&
    result.meta?.response?.status === 200
  ) {
    const data = result.data as RefreshTokenResponse
    localStorage.setItem(TOKEN, data.accessToken as string)
  }
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          method: 'POST',
          url: '/api/v1/auth/refresh-token',
        },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 200) {
        // retry the initial query
        const data = refreshResult.data as RefreshTokenResponse
        if (data.accessToken) {
          localStorage.setItem(TOKEN, data.accessToken)
        }
        result = await baseQuery(args, api, extraOptions)
      } else {
        //todo try to delete window
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN)
          const isSignInPage = window.location.pathname === PublicPages.signIn

          if (!isSignInPage) {
            window.location.href = PublicPages.signIn
          }
        }
      }
      release()
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
