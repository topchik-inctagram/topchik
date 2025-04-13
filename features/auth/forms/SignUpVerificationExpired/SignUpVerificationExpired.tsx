import { Button, Card, ControlledInput, Typography } from '@/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import s from './SignUpVerificationExpired.module.scss'
import { z } from 'zod'
import { emailOnlySchema } from '@/shared/schema'

type FormTypes = z.infer<typeof emailOnlySchema>
type Props = {
  onSubmit: (data: FormTypes) => void
}

export const SignUpVerificationExpired = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormTypes>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(emailOnlySchema),
    reValidateMode: 'onChange',
  })

  const submitHandler = (data: FormTypes) => {
    onSubmit(data)
    reset()
  }

  return (
    <form action="" className={s.formContainer} onSubmit={handleSubmit(submitHandler)}>
      <ControlledInput
        autoComplete="email"
        control={control}
        error={errors.email?.message}
        label="Email"
        name="email"
        placeholder="example@yourmail.com"
        type="email"
        className={s.userEmailInput}
      />
      <Button className={s.button} disabled={!isValid || isSubmitting} type="submit">
        Resend verification link
      </Button>
    </form>
  )
}
