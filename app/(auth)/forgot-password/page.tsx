'use client'

import { useForgotPasswordMutation } from '@/features/auth/api'
import { ForgotPassword } from '@/features/auth/forms/ForgotPassword'
import { PageContainer } from '@/shared/components'
import { EmailSentModal } from '@/entities/EmailSentModal'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email('Enter your email'),
})

type FormTypes = z.infer<typeof schema>

const Page = () => {
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [wasEmailSent, setWasEmailSent] = useState(false)

  const [forgotPassword] = useForgotPasswordMutation()

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
    mode: 'onBlur',
  })

  const handleSubmitForm = async (data: FormTypes) => {
    try {
      await forgotPassword(data).unwrap()
      setEmail(data.email)
      setShowModal(true)
    } catch (error: any) {
      if (error?.status === 400) {
        setError('email', {
          type: 'manual',
          message: 'User with this email doesn’t exist',
        })
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setWasEmailSent(true)
    reset()
  }

  return (
    <PageContainer mt="36px">
      <ForgotPassword
        control={control}
        errors={errors}
        isValid={isValid}
        isVerified={wasEmailSent}
        onSubmit={handleSubmit(handleSubmitForm)}
      />
      {showModal && <EmailSentModal email={email} onClose={handleModalClose} />}
    </PageContainer>
  )
}

export default Page
