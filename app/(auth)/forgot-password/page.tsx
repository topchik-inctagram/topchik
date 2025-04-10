'use client'

import { PageContainer } from '@/shared/components'
import { ForgotPassword } from '@/features/auth/forms/ForgotPassword'

const Page = () => {
  const handleSubmit = (data: unknown) => {
    console.log('Form submitted:', data)
  }
  return (
    <PageContainer mt="36px">
      <ForgotPassword isVerified={false} onSubmit={handleSubmit} />
    </PageContainer>
  )
}

export default Page
