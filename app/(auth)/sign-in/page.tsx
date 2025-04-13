'use client'

import { SignIn } from '@/features/auth/forms/SignIn'
import { PageContainer, Toast } from '@/shared/components'
import { useLoginMutation } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PrivatePages } from '@/shared/enums'

const SignInPage = () => {
  const [login, { error, ...rest }] = useLoginMutation()
  const router = useRouter()

  const loginHandler = async (data: any) => {
    try {
      await login(data)
      router.push(PrivatePages.profile)
    } catch (e: any) {
      console.log(e)
    }
  }

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
