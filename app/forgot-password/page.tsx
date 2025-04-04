'use client'

import { ForgotPassword } from '@/features'
import { PageContainer } from '@/shared/components'

const Page = () => {
  return (
    <PageContainer mt="36px">
      <ForgotPassword isVerified={false} onSubmit={() => {}} />
    </PageContainer>
  )
}

export default Page
