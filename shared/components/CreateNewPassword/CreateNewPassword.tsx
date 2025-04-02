import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, ControlledInput, Typography } from '@/shared/components'
import s from './CreateNewPassword.module.scss'

const schema = z.object({
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
})

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
}

export const CreateNewPassword = ({ onSubmit }: Props) => {
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
        <Button fullWidth type="submit">
          Create new password
        </Button>
      </form>
    </Card>
  )
}
