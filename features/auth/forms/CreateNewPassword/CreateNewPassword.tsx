'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, ControlledInput, Typography } from '@/shared/components'
import s from './CreateNewPassword.module.scss'
import { confirmPasswordSchema, passwordSchema } from '@/shared/schema/validationRegex'

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  })

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
  isLoading: boolean
}

export const CreateNewPassword = ({ onSubmit, isLoading }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  })
  //todo add Devtool when it will be fixed by dev
  return (
    <Card className={s.cardContainer}>
      <Typography as="h2" className={s.title} variant="h2">
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          autoComplete="new-password"
          className={s.newPasswordInput}
          control={control}
          error={errors.password?.message}
          label="New password"
          name="password"
          placeholder="Minimum X symbols"
          type="password"
        />
        <ControlledInput
          autoComplete="new-password"
          className={s.confirmPasswordInput}
          control={control}
          error={errors.confirmPassword?.message}
          label="Password confirmation"
          name="confirmPassword"
          placeholder="Minimum X symbols"
          type="password"
        />
        <Typography className={s.newPassWarning} variant="regular_14">
          Your password must be between 6 and 20 characters
        </Typography>
        <Button fullWidth disabled={isLoading} type="submit">
          {isLoading ? 'Sending...' : 'Create new password'}
        </Button>
      </form>
    </Card>
  )
}
