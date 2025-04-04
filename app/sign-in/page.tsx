'use client'

import { SignIn } from '@/features'
import { PageContainer } from '@/shared/components'

const Page = () => {
  return (
    <PageContainer mt={'36px'}>
      <SignIn onSubmit={() => {}} />
    </PageContainer>
  )
}

export default Page
