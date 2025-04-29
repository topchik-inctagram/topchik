'use client'

import { SignInForm } from '@/features/auth/forms/SignInForm'
import { PageContainer, Toast } from '@/shared/components'
import { useLazyMeQuery, useLoginMutation } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PrivatePages } from '@/shared/enums'

const SignInPage = () => {
  const [login, { error, ...rest }] = useLoginMutation()
  const [triggerMeData] = useLazyMeQuery()
  const router = useRouter()

  const loginHandler = async (data: any) => {
    try {
      await login(data)
      const meData = await triggerMeData().unwrap()
      if (meData?.id) {
        router.push(`${PrivatePages.profile}/${meData.id}`)
      }
    } catch (e: any) {
      console.log(e)
    }
  }

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
      <SignInForm
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
