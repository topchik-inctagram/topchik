'use client'

import { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '@/features/auth/api'
import { PageContainer, Typography, Button } from '@/shared/components'
import { EmailSentModal } from '@/entities/EmailSentModal'
import { TimeManagement } from '@/public/icons'
import { Toast } from '@/shared/components/Toast'
import s from './page.module.scss'

const Page = () => {
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [forgotPassword] = useForgotPasswordMutation()

  useEffect(() => {
    const savedEmail = localStorage.getItem('recovery-email')
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const resendLink = async () => {
    if (!email) {
      return
    }
    try {
      await forgotPassword({ email }).unwrap()
      setShowModal(true)
    } catch (err: any) {
      const message =
        err?.data?.errorsMessages?.[0]?.message || 'Failed to resend the link. Please try again.'
      setError(message)
    }
  }

  const handleModalClose = () => setShowModal(false)

  return (
    <PageContainer direction="column" mt="35px">
      <Typography className={s.title} variant="h1">
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant="regular_16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button className={s.button} onClick={resendLink}>
        Resend link
      </Button>
      <TimeManagement />
      {showModal && email && <EmailSentModal email={email} onClose={handleModalClose} />}
      {error && (
        <Toast
          description={error}
          open={!!error}
          variant="error"
          onOpenChange={() => setError(null)}
        />
      )}
    </PageContainer>
  )
}

export default Page
