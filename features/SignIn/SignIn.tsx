'use client'

import { Button, Card, ControlledInput, Typography } from '@/shared/components'
import Link from 'next/link'
import { Github, Google } from '@/public'
import s from './SignIn.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Enter your email'),
  password: z.string().min(3),
})

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })
  //todo add Devtool when it will be fixed by dev
  return (
    <Card className={s.cardContainer}>
      <Typography as="h2" className={s.title} variant="h1">
        Sign In
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
          autoComplete="current-password"
          className={s.passwordInput}
          control={control}
          error={errors.password?.message}
          label="Password"
          name="password"
          placeholder="Minimum X symbols"
          type="password"
        />
        <Typography as={Link} className={s.forgotPasswordLink} href="#" variant="regular_14">
          Forgot Password
        </Typography>
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
