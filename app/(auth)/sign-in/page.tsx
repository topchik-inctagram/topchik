'use client'

import { SignIn } from '../../../features/auth/forms/SignIn'
import { PageContainer, Toast } from '@/shared/components'
import { useLoginMutation } from '../../../features/auth/api'
import { useRouter } from 'next/navigation'
import withAuth from '@/shared/HOC/withAuth'
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

  // @ts-expect-error
  // @ts-ignore
  return (
    <PageContainer mt="36px">
      {error?.data.errorsMessage && (
        <Toast
          defaultOpen={!!error?.data.errorsMessage}
          description={error?.data.errorsMessage}
          variant="error"
        />
      )}
      <SignIn
        errorsFromApi={error?.data?.errorsMessages?.length && error?.data.errorsMessages}
        onSubmit={loginHandler}
      />
    </PageContainer>
  )
}

export default withAuth(SignInPage)
