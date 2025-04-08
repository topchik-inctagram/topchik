import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, ControlledCheckbox, ControlledInput, Typography } from '@/shared/components'
import s from './SignUp.module.scss'
import Link from 'next/link'
import { Github, Google } from '@/public'

const usernameRegex = /^[0-9A-Za-z_-]+$/
const passwordRegex = /^[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/

const schema = z
  .object({
    username: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(usernameRegex, 'Only letters, numbers, underscores and dashes allowed'),
    email: z.string().email('The email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        passwordRegex,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    confirmPassword: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        passwordRegex,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    agreement: z.literal<boolean>(true),
  })
  .refine(val => val.password === val.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
}

export const SignUp = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreement: false,
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  //todo add Devtool when it will be fixed by dev
  return (
    <Card className={s.cardContainer}>
      <Typography as="h2" className={s.title} variant="h1">
        Sign Up
      </Typography>
      <div className={s.svgContainer}>
        <Link className={s.googleGithubLinks} href="#">
          <Google />
        </Link>
        <Link className={s.googleGithubLinks} href="#">
          <Github />
        </Link>
      </div>
      <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputsContainer}>
          <ControlledInput
            autoComplete="username"
            control={control}
            error={errors.username?.message}
            label="Username"
            name="username"
            placeholder="Epam111"
            type="text"
          />
          <ControlledInput
            autoComplete="email"
            control={control}
            error={errors.email?.message}
            label="Email"
            name="email"
            placeholder="example@yourmail.com"
            type="email"
          />
          <ControlledInput
            autoComplete="new-password"
            control={control}
            error={errors.password?.message}
            label="Password"
            name="password"
            placeholder="Minimum X symbols"
            type="password"
          />
          <ControlledInput
            autoComplete="new-password"
            control={control}
            error={errors.confirmPassword?.message}
            label="Password confirmation"
            name="confirmPassword"
            placeholder="Minimum X symbols"
            type="password"
          />
        </div>

        <ControlledCheckbox
          control={control}
          label={
            <Typography className={s.termsAndService} variant="small">
              I agree to the{' '}
              <Link className={s.termsAndServiceLink} href="/terms" target="blank">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link className={s.termsAndServiceLink} href="/policy" target="blank">
                Privacy Policy
              </Link>
            </Typography>
          }
          name="agreement"
        />

        <Button
          fullWidth
          className={s.buttonSignUp}
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Sign Up
        </Button>
      </form>
      <Typography className={s.noAccountP} variant="regular_16">
        Don’t have an account?
      </Typography>
      <Button asChild fullWidth variant="miniOutlined">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </Card>
  )
}
