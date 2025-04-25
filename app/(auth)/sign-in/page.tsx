'use client'

import { SignIn } from '@/features/auth/forms/SignIn'
import { PageContainer, Toast } from '@/shared/components'
import {useLoginMutation, useMeQuery} from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PrivatePages } from '@/shared/enums'
import {useEffect, useState} from 'react';

const SignInPage = () => {
  const [login, { error, ...rest }] = useLoginMutation()
  const { data: meData, isLoading } = useMeQuery()
  const router = useRouter()

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const loginHandler = async (data: any) => {
    try {
      await login(data)
      setIsLoggingIn(true)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (isLoggingIn && !isLoading && meData?.id) {
      router.push(`${PrivatePages.profile}/${meData.id}`)
    }
  }, [isLoggingIn, isLoading, meData, router]);


  console.log(error, 'error ->>>')
  console.log(rest, 'REST =>>>>>>>>>>>')

  // no types for error @ts-expect-error
  // fix later with types
  // no types for error @ts-ignore
  return (
    <PageContainer mt="36px">
      {error && 'data' in error && (error.data as any)?.errorsMessage && (
        <Toast
          defaultOpen={!!(error.data as any)?.errorsMessage}
          description={(error.data as any)?.errorsMessage}
          variant="error"
        />
      )}
      <SignIn
        errorsFromApi={
          error &&
          'data' in error &&
          (error.data as any)?.errorsMessages?.length &&
          (error.data as any)?.errorsMessages
        }
        onSubmit={loginHandler}
      />
    </PageContainer>
  )
}

export default SignInPage
