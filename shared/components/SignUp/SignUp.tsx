import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, ControlledCheckbox, ControlledInput, Typography } from '@/shared/components'
import s from './SignUp.module.scss'
import Link from 'next/link'
import { Github, Google } from '@/public'

const schema = z.object({
  username: z.string(),
  email: z.string().email('Enter your email'),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
  termsAndPolicy: z.boolean(),
})

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
}

export const SignUp = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAndPolicy: false,
    },
    resolver: zodResolver(schema),
  })
  //todo add Devtool when it will be fixed by dev
  return (
    <Card className={s.cardContainer}>
      <Typography as="h2" className={s.title} variant="h1">
        Sign Up
      </Typography>
      <div className={s.svgContainer}>
        <Link href="#">
          <Google />
        </Link>
        <Link href="#">
          <Github />
        </Link>
      </div>
      <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          autoComplete="username"
          className={s.userInput}
          control={control}
          error={errors.username?.message}
          label="Username"
          name="username"
          placeholder="Epam111"
          type="text"
        />
        <ControlledInput
          autoComplete="email"
          className={s.emailInput}
          control={control}
          error={errors.email?.message}
          label="Email"
          name="email"
          placeholder="example@yourmail.com"
          type="email"
        />
        <ControlledInput
          autoComplete="new-password"
          className={s.passwordInput}
          control={control}
          error={errors.password?.message}
          label="Password"
          name="password"
          placeholder="Minimum X symbols"
          type="password"
        />
        <ControlledInput
          autoComplete="new-password"
          className={s.passwordInput}
          control={control}
          error={errors.confirmPassword?.message}
          label="Password confirmation"
          name="confirmPassword"
          placeholder="Minimum X symbols"
          type="password"
        />
        <ControlledCheckbox control={control} name="termsAndPolicy" />
        <Button fullWidth className={s.buttonSignIn} type="submit">
          Sign In
        </Button>
      </form>
      <Typography className={s.noAccountP} variant="regular_16">
        Don’t have an account?
      </Typography>
      <Button asChild fullWidth variant="miniOutlined">
        <Link href="#">Sign Up</Link>
      </Button>
    </Card>
  )
}
