'use client'

import { useState } from 'react'
import { PageContainer, Typography } from '@/shared/components'
import { TimeManagement } from '@/public/icons'
import s from './page.module.scss'
import { useEmailResendingMutation } from '@/features/auth/api'
import { EmailSentModal } from '@/entities/EmailSentModal'
import { SignUpVerificationExpired } from '@/features/auth/forms/SignUpVerificationExpired'

const Page = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const [emailResending, { error, isLoading, ...rest }] = useEmailResendingMutation()

  const emailResendingHandler = async (data: { email: string }) => {
    try {
      await emailResending({ email: data.email }).unwrap()
      setUserEmail(data.email)
    } catch (error) {
      console.log(error)
    }
  }

  const onCloseModalHandler = () => {
    setUserEmail(null)
  }

  return (
    <PageContainer mt="35px">
      <Typography className={s.title} variant="h1">
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant="regular_16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <SignUpVerificationExpired onSubmit={emailResendingHandler} />
      <TimeManagement />
      {userEmail && <EmailSentModal email={userEmail} onClose={onCloseModalHandler} />}
    </PageContainer>
  )
}

export default Page
