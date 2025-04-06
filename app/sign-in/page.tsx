'use client'

import { SignIn } from '@/features'
import { PageContainer, Toast } from '@/shared/components'
import { useLoginMutation } from '@/features/api/auth'

const SignInPage = () => {
  const [login, { error, ...rest }] = useLoginMutation()

  const loginHandler = (data: any) => {
    login(data)
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
        errorsFromApi={error?.data?.errorsMessages?.length && error?.data.errorsMessages[0]}
        onSubmit={loginHandler}
      />
    </PageContainer>
  )
}

export default SignInPage
