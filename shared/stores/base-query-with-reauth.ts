import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://gateway.topchik.uk',
  credentials: 'include',

  prepareHeaders: headers => {
    //headers.set('API-KEY', import.meta.env.VITE_API_KEY)

    //todo try to delete
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('AUTH_TOKEN')
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
    result.meta?.request.url === 'https://gateway.topchik.uk/api/v1/auth/login' &&
    result.meta?.response?.status === 200
  ) {
    const data = result.data as RefreshTokenResponse
    localStorage.setItem('AUTH_TOKEN', data.accessToken as string)
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
          localStorage.setItem('AUTH_TOKEN', data.accessToken)
        }
        result = await baseQuery(args, api, extraOptions)
      } else {
        //todo try to delete window
        if (typeof window !== 'undefined') {
          localStorage.removeItem('AUTH_TOKEN')
          const isSignInPage = window.location.pathname === '/sign-in'

          if (!isSignInPage) {
            window.location.href = '/sign-in'
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
