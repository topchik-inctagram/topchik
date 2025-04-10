'use client'
import { PageContainer, Toast } from '@/shared/components'
import { SignUp } from '../../../features/auth/forms/SignUp'
import { RegistrationRequest, useRegistrationUserMutation } from '../../../features/auth/api'
import { useState } from 'react'
import { EmailSentModal } from '@/entities/EmailSentModal'

const Page = () => {
  const [registration, { error, isError, isLoading, ...rest }] = useRegistrationUserMutation()

  const [emailForModal, setEmailForModal] = useState<string | null>(null)

  const registrationHandler = async (data: RegistrationRequest) => {
    try {
      await registration(data).unwrap()
      setEmailForModal(data.email)
    } catch (error: any) {
      console.log(error)
    }
  }

  const onCloseModalHandler = () => {
    setEmailForModal(null)
  }

  return (
    <PageContainer>
      {isError && error?.data?.errorsMessages?.[0]?.message && (
        <Toast description={error.data.errorsMessages[0].message} variant="error" />
      )}
      <SignUp onSubmit={registrationHandler} />
      {emailForModal && <EmailSentModal email={emailForModal} onClose={onCloseModalHandler} />}
    </PageContainer>
  )
}

export default Page
