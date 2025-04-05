import { redirect } from 'next/navigation'
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work',
  credentials: 'include',
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          method: 'POST',
          url: '/api/v1/auth/update-tokens',
        },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 200) {
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        redirect('/sign-in')
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
