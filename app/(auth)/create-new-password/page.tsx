'use client'

import { PageContainer } from '@/shared/components'
import { CreateNewPassword } from '@/features/auth/forms/CreateNewPassword'

export default function NewPasswordPage() {
  const handleSubmit = async (data: any) => {
    console.log('Form submitted with data:', data)
    // Here you can add your logic to handle the form submission
    // For example, you can call an API to create a new password
  }

  return (
    <PageContainer mt="36px">
      <CreateNewPassword onSubmit={handleSubmit} />
    </PageContainer>
  )
}
