'use client'
import { PageContainer } from '@/shared/components'
import { ForgotPassword } from '@/features/auth/forms'

const Page = () => {
  const handleSubmit = (data: unknown) => {
    console.log('Form submitted:', data)
  }
  return (
    <PageContainer direction="column" mt="36px">
      <ForgotPassword isVerified={false} onSubmit={handleSubmit} />
    </PageContainer>
  )
}

export default Page
