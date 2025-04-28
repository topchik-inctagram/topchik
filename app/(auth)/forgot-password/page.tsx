'use client'

import { useForgotPasswordMutation } from '@/features/auth/api'
import { ForgotPassword } from '@/features/auth/forms/ForgotPassword'
import { PageContainer } from '@/shared/components'
import { EmailSentModal } from '@/entities/EmailSentModal'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@/shared/schema/validationRegex'
import type { RecaptchaStatus } from '@/shared/components/Recaptcha'

const schema = z.object({
  email: emailSchema,
})

type FormTypes = z.infer<typeof schema>

const Page = () => {
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [wasEmailSent, setWasEmailSent] = useState(false)
  const [recaptchaStatus, setRecaptchaStatus] = useState<RecaptchaStatus>('idle')

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<FormTypes>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const handleSubmitForm = async (data: FormTypes) => {
    if (recaptchaStatus !== 'verified') {
      setRecaptchaStatus('notVerified')
      return
    }

    try {
      await forgotPassword(data).unwrap()
      setEmail(data.email)
      localStorage.setItem('recovery-email', data.email)
      setShowModal(true)
    } catch (error: any) {
      if (error?.data?.errorsMessages?.[0]) {
        setError('email', {
          type: 'manual',
          message: error.data.errorsMessages[0].message,
        })
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setWasEmailSent(true)
    reset()
    setRecaptchaStatus('idle')
  }

  const handleVerifyRecaptcha = () => {
    setRecaptchaStatus('verified')
  }

  return (
    <PageContainer mt="36px">
      <ForgotPassword
        control={control}
        errors={errors}
        isLoading={isLoading}
        isValid={isValid}
        isVerified={wasEmailSent}
        recaptchaStatus={recaptchaStatus}
        onSubmit={handleSubmit(handleSubmitForm)}
        onVerifyRecaptcha={handleVerifyRecaptcha}
      />
      {showModal && <EmailSentModal email={email} onClose={handleModalClose} />}
    </PageContainer>
  )
}

export default Page
