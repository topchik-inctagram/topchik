'use client'

import { SignIn } from '@/features'
import { PageContainer } from '@/shared/components'
import { useLoginMutation } from '@/features/api/auth'

const SignInPage = () => {
  const [login] = useLoginMutation()

  const loginHandler = (data: any) => {
    login(data)
  }

  return (
    <PageContainer mt="36px">
      <SignIn onSubmit={loginHandler} />
    </PageContainer>
  )
}

export default SignInPage
